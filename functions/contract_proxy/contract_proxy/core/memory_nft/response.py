from typing import List
from pydantic import BaseModel, Field


class MemoryNftsMintResponse(BaseModel):
    memoryTokenIds: List[str] = Field([], description="NFTのIDリスト")
