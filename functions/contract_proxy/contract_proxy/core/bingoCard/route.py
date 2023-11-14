from contract_proxy.core.bingoCard.request import BingoUserTokenMintRequest
from contract_proxy.core.bingoCard.response import BingoUserTokenMintResponse
from contract_proxy.facades.thirdweb.erc1155_bingo_token_contract import (
    transfer_nft,
)
from fastapi import APIRouter


bingo_token_router = APIRouter(
    prefix="/mint-bingo-token", tags=["mint_bingo_token"]
)


@bingo_token_router.put(
    "/{wallet_address}",
)
async def mint_bingo_token(
    wallet_address: str,
    request: BingoUserTokenMintRequest,
):
    transfer_nft(wallet_address, request.supply)
    return BingoUserTokenMintResponse(supply=request.supply)
