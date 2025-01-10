import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

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

# Example usage
if __name__ == "__main__":
    sender_email = "your_email@gmail.com"  # Enter your email
    sender_password = "your_password"  # Enter your email password or app-specific password
    receiver_email = "receiver_email@example.com"  # Enter recipient's email
    subject = "Test Email"
    body = "This is an automatic email sent from Python!"

    send_email(sender_email, sender_password, receiver_email, subject, body)
