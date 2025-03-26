
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const assert = require('assert');

// Base URL for the server
const BASE_URL = 'http://localhost:3017';

// Test user credentials
const testUser = {
  username: 'tvolunteer',
  password: 'test'
};

// Test admin credentials
const testAdmin = {
  username: 'RRoot',
  password: 'admin'
};

// Test incident report data
const testReport = {
  "incident-date": "2025-03-20",
    "incident-time": "10:30",
    "incident-location": "Mile 15 Aid Station",
    "person-name": "John Runner",
    "person-contact": "555-123-4567",
    "person-email": "john.runner@example.com",
    "injury-type": "Ankle Sprain",
    "affected-body-part": "Ankle",
    "visible-symptoms": "N/A",
    "cause": "N/A",
    "first-aid-measures": "N/A",
    "treatment-details": "Ice pack, compression bandage",
    "first-aider-name": "Nicholas Zayfman",
    "first-aider-contact": "555-123-1234",
    "additional-notes": "Runner wants to continue after rest.",
    "first-aider-signature": "Nicholas Zayfman",
    "signature-date": "2025-03-20"
};

// Create necessary test files
async function setupTestEnvironment() {
  console.log('Setting up test environment...');
  
  // Create test users.json if it doesn't exist
  const usersPath = path.join(__dirname, 'users.json');
  if (!fs.existsSync(usersPath)) {
    const bcrypt = require('bcryptjs');
    const testUsers = [
      {
        username: testUser.username,
        password: bcrypt.hashSync(testUser.password, bcrypt.genSaltSync(10)),
        role: 'Volunteer',
        new_password_set: false
      },
      {
        username: testAdmin.username,
        password: bcrypt.hashSync(testAdmin.password, bcrypt.genSaltSync(10)),
        role: 'Administrator',
        new_password_set: true
      }
    ];
    fs.writeFileSync(usersPath, JSON.stringify(testUsers, null, 2));
    console.log('Created test users.json');
  }
  
  // Create test reports.json if it doesn't exist
  const reportsPath = path.join(__dirname, 'reports.json');
  if (!fs.existsSync(reportsPath)) {
    fs.writeFileSync(reportsPath, JSON.stringify([], null, 2));
    console.log('Created empty reports.json');
  }
  
  // Create test participants.json if it doesn't exist
  const participantsPath = path.join(__dirname, 'participants.json');
  if (!fs.existsSync(participantsPath)) {
    const testParticipants = [
      {
        name: 'John Runner',
        bib: '1234',
        age: 35,
        gender: 'M',
        emergency_contact: 'Jane Runner',
        emergency_phone: '555-987-6543',
        medical_conditions: 'None'
      },
      {
        name: 'Sarah Marathoner',
        bib: '5678',
        age: 28,
        gender: 'F',
        emergency_contact: 'Mike Marathoner',
        emergency_phone: '555-456-7890',
        medical_conditions: 'Asthma'
      }
    ];
    fs.writeFileSync(participantsPath, JSON.stringify(testParticipants, null, 2));
    console.log('Created test participants.json');
  }
  
  // Create test CSV for account setup
  const csvPath = path.join(__dirname, 'test_accounts.csv');
  const csvContent = 'username,password,role\nnewuser1,pass123,Volunteer\nnewuser2,pass456,Administrator';
  fs.writeFileSync(csvPath, csvContent);
  console.log('Created test_accounts.csv');
}

// Main test runner
async function runTests() {
  try {
    await setupTestEnvironment();
    console.log('\nStarting tests...\n');
    
    // test 1: Server is running - works
    await testServerConnection();
    
    // test 2: Login functionality - works
    await testLogin();
    
    // test 3: Login with incorrect credentials - works
    await testLoginFailure();

    // test 4: Participant data retrieval  - works
    await testGetParticipantData();
    
    // test 5: Submit form (incident report) - works
    await testSubmitForm();
    
    // test 6: PDF generation - works
    await testPdfGeneration();
    
    // test 7: Get injury locations - works
    await testGetInjuryLocations();
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Test functions
async function testServerConnection() {
  try {
    const response = await axios.get(`${BASE_URL}/login`);
    assert.strictEqual(response.status, 200);
    console.log('✓ Server connection test passed');
  } catch (error) {
    throw new Error(`Server connection test failed: ${error.message}`);
  }
}

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, 
      `username=${testAdmin.username}&password=${testAdmin.password}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        validateStatus: status => status >= 200 && status < 400
      }
    );
    
    // Check if the redirect is to administrator.html
    assert(response.status === 302 || response.status === 303);
    assert(response.headers.location.includes('administrator.html'));
    console.log('✓ Login test passed');
  } catch (error) {
    throw new Error(`Login test failed: ${error.message}`);
  }
}

async function testLoginFailure() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, 
      'username=wronguser&password=wrongpass',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        validateStatus: status => status >= 200 && status < 400
      }
    );
    
    // Check if the redirect is to login.html (failed login)
    assert(response.status === 302 || response.status === 303);
    assert(response.headers.location.includes('login.html'));
    console.log('✓ Login failure test passed');
  } catch (error) {
    throw new Error(`Login failure test failed: ${error.message}`);
  }
}

async function testGetParticipantData() {
  try {
    const response = await axios.get(`${BASE_URL}/getParticipantData?bib=1234`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.first_name, 'John');
    console.log('✓ Get participant data test passed');
  } catch (error) {
    throw new Error(`Get participant data test failed: ${error.message}`);
  }
}

async function testSearchFunctionality() {
  try {
    // First, ensure we have at least one report
    const reportsPath = path.join(__dirname, 'reports.json');
    let reports = JSON.parse(fs.readFileSync(reportsPath, 'utf-8'));
    
    if (reports.length === 0) {
      reports.push(testReport);
      fs.writeFileSync(reportsPath, JSON.stringify(reports, null, 2));
    }
    
    const response = await axios.get(`${BASE_URL}/search_form?search-name=John&search-injury-type=Ankle`);
    assert.strictEqual(response.status, 200);
    assert(Array.isArray(response.data));
    console.log('✓ Search functionality test passed');
  } catch (error) {
    throw new Error(`Search functionality test failed: ${error.message}`);
  }
}

async function testSubmitForm() {
  try {
    const formData = new URLSearchParams();
    
    // Add form fields
    Object.entries(testReport).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    const response = await axios.post(`${BASE_URL}/submit_form`, 
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        validateStatus: status => status >= 200 && status < 400
      }
    );
    
    // Check for redirect to volunteer.html
    assert(response.status === 302 || response.status === 303);
    assert(response.headers.location.includes('volunteer.html'));
    console.log('✓ Submit form test passed');
  } catch (error) {
    throw new Error(`Submit form test failed: ${error.message}`);
  }
}

async function testPdfGeneration() {
  try {
    const response = await axios.get(`${BASE_URL}/generate-pdf`, {
      responseType: 'arraybuffer',
      validateStatus: status => status >= 200 && status < 400
    });
    
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.headers['content-type'], 'application/pdf');
    console.log('✓ PDF generation test passed');
  } catch (error) {
    throw new Error(`PDF generation test failed: ${error.message}`);
  }
}

async function testGetInjuryLocations() {
  try {
    const response = await axios.get(`${BASE_URL}/get-injury-locations`);
    
    assert.strictEqual(response.status, 200);
    assert(Array.isArray(response.data));
    console.log('✓ Get injury locations test passed');
  } catch (error) {
    throw new Error(`Get injury locations test failed: ${error.message}`);
  }
}

// Run the tests
runTests();