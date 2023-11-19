from typing import Union
from create_complete_movie.facades.firestore import db
from create_complete_movie.models.bingo_card import BingoCardCell


COLLECTION_PREFIX = "users"


def update_pre_grant_memory_nft_token_ids(
    token_id: str, uids: list[str]
) -> Union[list[BingoCardCell], None]:
    """ユーザーが取得漏れたNFTの一覧を更新する

    Args:
        token_id (str): _description_
        uids (list[str]): _description_

    Returns:
        Union[list[BingoCardCell], None]: _description_
    """
    for uid in uids:
        user = db.fetch(collection=COLLECTION_PREFIX, id=uid)
        # preGrantMemoryNftTokenIdsが存在しない場合は、初期化する
        if "preGrantMemoryNftTokenIds" not in user:
            user["preGrantMemoryNftTokenIds"] = []

        user["preGrantMemoryNftTokenIds"].append(str(token_id))
        db().collection(COLLECTION_PREFIX).document(uid).set(user)
