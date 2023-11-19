from typing import Optional
from pydantic import BaseModel, Field


class User(BaseModel):
    uid: str = Field(..., description="ユーザーID")
    walletAddress: Optional[str] = Field(None, description="ウォレットアドレス")
