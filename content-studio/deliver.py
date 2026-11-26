"""Send a ContentForge JSON dossier to a customer-configured HTTPS webhook."""
import argparse
import hashlib
import hmac
import http.client
import json
import os
import ssl
import sys
from pathlib import Path
from urllib.parse import urlsplit

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("payload", type=Path)
    args = parser.parse_args()
    target = urlsplit(os.environ.get("CONTENTFORGE_WEBHOOK_URL", ""))
    secret = os.environ.get("CONTENTFORGE_SIGNING_SECRET", "")
    if target.scheme != "https" or not target.hostname or target.username or target.password or target.fragment or not secret:
        parser.error("Set CONTENTFORGE_WEBHOOK_URL to your HTTPS receiver and CONTENTFORGE_SIGNING_SECRET to its signing secret.")
    data = args.payload.read_bytes()
    payload = json.loads(data)
    if not isinstance(payload, dict) or not payload.get("sourceDocumentTitle") or not isinstance(payload.get("extractedClaims"), list):
        parser.error("Use a JSON payload downloaded from a completed dossier.")
    signature = hmac.new(secret.encode(), data, hashlib.sha256).hexdigest()
    headers = {"Content-Type": "application/json", "X-ContentForge-Signature": "sha256=" + signature,
               "Idempotency-Key": hashlib.sha256(data).hexdigest()}
    context = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)
    connection = http.client.HTTPSConnection(target.hostname, target.port, timeout=20, context=context)
    try:
        path = (target.path or "/") + ("?" + target.query if target.query else "")
        connection.request("POST", path, data, headers)
        response = connection.getresponse()
        print(json.dumps({"http_status": response.status, "payload_sha256": headers["Idempotency-Key"]}))
        return 0 if 200 <= response.status < 300 else 1
    finally:
        connection.close()

if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, http.client.HTTPException) as error:
        sys.exit("Delivery failed (" + type(error).__name__ + "). Check the file, TLS and receiver, then retry.")
