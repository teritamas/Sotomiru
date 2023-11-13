from contract_proxy.facades.firestore.bingo_card_cell import fetch_bingo_cell
from contract_proxy.facades.thirdweb.erc1155_bingo_token_contract import (
    transfer_nft,
)
from fastapi import APIRouter


bingo_token_router = APIRouter(
    prefix="/mint-bingo-token", tags=["mint_bingo_token"]
)


@bingo_token_router.put(
    "/{bingo_card_id}/cell/{bingo_cell_id}",
)
async def mint_bingo_token(
    bingo_card_id: str,
    bingo_cell_id: str,
):
    cell = fetch_bingo_cell(bingo_card_id, bingo_cell_id)
    if cell is None:
        print("cell is not found")
        return
    supply = int(cell.image_ai_check_score * 100)
    transfer_nft(cell.wallet_address, supply)
