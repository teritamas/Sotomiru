from typing import List
import contract_proxy.config as config
from contract_proxy.facades.thirdweb import sdk


contract = sdk.get_contract(config.ERC1155_CONTRACT_ADDRESS)


def add_owner_nfts(address: str, memoryTokenIds: List[str]):
    for memoryTokenId in memoryTokenIds:
        try:
            tx = contract.erc1155.mint_additional_supply(memoryTokenId, 1)
            token_id = tx.id
            _ = tx.data()
            print(f"mint_additional_supply Success. token_id: {token_id}")
        except Exception as e:
            print("mint_additional_supply Error", e)

        try:
            _ = contract.erc1155.transfer(address, memoryTokenId, 1)
            print(f"transfer Success. address: {address}, ")
        except Exception as e:
            print("transfer Error", e)
