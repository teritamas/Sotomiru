from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contract_proxy.core.bingo_token.route import bingo_token_router
from contract_proxy.core.memory_nft.route import memory_nft_router
import uvicorn


def get_application() -> FastAPI:
    app = FastAPI(
        prefix="/api/v1",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(bingo_token_router)
    app.include_router(memory_nft_router)
    return app


app: FastAPI = get_application()

if __name__ == "__main__":
    uvicorn.run("__main__:app")
