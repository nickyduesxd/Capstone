#!/bin/bash

# This script will install all the necessary packages in order to run the webserver.

echo "Updating system package list..."
sudo apt update

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

echo "Installing required Node.js packages..."
npm install express bcryptjs body-parser axios pdf-lib multer

echo "All packages installed successfully!"

echo "Installing Python and necessary packages..."
sudo apt install -y python3 python3-pip
pip3 install --upgrade pip

echo "Installing Python dependencies..."
pip3 install -r requirements.txt

echo "Setup completed!"

sudo apt-get update

sudo apt-get install -y python3 python3-pip

pip3 install bcrypt
pip3 install smtplib
pip3 install ssl
pip3 install email
pip3 install csv
pip3 install json
pip install python-barcode
pip install Pillow

