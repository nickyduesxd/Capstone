# Import packages
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

        # set resolution
        barcode_obj.writer.dpi = 300

        # Set barcode size - can adjust
        barcode_obj.writer.options = {"module_width": 0.3, "module_height": 20}

        # remove .png extension if it exists - had that error, code would create a file.png.png file
        if filename.endswith('.png'):
            filename = filename[:-4]

        # save the barcode to the specified file path
        save_path = os.path.join(os.path.expanduser("~"), "Documents", filename)
        actual_filename = barcode_obj.save(save_path)
        
        print(f"Barcode saved as: {actual_filename}")
        
        # check if file was saved
        if os.path.exists(actual_filename):
            print(f"File {actual_filename} was saved successfully.")
            # open the file with the default application in order to visually confirm
            open_file(actual_filename)
        else:
            print(f"File {actual_filename} does not exist even after attempting to save.")
    except Exception as e:
        print(f"Error generating or saving the barcode: {e}")

def open_file(file_path):
    try:
        # determine the operating system
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

# example usage for demo
data = "2025"
generate_barcode(data, filename="generated_barcode")