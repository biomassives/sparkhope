#!/usr/bin/env python3
import struct
import zlib

def create_png(width, height, rgb, filename):
    """Create a simple PNG file"""
    def png_chunk(chunk_type, data):
        chunk = chunk_type + data
        crc = zlib.crc32(chunk) & 0xffffffff
        return struct.pack(">I", len(data)) + chunk + struct.pack(">I", crc)
    
    # PNG header
    png = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png += png_chunk(b'IHDR', ihdr)
    
    # IDAT chunk (image data) - solid color
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter type
        for x in range(width):
            raw_data += bytes(rgb)
    
    compressed = zlib.compress(raw_data)
    png += png_chunk(b'IDAT', compressed)
    
    # IEND chunk
    png += png_chunk(b'IEND', b'')
    
    with open(filename, 'wb') as f:
        f.write(png)
    print(f"✅ Created {filename}")

# Create green square icons (mushroom color)
create_png(48, 48, [135, 168, 120], 'icons/icon48.png')
create_png(96, 96, [135, 168, 120], 'icons/icon96.png')
