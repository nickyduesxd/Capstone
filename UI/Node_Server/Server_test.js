const request = require('supertest');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Path to your server file
const server = require('./server');  // Assuming your server file is called "server.js"

// Path to your user data file
const userDataFilePath = path.join(__dirname, 'users.json');

// Clear the users.json file before tests (to start fresh)
beforeEach(() => {
  fs.writeFileSync(userDataFilePath, JSON.stringify([])); // Reset the users data
});

describe('User Authentication API', () => {
  it('should load the login page', async () => {
    const response = await request(server).get('/login');
    assert.strictEqual(response.status, 200);
    assert(response.text.includes('<form'));  // Check if login form is present
  });

  it('should redirect to login when accessing the root URL', async () => {
    const response = await request(server).get('/');
    assert.strictEqual(response.status, 302);
    assert.strictEqual(response.headers.location, '/login');
  });

  it('should handle login with valid credentials', async () => {
    // Register a test user
    const user = {
      username: 'testuser',
      password: 'password123',
      role: 'user'
    };

    await request(server)
      .post('/register')
      .send(user);

    // Try to log in with valid credentials
    const response = await request(server)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' });

    assert.strictEqual(response.status, 302);  // Successful login redirects
    assert.strictEqual(response.headers.location, '/index.html');
  });

  it('should handle login with invalid credentials', async () => {
    // Try to log in with invalid credentials
    const response = await request(server)
      .post('/login')
      .send({ username: 'nonexistentuser', password: 'wrongpassword' });

    assert.strictEqual(response.status, 302);  // Invalid login redirects
    assert.strictEqual(response.headers.location, '/login.html');
  });

  it('should register a new user', async () => {
    const response = await request(server)
      .post('/register')
      .send({ username: 'newuser', password: 'newpassword', role: 'user' });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'User registered successfully!');
  });

  it('should reject duplicate username during registration', async () => {
    // Register the first user
    await request(server)
      .post('/register')
      .send({ username: 'existinguser', password: 'password123', role: 'user' });

    // Try registering with the same username
    const response = await request(server)
      .post('/register')
      .send({ username: 'existinguser', password: 'newpassword', role: 'user' });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'Username already exists');
  });
});
