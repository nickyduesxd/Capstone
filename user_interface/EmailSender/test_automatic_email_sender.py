import unittest
from unittest.mock import patch, MagicMock
from send_email import send_email  # Import the send_email function from the script

class TestEmailSender(unittest.TestCase):

    @patch("smtplib.SMTP_SSL")  # Mock the SMTP_SSL class from smtplib
    def test_send_email_success(self, MockSMTP):
        # Create a mock SMTP instance
        mock_smtp_instance = MagicMock()
        
        # Assign the mock instance to the class
        MockSMTP.return_value = mock_smtp_instance
        
        # Test data
        sender_email = "test_sender@gmail.com"
        sender_password = "test_password"
        receiver_email = "test_receiver@example.com"
        subject = "Test Subject"
        body = "Test Body"

        # Call the send_email function
        send_email(sender_email, sender_password, receiver_email, subject, body)

        # Assert that the SMTP connection was created
        MockSMTP.assert_called_once_with("smtp.gmail.com", 465)
        
        # Assert that login was called with the correct credentials
        mock_smtp_instance.login.assert_called_once_with(sender_email, sender_password)

        # Assert that the email was sent with the correct parameters
        mock_smtp_instance.sendmail.assert_called_once_with(
            sender_email, receiver_email, 
            "Content-Type: text/plain; charset=utf-8\r\n"
            "MIME-Version: 1.0\r\n"
            "Subject: Test Subject\r\n"
            "From: test_sender@gmail.com\r\n"
            "To: test_receiver@example.com\r\n"
            "\r\n"
            "Test Body"
        )

    @patch("smtplib.SMTP_SSL")
    def test_send_email_failure(self, MockSMTP):
        # Simulate an error during email sending (e.g., login failure)
        mock_smtp_instance = MagicMock()
        MockSMTP.return_value = mock_smtp_instance
        mock_smtp_instance.login.side_effect = Exception("Login failed")

        sender_email = "test_sender@gmail.com"
        sender_password = "wrong_password"  # Simulating incorrect password
        receiver_email = "test_receiver@example.com"
        subject = "Test Subject"
        body = "Test Body"

        # Check if an exception is raised when login fails
        with self.assertRaises(Exception):
            send_email(sender_email, sender_password, receiver_email, subject, body)

        # Verify that login was attempted with the provided credentials
        mock_smtp_instance.login.assert_called_once_with(sender_email, sender_password)

if __name__ == "__main__":
    unittest.main()
