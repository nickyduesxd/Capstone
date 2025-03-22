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

# Function to read CSV and convert to JSON with hashed password
def main(csv_file, json_file):


    # Open the CSV file
    with open(csv_file, mode='r', newline='', encoding='utf-8-sig') as file:
        data=[]
        reader = csv.DictReader(file)
        # Loop through each row in the CSV and add to the data list
        for row in reader:
            # Assuming the CSV has 'first_name', 'last_name', 'level', and 'email' columns
            person = {
                "first_name": row["first_name"],
                "last_name": row["last_name"],
                "bib": row["bib_num"],
                "phone_number": row["phone_num"],
                "email": row["email"]
            }
            data.append(person)

    # Write the data to a JSON file
    with open(json_file, 'w', encoding='utf-8') as jsonf:
        json.dump(data, jsonf, indent=4)
    return 1

# actually not autmoated test
# csv_to_json('data_sample_test.csv', 'users.json')
if __name__ == "__main__":
    # Get the file path from command-line arguments
    csv_file_path = sys.argv[1]
    
    # Convert CSV to JSON
    json_data = main(csv_file_path, "participants.json")
    
    # Print the JSON data (this will be captured by Node.js)
    print(json.dumps(json_data))