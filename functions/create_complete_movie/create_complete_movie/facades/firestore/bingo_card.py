from typing import Union
from create_complete_movie.facades.firestore import db
from create_complete_movie.models.bingo_card import BingoCardCell
from google.cloud.firestore_v1.base_query import FieldFilter

COLLECTION_PREFIX = "bingoCard"


def fetch_bingo_cell(bingo_card_id: str) -> Union[list[BingoCardCell], None]:
    """ビンゴカードに紐づくビンゴセルを取得する

    Args:
        bingo_card_id (str): _description_

    Returns:
        Union[list[BingoCardCell], None]: _description_
    """
    bingo_card = db.fetch(collection=COLLECTION_PREFIX, id=bingo_card_id)
    bingo_cells = bingo_card.get("bingoCells")
    return [BingoCardCell(**cell) for cell in bingo_cells]


def fetch_clear_and_no_video_bingo_cards() -> Union[list[str], None]:
    """ビンゴカードがクリアしているが、動画が作成されていないビンゴカードのIDの一覧を取得する

    Returns:
        Union[list[str], None]: _description_
    """

    # completed = true,かつ、clearMovieUrlがnullのものを取得する
    bingoCards = (
        db()
        .collection(COLLECTION_PREFIX)
        .where(
            filter=FieldFilter("completed", "==", True),
        )
        .where(
            # カラムがないことを確認する
            filter=FieldFilter("clearMovieUrl", "==", None or ""),
        )
        .stream()
    )

    return [bingoCard.id for bingoCard in bingoCards]


def add_bingo_clear_movie(bingo_card_id: str, movie_url: str) -> None:
    """クリア動画のURLを追加する

    Args:
        bingo_card_id (str): _description_
        movie_url (str): _description_
    """
    bingo_card = db.fetch(collection=COLLECTION_PREFIX, id=bingo_card_id)
    bingo_card["clearMovieUrl"] = movie_url
    db().collection(COLLECTION_PREFIX).document(bingo_card_id).set(bingo_card)
