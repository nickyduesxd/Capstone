This is our User Interface for our Capstone.

## Flow Chart

login.html - gets user name and password then authenticates
volunteer.html - has report feature, calls barcodereader.py, submits report
admin.html - create user name and password feature, and barcode generator 
manager.html - live tracking map

server.js - maintains functionality of the webserver

users.json - stores username and password

barcodegenerator.py - given user barcodes, creates unique barcodes for each

barcodereader.py - reads barcode and fills out fields on web server

livetracking.py - tracks reports with map


