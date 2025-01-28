import unittest
from unittest.mock import patch, MagicMock
import io
import string
from account_setup import csv_to_json, generate_strong_password  # Ensure correct import from your script

CSV_CONTENT = """first_name,last_name,role,email
John,Doe,Admin,john.doe@example.com
Jane,Smith,User,jane.smith@example.com
"""

class TestEmailPasswordCSVConversion(unittest.TestCase):

    @patch('builtins.open', side_effect=lambda filename, mode, newline='', encoding='utf-8-sig': io.StringIO(CSV_CONTENT) if filename == 'test.csv' else MagicMock())  # Mock CSV file reading
    @patch('smtplib.SMTP_SSL')  # Mock email sending
    @patch('random.choice')  # Mock random.choice for password generation
    @patch('random.choices')  # Mock random.choices for password generation
    @patch('account_setup.send_email')  # Mock send_email function properly
    def test_csv_to_json(self, mock_send_email, mock_random_choices, mock_random_choice, mock_smtp, mock_open):
        mock_random_choice.return_value = 'a'  # Mock for random choice
        mock_random_choices.return_value = ['A', '1', '@', 'a'] * 4  # Mock for random.choices

        with patch('bcrypt.hashpw') as mock_hashpw:
            mock_hashpw.return_value = b"$2b$12$hashedpasswordfortesting"  # Mock bcrypt hash function

            # Calling the function
            csv_file = 'test.csv'
            json_file = 'output.json'
            csv_to_json(csv_file, json_file)

            # Now assert the number of times the send_email function was called
            self.assertEqual(mock_send_email.call_count, 2)  # Two emails sent in the CSV

    def test_generate_strong_password(self):
        password = generate_strong_password(16)
        self.assertEqual(len(password), 16)  # Ensure password length is 16
        self.assertTrue(any(c.islower() for c in password))  # Ensure at least one lowercase
        self.assertTrue(any(c.isupper() for c in password))  # Ensure at least one uppercase
        self.assertTrue(any(c.isdigit() for c in password))  # Ensure at least one digit
        self.assertTrue(any(c in string.punctuation for c in password))  # Ensure at least one punctuation character

if __name__ == '__main__':
    unittest.main()
