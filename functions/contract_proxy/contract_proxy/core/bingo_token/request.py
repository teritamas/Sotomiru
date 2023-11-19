from pydantic import BaseModel, Field


class BingoUserTokenMintRequest(BaseModel):
    supply: int = Field(None, description="供給量")
