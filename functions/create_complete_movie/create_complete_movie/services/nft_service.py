from create_complete_movie.facades.firestore.bingo_card import (
    fetch_bingo_card_answer_users,
)
from create_complete_movie.facades.thirdweb.erc1155_main_contract import (
    mint_movie_nft,
    transfer_nft,
)


def mint_and_transfer_nft(bingo_card_id, bingo_card_name, public_url):
    """NFTをmintして、ビンゴの回答者全員にNFTを送る

    Args:
        bingo_card_id (_type_): _description_
        public_url (_type_): _description_
    """
    bingo_card_answer_users = fetch_bingo_card_answer_users(bingo_card_id)

    if len(bingo_card_answer_users) == 0:
        print("匿名ユーザの回答者のみのため、NFTをmintしません")
        return
    # NFTをmintする. ビンゴカードに回答した人数分mintする
    mint_count = len(bingo_card_answer_users)
    token_id, nft = mint_movie_nft(
        bingo_card_name, public_url, supply=mint_count
    )

    print(bingo_card_answer_users)
    # 回答者全員にNFTを送る
    transfer_nft(token_id, bingo_card_answer_users)
    print(f"token_id: {token_id}")
