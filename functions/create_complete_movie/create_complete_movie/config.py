from os import environ
from dotenv import load_dotenv

load_dotenv(verbose=True)

# FireStoreの認証キー
CRED_PATH = environ.get(
    "CRED_PATH", "../../key.json"
)  # functions/create_complete_movieからのパス
GOOGLE_CLOUD_STORAGE_BUCKET_NAME = environ.get(
    "GOOGLE_CLOUD_STORAGE_BUCKET_NAME", "key3-global-hackathon.appspot.com"
)
THIRDWEB_API_KEY = environ.get("THIRDWEB_API_KEY", "")
THIRDWEB_SIGNER_PRIVATEKEY = environ.get("THIRDWEB_SIGNER_PRIVATEKEY", "")
NETWORK_NAME_OR_RPC_URL = environ.get("NETWORK_NAME_OR_RPC_URL", "goerli")
ERC1155_CONTRACT_ADDRESS = environ.get("ERC1155_CONTRACT_ADDRESS", "")
