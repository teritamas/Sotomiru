from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class BingoCardCell(BaseModel):
    answered_at: Optional[datetime] = Field(None, description="回答日時")
    answered_user: Optional[str] = Field(None, description="回答者のID")
    id: str = Field(..., description="ID")
    comments: str = Field("", description="コメント")
    completed: bool = Field(..., description="回答済みかどうか")
    created_at: datetime = Field(..., description="作成日時")
    # created_user: str = Field(..., description="作成者のID")
    description: str = Field(..., description="説明")
    imageUrl: Optional[str] = Field(None, description="画像のURL")
    name: str = Field(..., description="名前")
    imageAiCheckScore: int = Field(None, description="画像AIチェックのスコア")


class BingoUserTokenMintDto(BaseModel):
    answered_at: Optional[datetime] = Field(None, description="回答日時")
    answered_user: Optional[str] = Field(None, description="回答者のID")
    bingo_cell_id: str = Field(..., description="ビンゴセルのID")
    image_ai_check_score: int = Field(None, description="画像AIチェックのスコア")
    wallet_address: str = Field(..., description="ウォレットアドレス")
