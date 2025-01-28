# Overview
This project uses a Node.js server with an authentication and form submission funcionality.

# Technologies
- Node.js: JavaScript runtime for backend server-side logic.
- bcryptjs: For hashing and comparing passwords

# Prerequisites
- Node.js: If not already installed, download and install from nodejs.org

# Project Setup
- We need to create an sh script that sets this up - installs all the packages

# Code Walkthrough
server.js : This file contains all the logic for hadnling HTTP request, processing form data, and managing user authentications.

public/ : The directory that holds these files: login.html, administrator.html, volunteer.html, developer.html
- login.html: Log in page
- administrator.html: Host the live tracking feature
- volunteer.html: Hosts the medical form to submit.
- developer.html: Hosts tools to set up this project which include generating accounts and running tests.

