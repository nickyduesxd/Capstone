#!/bin/bash

# This script will install all the necessary packages in order to run the webserver.

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

echo "Installing required Node.js packages..."
npm install express bcryptjs body-parser axios pdf-lib multer

echo "All packages installed successfully!"

echo "Installing Python and necessary packages..."
sudo apt install -y python3 python3-pip
pip3 install --upgrade pip

echo "Installing Python dependencies..."

sudo apt-get update

sudo apt-get install -y python3 python3-pip

pip install bcrypt
pip install smtplib
pip install ssl
pip install email
pip install csv
pip install json
pip install python-barcode
pip install Pillow
pip install os
pip install barcode
pip install subprocess
pip install platform
pip install json
pip install random
pip install sting
pip install sys

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