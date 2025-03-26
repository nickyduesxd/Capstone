#!/bin/bash

# This script will install all the necessary packages in order to run the webserver.
set -e

echo "===== Installing Node.js and npm ====="
sudo apt update
sudo apt install -y nodejs npm

echo "===== Installing required Node.js packages ====="
npm install express bcryptjs body-parser axios pdf-lib fs path multer child_process

# additional packages needed for testing
npm install form-data assert

echo "===== Installing Python and necessary packages ====="
sudo apt install -y python3 python3-pip
pip3 install --upgrade pip

echo "===== Installing Python dependencies ====="


# third-party modules that need to be installed
pip3 install bcrypt
pip3 install python-barcode
pip3 install Pillow
pip3 install secure-smtplib

# create required directories
echo "===== Creating required directories ====="
mkdir -p uploads

# create empty JSON files if they don't exist
echo "===== Setting up initial JSON files ====="
[ -f users.json ] || echo "[]" > users.json
[ -f reports.json ] || echo "[]" > reports.json
[ -f participants.json ] || echo "[]" > participants.json

echo "===== All packages installed successfully! ====="
echo "You can now start the server with: node server.js"