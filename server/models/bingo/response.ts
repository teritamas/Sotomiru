import {
  BingoCardDetail,
  AppearBingoCompleteDto,
  BingoCellDetail,
} from "./dto";

export interface BingoCardsGetAllResponse {
  bingoCardDetails: BingoCardDetail[];
}

export interface BingoCellGetResponse {
  bingoCellDetail: BingoCellDetail;
}

export interface BingoCellPutResponse extends AppearBingoCompleteDto {}
