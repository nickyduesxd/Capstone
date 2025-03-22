
import os
import barcode
from barcode.writer import ImageWriter
import subprocess
import platform

def generate_barcode(data, filename="generated_barcode"):
    try:
        barcode_format = 'code128'
        barcode_class = barcode.get_barcode_class(barcode_format)
        barcode_obj = barcode_class(data, writer=ImageWriter())

        # Set higher resolution (DPI)
        barcode_obj.writer.dpi = 300  # Increase DPI for better clarity

        # Set barcode size (optional)
        barcode_obj.writer.options = {"module_width": 0.3, "module_height": 20}

        # Remove .png extension if it exists
        if filename.endswith('.png'):
            filename = filename[:-4]

        # Save the barcode to the specified file path
        save_path = os.path.join(os.path.expanduser("~"), "Documents", filename)
        actual_filename = barcode_obj.save(save_path)
        
        print(f"Barcode saved as: {actual_filename}")
        
        # Check if the file was saved successfully
        if os.path.exists(actual_filename):
            print(f"File {actual_filename} was saved successfully.")
            # Open the file with the default application
            open_file(actual_filename)
        else:
            print(f"File {actual_filename} does not exist even after attempting to save.")
    except Exception as e:
        print(f"Error generating or saving the barcode: {e}")

def open_file(file_path):
    """Open a file with the default application based on the operating system."""
    try:
        # Determine the operating system
        system = platform.system()
        
        if system == 'Windows':
            os.startfile(file_path)
        elif system == 'Darwin':  # macOS
            subprocess.run(['open', file_path])
        elif system == 'Linux':
            subprocess.run(['xdg-open', file_path])
        
        print(f"Opened {file_path} with the default viewer.")
    except Exception as e:
        print(f"Error opening the file: {e}")

# Example usage
data = "2025"
generate_barcode(data, filename="generated_barcode")

'''
def generate_barcode(data, filename="generated_barcode"):
    try:
        barcode_format = 'code128'
        barcode_class = barcode.get_barcode_class(barcode_format)
        barcode_obj = barcode_class(data, writer=ImageWriter())

        # Remove .png extension if it exists (the library will add its own extension)
        if filename.endswith('.png'):
            filename = filename[:-4]

        # Save the barcode to the specified file path
        save_path = os.path.join(os.path.expanduser("~"), "Documents", filename)
        actual_filename = barcode_obj.save(save_path)
        
        print(f"Barcode saved as: {actual_filename}")
        
        # Check if the file was saved successfully
        if os.path.exists(actual_filename):
            print(f"File {actual_filename} was saved successfully.")
            
            # Open the file with the default application
            open_file(actual_filename)
        else:
            print(f"File {actual_filename} does not exist even after attempting to save.")
    except Exception as e:
        print(f"Error generating or saving the barcode: {e}")

def open_file(file_path):
    """Open a file with the default application based on the operating system."""
    try:
        # Determine the operating system
        system = platform.system()
        
        if system == 'Windows':
            os.startfile(file_path)
        elif system == 'Darwin':  # macOS
            subprocess.run(['open', file_path])
        elif system == 'Linux':
            subprocess.run(['xdg-open', file_path])
        
        print(f"Opened {file_path} with the default viewer.")
    except Exception as e:
        print(f"Error opening the file: {e}")

# Example usage
data = "John Doe, 123-456-7890, johndoe@example.com"
generate_barcode(data, filename="generated_barcode")

'''