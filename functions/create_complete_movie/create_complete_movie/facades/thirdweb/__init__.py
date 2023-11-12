from thirdweb import ThirdwebSDK
import create_complete_movie.config as config
from thirdweb.types.sdk import SDKOptions


sdk = ThirdwebSDK.from_private_key(
    config.THIRDWEB_SIGNER_PRIVATEKEY,
    "goerli",
    options=SDKOptions(secret_key=config.THIRDWEB_API_KEY),
)
