
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');  // Multer for file uploads
const { exec } = require('child_process');  // Node.js module to execute Python script
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


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Path to the JSON file where user data will be stored
const userDataFilePath = path.join(__dirname, 'users.json');

// Serve static files (like HTML)
app.use(express.static('public'));


// Route to display login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'volunteer.html'));
});

// Redirect the root URL to the desired page
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read user data from the JSON file
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

    if (user) {
      // Compare the hashed password with the stored hash
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

  // Example validation logic (you can replace this with real validation)
  if (new_password !== confirm_new_password) {
    return res.status(400).send('Passwords do not match!');
  }

  // Read user data from the JSON file
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
  // Simulate checking the old password (In real scenarios, you would check with the database)

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

      // Optionally, delete the file after processing
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
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/login.html`);
});


