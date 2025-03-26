/**
 * This file is our web sever's backend, maintains website functionality
 * Nicholas Zayfman & Zeyad Elgendy
 */

// Import packages
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const axios = require('axios');  
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const port = 3017;

// Set up multer to store files with the original name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);  // Create the uploads directory if it doesn't exist
    }
    cb(null, uploadDir);  // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  // Retain the original file name
  }
});

const upload = multer({ storage: storage }); 


// middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// path to the JSON file where user data will be stored
const userDataFilePath = path.join(__dirname, 'users.json');

// serve static files
app.use(express.static('public'));

app.use(express.json());

// route to display login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'volunteer.html'));
});

// redirect the root URL to desired page
app.get('/', (req, res) => {
  res.redirect('/login');
});

// route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // read user data from the JSON file
  fs.readFile(userDataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data file');
    }

    let users = [];
    try {
      users = JSON.parse(data);  // Parse the JSON data into a javaScript array
    } catch (parseError) {
      return res.status(500).send('Error parsing user data file');
    }

    // find the user by username
    const user = users.find((u) => u.username === username);

    if (user) {
      // compare the hashed password with the stored hash
      bcrypt.compare(password, user.password, (err, result) => {
        if (result && user.new_password_set == false){
          res.redirect('/newlogin.html') //Page to set new password
          user.new_password_set = true
        }
        else {
        if (result) {
          // check user role and redirect accordingly
          if (user.role === 'Administrator')
          {
            res.redirect('/administrator.html');
          }
          else if (user.role === 'Volunteer')
          {
            res.redirect('/volunteer.html');
          }
          else {
            res.status(403).send('Unauthorized role')
          }
        } else {
          res.redirect('/login.html');
        }
      }
      });
    } else {
      res.redirect('/login.html');
    }
  });
});

//Handle the new password
app.post('/submit_password_change', (req, res) => {
  const { username, old_password, new_password, confirm_new_password } = req.body;
  // validation
  if (new_password !== confirm_new_password) {
    return res.status(400).send('Passwords do not match!');
  }

  // read user data from the JSON file
  fs.readFile(userDataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data file');
    }
    let users = [];
    try {
      users = JSON.parse(data);  // Parse the JSON data into a JavaScript array
    } catch (parseError) {
      return res.status(500).send('Error parsing user data file');
    }

    // Find the user by username
    const user = users.find((u) => u.username === username);
    bcrypt.compare(old_password, user.password, (err, result) => {
      if (result){
        user.new_password_set = true
        user.password = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
        // Save the updated users array back to the JSON file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeError) => {
          if (writeError) {
            return res.status(500).send('Error saving user data');
          }
        res.redirect('login.html') //Page to set new password
        });
      }
      else {
        return res.status(400).send('Old password is incorrect!');
      }
    });
  });
});

