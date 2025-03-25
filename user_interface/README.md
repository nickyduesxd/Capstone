# Summary of Program and File Functionality
NOTES:
- For csv files, take a look at our csv files to see the general format on the input.
- Run account_setup.py and participant_setup.py before running the UI - nodejs.
## Python Files
### [participant_setup.py](/user_interface/participant_setup.py)
Converts Participant Information stored in CSV file into a JSON file. Used for when the barcode is scanned, to search participants information.
#### To run: python ./participant_setup.py <participants_info.csv>
### [account_setup.py](/user_interface/account_setup.py)
Converts users.csv file to json file then proceeds to make user accounts.
After creation, each user is sent an email with their made username and a "Strong Password"
which they will change after they first log in.
#### To run: python ./account_setup.py  <users_info.csv>
### [sendEmailtoInjured.py](/user_interface/sendEmailtoInjured.py)
Sends an email of the report to the participant with the injury.
It is called by the server.js process after it recieves a report from the front end.
### [BarcodeGenerator.py](/user_interface/BarcodeGenerator.py)
Generates barcode based on bib, need manual input, can loop and store.

## NodeJS Files
### [server.js](/user_interface/server.js)
Backend of the Webserver, maintains functionality such as searching reports, updating reports, calculating number of reports, etc.
#### To run: node ./server.js

## HTML Files in /public
### [login.html](/user_interface/public/login.html)
Asks for username and password then proceeds to authenticate.
### [newlogin.html](/user_interface/public/newlogin.html)
Redirect for changing password upon first log in.
Asks for username and password then proceeds to authenticate.
### [administrator.html](/user_interface/public/administrator.html)
For administrators, can generate user accounts, generate pdfs of all the medical reports, and live tracking.
### [volunteer.html](/user_interface/public/volunteer.html)
For medical volunteers where they can submit forms, update forms, search forms, use a barcode scanner to autofill participant information.
### [user-guide.html](/user_interface/public/user-guide.html)
Basic user guide, as seen on the volunteer.html page.

## JSON Files
### [users.json](/user_infterface/users.json)
Stores user accounts split by roles: volunteers and adminsitrators.
Alongside each user is stored their names, username, email address, role, hashed password, and boolean for if they set a new password.
### [reports.json](/user_interface/reports.json)
Stores medical reports of participants with the necessary fields.
### [participants.json](/user_infterface/participants.json)
Stores participant information: bib number, first name, last name, email, and phone number.

## CSV Files
### [data_sample_test.csv](/user_interface/data_sample_test.csv)
Stores user's names, emails, roles (administrator or volunteerr), etc.
### [particpants_info.csv](/user_interface/participants_info.csv)
Stores participants information.

## Test Files
### [server_test.js](/user_interface/server_test.js)
Tests the functionalities of the server. 
Before you run the test file, the UI must be up and running.
#### To run: node server_test.js

