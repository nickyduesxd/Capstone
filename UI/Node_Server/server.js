const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3017;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Path to the JSON file where user data will be stored
const userDataFilePath = path.join(__dirname, 'users.json');

// Serve static files (like HTML)
app.use(express.static('public'));

// Route to display login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
        if (result) {
          res.redirect('/index.html');
        } else {
          res.redirect('/login.html');
        }
      });
    } else {
      //return res.send('User not found');
      res.redirect('/index.html');
    }
  });
});

// Route to add a new user (for testing purposes)
// This is the terminal command
// curl -X POST -d "username=testuser&password=password123" http://localhost:3000/register
// curl -X POST -d "username=testuser&role=admin&password=password123" http://localhost:3000/register
app.post('/register', (req, res) => {
  //const { username, password } = req.body;
  const { username, password, role } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    const newUser = { username, password: hashedPassword, role };

    // Read existing user data
    fs.readFile(userDataFilePath, 'utf8', (err, data) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(500).send('Error reading user data file');
      }

      let users = [];
      if (data) {
        try {
          users = JSON.parse(data);
        } catch (parseError) {
          return res.status(500).send('Error parsing user data file');
        }
      }

      // Check if the username already exists
      if (users.find((u) => u.username === username)) {
        return res.send('Username already exists');
      }

      // Add the new user and save to file
      users.push(newUser);
      fs.writeFile(userDataFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).send('Error saving user data');
        }
        res.send('User registered successfully!');
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/login.html`);
});
