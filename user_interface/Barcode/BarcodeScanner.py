import sys

def read_barcode():
    barcode_data = sys.stdin.readline().strip()
    return barcode_data

if __name__ == "__main__":
    print("Scan a barcode:")
    barcode = read_barcode()
    print("Barcode data:", barcode)
    