//handle form submissions
app.post('/submit_form', (req, res) => {
  const formData = req.body;

  // Read the existing data from the JSON file (if any)
  fs.readFile('reports.json', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return res.status(500).send('Error reading data.');
    }
    let reports = [];
    if (data.length > 0) {
      reports = JSON.parse(data);
    }
    // Add the new form data as a report (we push the new report to the reports array)
    reports.push(formData);

    // Get the latest report
    const latestReport = reports[reports.length - 1];

    // Convert the latest report to a JSON string
    const reportJson = JSON.stringify(latestReport);

    // Create a temporary file path to save the report
    const tempFilePath = path.join(__dirname, 'tempReport.json');

    // Write the report JSON to the temporary file
    fs.writeFileSync(tempFilePath, reportJson);
    const email = latestReport['person-email'];  // Extract the email of the person
    // Run the Python script and pass the temp file path and email as arguments
    const pythonProcess = exec(`python sendEmailtoInjured.py "${tempFilePath}" "${email}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return res.status(500).send('Error processing the file with the Python script');
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send('Error with the Python script');
      }
      console.log('Python stdout:', stdout);
      // After the Python script runs, save the updated reports and redirect
      fs.writeFile('reports.json', JSON.stringify(reports, null, 2), (err) => {
        if (err) {
          console.log('Error saving file:', err);
          return res.status(500).send('Error saving data.');
        }
        return res.redirect('volunteer.html');  // Redirect after successful processing
      });
    });

    // Clean up by deleting the temporary file after the Python process completes
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      //fs.unlinkSync(tempFilePath);  // Delete the temp file after use
    });
  });
});

app.get('/getParticipantData', (req, res) => {
  const bibNumber = req.query.bib;
  // Read the participants.json file
  fs.readFile(path.join(__dirname, 'participants.json'), 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ error: 'Error reading participant data' });
      }
      // Parse the JSON data
      const participants = JSON.parse(data);
      // Find the participant with the given bib number
      const participant = participants.find(p => p.bib === bibNumber);
      if (participant) {
          // Send the participant's data back as a JSON response
          res.json(participant);
      } else {
          // If no participant is found with the given bib number
          res.status(404).json({ error: 'Participant not found' });
      }
  });
});

// Route to handle file upload and call python script (account_setup.py)
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('No file uploaded'); // Log if no file is uploaded
    return res.status(400).send('No file uploaded');
  }
  console.log('Uploaded file details:', req.file); // Log file details
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  console.log('File path:', filePath); // Log file path
  fs.chmod(filePath, 0o444, (err) => {
    if (err) {
      console.error('Error changing file permissions:', err);
      return res.status(500).send('Error changing file permissions');
    }
    console.log(`Permissions set to read-only for: ${filePath}`);
  });
  const normalizedFilePath = path.normalize(filePath);
  console.log('Normalized file path:', normalizedFilePath); // Log normalized path

  // Call the Python script to convert CSV to JSON
  csv_file = filePath;
  //exec(`python account_setup.py "${normalizedFilePath}" users.json`, (err, stdout, stderr) => {
    const pythonProcess = exec(`python account_setup.py "${csv_file}" users.json`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return res.status(500).send('Error processing the file with the Python script');
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send('Error with the Python script');
      }
      console.log('Python stdout:', stdout);
      // delete the file after processing
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('Error deleting file:', err);
        }
      });
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
    });
  });
  app.get('/generate-pdf', async (req, res) => {
    try {
      // Read reports.json
      const reportsPath = path.join(__dirname, 'reports.json');
      if (!fs.existsSync(reportsPath)) {
        console.error(`reports.json not found at path: ${reportsPath}`);
        return res.status(404).send('reports.json not found');
      }
  
      const reportsData = JSON.parse(fs.readFileSync(reportsPath, 'utf8'));
      if (!reportsData || !Array.isArray(reportsData)) {
        return res.status(500).send('Invalid data format in reports.json');
      }
      // Download the logo image
      const logoUrl = 'https://upload.wikimedia.org/wikipedia/en/1/14/Marine_Corps_Marathon_%28logo%29.jpg';
      const logoResponse = await axios.get(logoUrl, { responseType: 'arraybuffer' });
      const logoBuffer = Buffer.from(logoResponse.data);
  
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
  
      // Embed the logo into the PDF
      const logoImage = await pdfDoc.embedJpg(logoBuffer);
      const logoWidth = 150;
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth; // Scale to desired width
  
      // Loop through reports and create each report on a new page
      reportsData.forEach((report, index) => {
        const page = pdfDoc.addPage([600, 800]); // A4 size (portrait)
        const { width, height } = page.getSize();
  
        // Draw logo at top-right corner
        page.drawImage(logoImage, {
          x: (width -logoWidth) / 2,
          y: height - logoHeight - 20, // 20px from the top
          width: logoWidth,
          height: logoHeight,
        });
  
        // set font and text properties
        const font = pdfDoc.embedStandardFont('Helvetica');
        let yPosition = height - logoHeight - 60;  // Starting position for first report
  
        // draw a box around the text
        const boxWidth = 560;  // Box width
        const boxHeight = 475; // Box height
        const boxX = 20;
        const boxY = yPosition - 500;  // set y position of the box
  
        // draw the rectangle around the text
        page.drawRectangle({
          x: boxX,
          y: boxY,
          width: boxWidth,
          height: boxHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,            
          color: rgb(1, 1, 1),       
        });
  
        // add report title inside the box
        page.drawText(`Incident Report #${index + 1}`, {
          x: boxX + 10, //padding inside the box
          y: boxY + boxHeight - 20,
          size: 14,
          font,
          color: rgb(0, 0, 0),
        });
  
        // add report inside the box
        let textYPosition = boxY + boxHeight - 40;
        Object.keys(report).forEach((key) => {
          const value = report[key];
  
          page.drawText(`${key.replace(/-/g, ' ').toUpperCase()}: ${value}`, {
            x: boxX + 10,  // Padding inside the box
            y: textYPosition,
            size: 12,
            font,
            color: rgb(0, 0, 0),
          });
          textYPosition -= 20; // Move down for next line
        });

        const lineStartX = boxX;
        const lineEndX = boxX + boxWidth;
        const lineY = textYPosition - 10;  // Position for the line
  
        // Draw the line
        page.drawLine({
          start: { x: lineStartX, y: lineY },
          end: { x: lineEndX, y: lineY },
          color: rgb(0, 0, 0),  
          thickness: 1,          
        });
  
        // Add label "Sensitive Data, PII" under the line
        page.drawText('Sensitive Data, PII', {
          x: boxX + 10, 
          y: lineY - 15,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
  
        // add a new page if page runs out
        if (textYPosition < 40) {
          textYPosition = height - 40;
        }
      });
  
      // serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();
  
      // save PDF to file (and prints for debugging)
      const outputPath = path.join(__dirname, 'incident_reports.pdf');
      fs.writeFileSync(outputPath, pdfBytes);
      console.log(`PDF saved to: ${outputPath}`);
  
      // Set response headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=incident_reports.pdf');
      res.setHeader('Content-Encoding', 'identity'); // Avoid compression issues
  
      // Send the PDF buffer as a response
      res.end(pdfBytes);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send(`An error occurred while generating the PDF: ${error.message}`);
    }
  });
  
  
