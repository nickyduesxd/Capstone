import csv
import json
import random
import string
import bcrypt
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import sys

# sender email : mcm.communications.capstone1@gmail.com
# sender password : capstone

import sys
import smtplib
import ssl
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os

# Email credentials
sender_email = "mcm.communications.capstone1@gmail.com"
sender_password = "mcem npen zcpd nqkk"

# Get the arguments passed from Node.js
report_file_path = sys.argv[1]  # The file path passed to the Python script
receiver_email = sys.argv[2]    # The recipient email passed to the Python script

# Read the report JSON data from the passed file path
try:
    with open(report_file_path, 'r') as report_file:
        report_data = json.load(report_file)
        print(f"Report Data Loaded: {report_data}")
except Exception as e:
    print(f"Error reading the report file: {e}")
    sys.exit(1)

# Subject and Body for the email
subject = "Marine Corp Marathon Participant Medical Report"
body = f"Here is the medical report for the participant:\n\n{json.dumps(report_data, indent=4)}"

# Set up the SMTP server (Gmail)
smtp_server = "smtp.gmail.com"
smtp_port = 465  # SSL port
context = ssl.create_default_context()

# Create the email message
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject
message.attach(MIMEText(body, "plain"))

# Send the email
try:
    with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print("Email sent successfully!")
except Exception as e:
    print(f"Error: {e}")

# Clean up the temporary report file after use
if os.path.exists(report_file_path):
    os.remove(report_file_path)
    print(f"Temporary report file {report_file_path} has been deleted.")
