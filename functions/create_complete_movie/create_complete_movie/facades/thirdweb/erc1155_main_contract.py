from math import e
import create_complete_movie.config as config
from create_complete_movie.facades.thirdweb import sdk
from thirdweb.types.nft import NFTMetadataInput, EditionMetadataInput


contract = sdk.get_contract(config.ERC1155_CONTRACT_ADDRESS)


def mint_movie_nft(name: str, animation_url: str, supply: int = 1):
    # Note that you can customize this metadata however you like
    try:
        metadata_with_supply = EditionMetadataInput(
            NFTMetadataInput.from_json(
                {
                    "name": name,
                    "description": "ビンゴカードのクリアの動画をNFT化したものです",
                    "animation_url": animation_url,
                }
            ),
            supply=supply,
        )

        tx = contract.erc1155.mint(metadata_with_supply)
        _ = tx.receipt
        token_id = tx.id
        nft = tx.data()
        print(f"トークンの発行が成功しました: {tx}")
        return token_id, nft
    except e:
        print(f"トークンの発行の際にエラーが発生しました: {e}")


def transfer_nft(token_id: str, to_address_list: list[str]):
    for to_address in to_address_list:
        try:
            tx = contract.erc1155.transfer(to_address, token_id, 1)
            print(f"トークンの所有権移動が成功しました: address: {to_address}, {tx}")
        except e:
            print(f"トークンの所有権移動の際にエラーが発生しました: {e}")
