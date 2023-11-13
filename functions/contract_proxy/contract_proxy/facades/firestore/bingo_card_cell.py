from contract_proxy.facades.firestore import db
from contract_proxy.models.bingo_card import (
    BingoCardCell,
    BingoUserTokenMintDto,
)

COLLECTION_PREFIX = "bingoCard"


def fetch_bingo_cell(
    bingo_card_id: str, bingo_cell_id
) -> BingoUserTokenMintDto:
    """ビンゴカードに紐づくビンゴセルを取得する

    Args:
        bingo_card_id (str): _description_

    Returns:
        Union[list[BingoCardCell], None]: _description_
    """
    bingo_card = db.fetch(collection=COLLECTION_PREFIX, id=bingo_card_id)
    if bingo_card is None:
        print("bingo_card is not found")
        return None

    bingo_cells = [
        BingoCardCell(**cell) for cell in bingo_card.get("bingoCells")
    ]
    bingo_cell = [cell for cell in bingo_cells if cell.id == bingo_cell_id]

    if len(bingo_cell) == 0:
        print("bingo_cell is not found")
        return None
    target_bingo_cell = bingo_cell[0]
    user = db.fetch(collection="users", id=target_bingo_cell.answered_user)

    response = BingoUserTokenMintDto(
        answered_at=target_bingo_cell.answered_at,
        answered_user=target_bingo_cell.answered_user,
        bingo_cell_id=target_bingo_cell.id,
        image_ai_check_score=target_bingo_cell.imageAiCheckScore
        or 50,  # TODO: 画像AIチェックのスコアがない場合は50にする
        wallet_address=user["walletAddress"],
    )

    return response
