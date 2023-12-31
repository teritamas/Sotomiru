from os import environ
from dotenv import load_dotenv

load_dotenv(verbose=True)

THIRDWEB_API_KEY = environ.get("THIRDWEB_API_KEY", "")
THIRDWEB_SIGNER_PRIVATEKEY = environ.get("THIRDWEB_SIGNER_PRIVATEKEY", "")
NETWORK_NAME_OR_RPC_URL = environ.get("NETWORK_NAME_OR_RPC_URL", "goerli")
ERC1155_CONTRACT_ADDRESS = environ.get("ERC1155_CONTRACT_ADDRESS", "")
BINGO_TOKE_ID = environ.get("BINGO_TOKE_ID", "0")
