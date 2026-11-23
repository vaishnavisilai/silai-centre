"""Hide a phone number or email from bots.  Usage:
   python3 encode.py 919876543210
   python3 encode.py you@example.com
Paste the printed value into content.js (phoneEnc or emailEnc)."""
import base64, sys
if len(sys.argv) != 2:
    sys.exit(__doc__)
print(base64.b64encode(sys.argv[1][::-1].encode()).decode())
