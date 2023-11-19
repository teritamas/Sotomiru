from contract_proxy.core.memory_nft.request import MemoryNftsMintRequest
from contract_proxy.core.memory_nft.response import MemoryNftsMintResponse
from contract_proxy.facades.thirdweb.erc1155_memory_nft_contract import (
    add_owner_nfts,
)
from fastapi import APIRouter


memory_nft_router = APIRouter(
    prefix="/mint-memory-nfts", tags=["mint_memory_nfts"]
)


@memory_nft_router.put(
    "/{wallet_address}",
)
async def mint_memory_nfts(
    wallet_address: str,
    request: MemoryNftsMintRequest,
):
    add_owner_nfts(wallet_address, request.memoryTokenIds)
    return MemoryNftsMintResponse(memoryTokenIds=request.memoryTokenIds)
