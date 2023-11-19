from thirdweb import ThirdwebSDK
import contract_proxy.config as config
from thirdweb.types.sdk import SDKOptions


sdk = ThirdwebSDK.from_private_key(
    config.THIRDWEB_SIGNER_PRIVATEKEY,
    config.NETWORK_NAME_OR_RPC_URL,
    options=SDKOptions(secret_key=config.THIRDWEB_API_KEY),
)
