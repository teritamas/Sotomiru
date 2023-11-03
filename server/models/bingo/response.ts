import { BingoCardDetail, AppearBingoCompleteDto } from "./dto";

export interface BingoCardsGetAllResponse {
  bingoCardDetails: BingoCardDetail[];
}

export interface BingoCellPutResponse extends AppearBingoCompleteDto {}
