from os import environ
from dotenv import load_dotenv

load_dotenv(verbose=True)

# FireStoreの認証キー
CRED_PATH = environ.get("CRED_PATH", "key.json")
GOOGLE_CLOUD_STORAGE_BUCKET_NAME = environ.get(
    "GOOGLE_CLOUD_STORAGE_BUCKET_NAME", "key3-global-hackathon.appspot.com"
)
