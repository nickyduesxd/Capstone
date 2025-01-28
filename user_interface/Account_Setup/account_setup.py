import csv
import json
import random
import string
import bcrypt
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# sender email : mcm.communications.capstone1@gmail.com
# sender password : capstone

# Function to send the email
def send_email(sender_email, sender_password, receiver_email, subject, body):
    # Set up the server (Gmail SMTP server)
    smtp_server = "smtp.gmail.com"
    smtp_port = 465  # SSL port

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Create the email message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Attach the body with the email
    message.attach(MIMEText(body, "plain"))

    try:
        # Set up the connection and login to the email account
        with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
            server.login(sender_email, sender_password)

            # Send the email
            server.sendmail(sender_email, receiver_email, message.as_string())
            print("Email sent successfully!")
    except Exception as e:
        print(f"Error: {e}")


# Function to generate a strong password
def generate_strong_password(length=12):
    if length < 12:
        print("For better security, a password length of 12 or more is recommended.")
        length = 12  # Set a minimum length for the password
    
    # Define the possible character sets
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    punctuation = string.punctuation

    # Combine all possible characters
    all_characters = lowercase + uppercase + digits + punctuation

    # Generate the password
    password = [
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(digits),
        random.choice(punctuation),
    ]
    
    # Fill the rest of the password length with random characters from all categories
    password += random.choices(all_characters, k=length - 4)

    # Shuffle the list to avoid predictable patterns
    random.shuffle(password)

    # Convert the list to a string and return
    return ''.join(password)

# Function to read CSV and convert to JSON with hashed password
def csv_to_json(csv_file, json_file):
    data = []

    sender_email = "mcm.communications.capstone1@gmail.com"  # Enter your email
    sender_password = "mcem npen zcpd nqkk"  # Enter your email password or app-specific password


    # Open the CSV file
    with open(csv_file, mode='r', newline='', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        # Loop through each row in the CSV and add to the data list
        for row in reader:
            # Generate a strong password and hash it
            password = generate_strong_password(16)
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

            # Assuming the CSV has 'first_name', 'last_name', 'level', and 'email' columns
            person = {
                "first_name": row["first_name"],
                "last_name": row["last_name"],
                "role": row["role"],
                "email": row["email"],
                "password": hashed_password,
                "new_password_set": False
            }
            data.append(person)
            receiver_email = row["email"]
            subject = "Test Email"
            body = "This is an automatic email sent from Python!"
            send_email(sender_email, sender_password, receiver_email, subject, body)

    # Write the data to a JSON file
    with open(json_file, 'w', encoding='utf-8') as jsonf:
        json.dump(data, jsonf, indent=4)

# Example usage
csv_to_json('data_sample_test.csv', 'users.json')