// Route to handle file upload and call python script (account_setup.py)
  app.get('/search_form', (req, res) => {
    const { 'search-name': name, 'search-injury-type': injuryType } = req.query;
  
    // Read the JSON file that contains the reports
    fs.readFile(path.join(__dirname, 'reports.json'), 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading the data file');
      }
  
      let reports = [];
      try {
        reports = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).send('Error parsing the data file');
      }
      // Filter the reports based on search criteria
      let results = reports.filter(report => {
        let match = true;
        // Check if 'name' is defined and contains the search query
        if (name && !report.name.toLowerCase().includes(name.toLowerCase())) {
          match = false;
        }
        // Check if 'injuryType' is defined and contains the search query
        if (injuryType && report.injuryType && !report.injuryType.toLowerCase().includes(injuryType.toLowerCase())) {
          match = false;
        }
        return match;
      });
      // Respond with filtered results
      res.json(results);
    });
  });
// Serve the reports.json file
app.get('/reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'reports.json'));
});  

function getReports() {
  const filePath = path.join(__dirname, 'reports.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Save updated reports to the JSON file
function saveReports(reports) {
  const filePath = path.join(__dirname, 'reports.json');
  fs.writeFileSync(filePath, JSON.stringify(reports, null, 2));
}
/*
// Search for a report by name
app.get('/searchReport', (req, res) => {
  const name = req.query.name.toLowerCase();
  const reports = getReports();
  const report = reports.find(r => r['person-bib'] === name);

  if (report) {
      res.json(report);
  } else {
      res.status(404).json({ message: 'Report not found' });
  }
});
*/
app.delete('/deleteReport', (req, res) => {
  const { name } = req.body; // Make sure this value is passed in the body

  if (!name || typeof name !== 'string') {
      console.error('Invalid name:', name);
      return res.status(400).json({ error: "Invalid or missing name" });
  }

  fs.readFile(reportFilePath, 'utf-8', (err, data) => {
      if (err) {
          console.error("Error reading the file:", err);
          return res.status(500).json({ error: "Failed to read reports" });
      }

      let reports;
      try {
          reports = JSON.parse(data); // Parse the JSON data
      } catch (parseError) {
          console.error("Error parsing the JSON file:", parseError);
          return res.status(500).json({ error: "Failed to parse reports" });
      }

      // Ensure that name is defined before calling toLowerCase()
      const index = reports.findIndex(report => {
          const reportName = report['person-name']; // Get the report's person-name
          if (!reportName) {
              console.error('Report missing person-name:', report);
              return false; // Skip this report if it doesn't have a person-name
          }
          return reportName.toLowerCase() === name.toLowerCase();
      });

      if (index === -1) {
          return res.status(404).json({ error: "Report not found" });
      }
      reports.splice(index, 1);
      fs.writeFile(reportFilePath, JSON.stringify(reports, null, 2), 'utf-8', (writeError) => {
          if (writeError) {
              console.error("Error writing the file:", writeError);
              return res.status(500).json({ error: "Failed to update reports" });
          }

          res.status(200).json({ message: "Report deleted successfully" });
      });
  });
});

// Read reports from JSON file
function readReports() {
  const reportsFilePath = path.join(__dirname, 'reports.json');
  const rawData = fs.readFileSync(reportsFilePath);
  return JSON.parse(rawData);
}

// Route to get injury locations and their counts
app.get('/get-injury-locations', (req, res) => {
  const reports = readReports();  // Assuming this reads the reports file
  const locationCounts = {};
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);  // Get the date/time for 15 minutes ago

  // Iterate over reports and count occurrences of each location
  reports.forEach(report => {
      const location = report['incident-location'];

      // Combine incident-date and incident-time to create a full timestamp
      const incidentDate = report['incident-date'];
      const incidentTime = report['incident-time'];
      const timestampStr = `${incidentDate}T${incidentTime}:00`; // Format it as ISO 8601
      const reportTime = new Date(timestampStr); // Parse the timestamp string to a Date object
      console.log(`Report timestamp: ${timestampStr}, Parsed Date: ${reportTime}, 15 minutes ago: ${fifteenMinutesAgo}`);
      if (location) {
          if (!locationCounts[location]) {
              locationCounts[location] = {
                  total: 0,
                  last15Minutes: 0,
              };
          }

          locationCounts[location].total++;

          // Check if the report is within the last 15 minutes
          if (reportTime >= fifteenMinutesAgo) {
              locationCounts[location].last15Minutes++;
          }
      }
  });

  // Convert the location counts into an array of objects for easier display
  const locations = Object.keys(locationCounts).map(location => ({
      location,
      count: locationCounts[location].total,
      countInLast15Minutes: locationCounts[location].last15Minutes,
  }));

  res.json(locations); // Send locations and their counts as JSON
});

// Update a report
app.put('/updateReport', (req, res) => {
  const updatedReport = req.body;
  const reports = getReports();

  // Remove the old report by matching the name
  const reportIndex = reports.findIndex(r => r['person-name'].toLowerCase() === updatedReport['person-name'].toLowerCase());
  
  if (reportIndex === -1) {
      return res.status(404).json({ message: 'Report not found' });
  }
  // Replace the old report with the updated one
  reports[reportIndex] = updatedReport;
  // Save the updated reports
  saveReports(reports);
  res.json({ message: 'Report updated successfully' });
});
// Helper function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Function to convert the incident time (HH:MM) into a Date object
function convertIncidentTimeToDate(incidentTime, currentDate) {
  const [hours, minutes] = incidentTime.split(':').map(Number);
  return new Date(`${currentDate}T${incidentTime}:00Z`);
}

// Read reports from the reports.json file
function loadReports() {
  const reportsPath = path.join(__dirname, 'reports.json');
  if (!fs.existsSync(reportsPath)) {
    console.error('reports.json file not found');
    return [];
  }
  const data = fs.readFileSync(reportsPath, 'utf-8');
  return JSON.parse(data);
}

// Endpoint to get injury locations and the number of reports in the last 15 minutes
app.get('/get-injury-locations', (req, res) => {
  const reports = loadReports(); // Load the reports from the JSON file
  const currentDate = getCurrentDate(); // Get today's date
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000); // 15 minutes ago

  // Group reports by location (incident-location field)
  const locationReports = reports.reduce((acc, report) => {
    const location = report['incident-location']; // Correct field is 'incident-location'
    if (!acc[location]) acc[location] = [];
    acc[location].push(report);
    return acc;
  }, {});

  // Count total reports and reports in the last 15 minutes for each location
  const locationData = Object.keys(locationReports).map(location => {
    const locationData = locationReports[location];
    
    // Count total reports for the location
    const totalReports = locationData.length;

    // Filter reports in the last 15 minutes for the location
    const reportsInLast15Minutes = locationData.filter(report => {
      const reportTime = convertIncidentTimeToDate(report['incident-time'], currentDate);
      return reportTime > fifteenMinutesAgo; // Check if the report is within the last 15 minutes
    });
    // Count of reports in the last 15 minutes
    const countInLast15Minutes = reportsInLast15Minutes.length;
    console.log({
      location,
      totalReports,
      countInLast15Minutes,
    });

    return {
      location: location,
      totalReports: totalReports,
      countInLast15Minutes: countInLast15Minutes,
    };
  });

  // Send back the data as JSON
  res.json(locationData);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/login.html`);
});


