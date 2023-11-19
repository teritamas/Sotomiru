from create_complete_movie.facades.firestore.bingo_card import (
    fetch_bingo_card_answer_users,
)
from create_complete_movie.facades.thirdweb.erc1155_main_contract import (
    mint_movie_nft,
    transfer_nft,
)
from create_complete_movie.facades.firestore.user import (
    update_pre_grant_memory_nft_token_ids,
)


def mint_and_transfer_nft(bingo_card_id, bingo_card_name, public_url):
    """NFTをmintして、ビンゴの回答者全員にNFTを送る

    Args:
        bingo_card_id (_type_): _description_
        public_url (_type_): _description_
    """
    bingo_card_answer_users = fetch_bingo_card_answer_users(bingo_card_id)

    # walletAddressのみを取得する、Noneの場合は除外する
    bingo_card_answer_user_wallet_address = [
        user.walletAddress
        for user in bingo_card_answer_users
        if user.walletAddress is not None and user.walletAddress != ""
    ]

    # NFTをmintする. ビンゴカードに回答した人数分mintする
    # ビンゴカードに回答したメンバーにウォレットを保有する人がいない場合でも、のちに配布する可能性があるため、Supplyを0としてmintする
    mint_count = len(bingo_card_answer_user_wallet_address)
    token_id, nft = mint_movie_nft(
        bingo_card_name, public_url, supply=mint_count
    )

    # walletAddressを保有しないユーザには、のちに配布できるように、DBにNFTの情報を保存する
    update_pre_grant_memory_nft_token_ids(
        token_id, [user.uid for user in bingo_card_answer_users]
    )

    if len(bingo_card_answer_users) == 0:
        print("匿名ユーザの回答者のみのため、NFTを配布しません")
        return

    # 回答者全員にNFTを送る
    transfer_nft(token_id, bingo_card_answer_user_wallet_address)
    print(f"token_id: {token_id}")
