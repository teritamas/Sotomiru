import { AppearBingoCompleteDto } from "../bingoCard/dto";
import { BingoCellDetail } from "./dto";

export interface BingoCellGetResponse {
  bingoCellDetail: BingoCellDetail;
}

export interface BingoCellPutResponse extends AppearBingoCompleteDto {
  mintBingoTokenAmount: number; // 今の投稿で付与するトークンの数
}
