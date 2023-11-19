from pydantic import BaseModel, Field


class BingoUserTokenMintResponse(BaseModel):
    supply: int = Field(None, description="供給量")
