import contract_proxy.config as config
from contract_proxy.facades.thirdweb import sdk


contract = sdk.get_contract(config.ERC1155_CONTRACT_ADDRESS)

TARGET_TOKEN_ID = config.BINGO_TOKE_ID


def transfer_nft(address: str, supply: int):
    try:
        tx = contract.erc1155.mint_additional_supply(TARGET_TOKEN_ID, supply)
        token_id = tx.id
        _ = tx.data()
        print(
            f"mint_additional_supply Success. token_id: {token_id}, supply: {supply}"
        )
    except Exception as e:
        print("mint_additional_supply Error", e)

    try:
        _ = contract.erc1155.transfer(address, TARGET_TOKEN_ID, supply)
        print(f"transfer Success. address: {address}, supply: {supply}")
    except Exception as e:
        print("transfer Error", e)
