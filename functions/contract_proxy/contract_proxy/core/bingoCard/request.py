from pydantic import BaseModel, Field


class BingoUserTokenMintRequest(BaseModel):
    supply: int = Field(None, description="画像AIチェックのスコア")
    wallet_address: str = Field(..., description="ウォレットアドレス")
