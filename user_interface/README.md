# Summary of Program and File Functionality
## Python Files
### participant_setup.py
Converts Participant Information stored in CSV file into a JSON file.
To run: python ./participant_setup.py <participants_info.csv>
### account_setup.py
Converts users.csv file to json file then proceeds to make user accounts.
After creation, each user is sent an email with their made username and a "Strong Password"
which they will change after they first log in.
To run: python ./account_setup.py  <users_info.csv>
### sendEmailtoInjured.py
Sends an email of the report to the participant with the injury.
It is called by the server.js process after it recieves a report.
## NodeJS File
### server.js
Backend of the Webserver, maintains functionality such as searching reports, updating reports, calculating number of reports, etc.
To run: node ./server.js
## HTML Files in /public
### login.html
Asks for username and password.
### newlogin.html
Navigates new users to this page in order to make their own passwords.
### administrator.html
For administrators, can generate user accounts, generate pdfs of all the medical reports, and live tracking.
### volunteer.html
For medical volunteers where they can submit forms, update forms, search forms, use a barcode scanner to autofill participant information.
### user-guide.html
Basic user guide.
## JSON Files
### users.json
Stores user accounts split by roles: volunteers and adminsitrators.
Alongside each user is stored their names, username, email address, role, hashed password, and boolean for if they set a new password.
### reports.json
Stores medical reports of participants with the necessary fields.
### participants.json
Stores participant information: bib number, first name, last name, email, and phone number.
### Test Files


