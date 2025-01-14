import barcode
from barcode.writer import ImageWriter

# Choose the type of barcode you want (e.g., 'EAN13', 'UPC', etc.)
barcode_type = 'EAN13'

# Data to encode in the barcode
data = '123456789012'

# Create a barcode object
barcode_obj = barcode.get_barcode_class(barcode_type)

# Generate the barcode and save it as an image
barcode_instance = barcode_obj(data, writer=ImageWriter())
barcode_instance.save('barcode_image')  # Saves as barcode_image.png by default

print("Barcode image saved successfully!")
