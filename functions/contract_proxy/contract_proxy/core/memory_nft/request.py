from typing import List
from pydantic import BaseModel, Field


class MemoryNftsMintRequest(BaseModel):
    memoryTokenIds: List[str] = Field([], description="NFTのIDリスト")
