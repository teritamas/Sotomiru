from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class BingoCardCell(BaseModel):
    id: str = Field(..., description="ID")
    completed: bool = Field(..., description="回答済みかどうか")
    created_at: datetime = Field(..., description="作成日時")
    # created_user: str = Field(..., description="作成者のID")
    description: str = Field(..., description="説明")
    name: str = Field(..., description="名前")

    # 投稿後に追加される項目
    comments: Optional[str] = Field("", description="コメント")
    imageUrl: Optional[str] = Field(None, description="画像のURL")
    imageAiCheckScore: Optional[float] = Field(
        None, description="画像AIチェックのスコア"
    )
    answered_at: Optional[datetime] = Field(None, description="回答日時")
    answered_user: Optional[str] = Field(None, description="回答者のID")
