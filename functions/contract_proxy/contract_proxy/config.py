from os import environ
from dotenv import load_dotenv

load_dotenv(verbose=True)

# FireStoreの認証キー
CRED_PATH = environ.get(
    "CRED_PATH", "../../key.json"
)  # functions/create_complete_movieからのパス

THIRDWEB_API_KEY = environ.get("THIRDWEB_API_KEY", "")
THIRDWEB_SIGNER_PRIVATEKEY = environ.get("THIRDWEB_SIGNER_PRIVATEKEY", "")
ERC1155_CONTRACT_ADDRESS = environ.get("ERC1155_CONTRACT_ADDRESS", "")
BINGO_TOKE_ID = environ.get("BINGO_TOKE_ID", "4")
