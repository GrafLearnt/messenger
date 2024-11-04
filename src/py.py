import gzip
import base64

def generate_compressed_seed(data: str, key: int = 5) -> str:
    """Generate a compressed and reversible seed using a transformation parameter."""
    # Transform data using the key as a basic XOR operation
    transformed_data = ''.join(chr(ord(char) ^ key) for char in data)
    
    # Compress the transformed data
    compressed_data = gzip.compress(transformed_data.encode('utf-8'))
    
    # Encode the compressed data to Base64
    encoded_str = base64.urlsafe_b64encode(compressed_data).decode('utf-8')
    
    return encoded_str

def reverse_compressed_seed(encoded_str: str, key: int = 5) -> str:
    """Decode, decompress, and reverse the transformation to retrieve the original data."""
    # Decode the Base64 encoded string
    compressed_data = base64.urlsafe_b64decode(encoded_str.encode('utf-8'))
    
    # Decompress the data
    decompressed_data = gzip.decompress(compressed_data).decode('utf-8')
    
    # Reverse the transformation using XOR with the same key
    original_data = ''.join(chr(ord(char) ^ key) for char in decompressed_data)
    
    return original_data

original_data = "Short data"
seed = generate_compressed_seed(original_data, key=3)
print("Generated Seed:", seed)

decoded_data = reverse_compressed_seed(seed, key=3)
print("Decoded Data:", decoded_data)