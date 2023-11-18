<template>
  <loading v-show="isLoading" :LoadingText="loadingMessage" />
  <!-- 中央揃え -->
  <ListViewSettingToggle
    :isPublicOnly="isPublicOnly"
    :currentUser="currentUser"
    @changeBingoListViewSetting="changeBingoListViewSetting"
  />

  <BingoCardCarousel
    @clearIsFollowingSubject="clearIsFollowingSubject"
    @postBingoCellRequest="postBingoCellRequest"
    @postCheckFollowingSubject="postCheckFollowingSubject"
    @getBingoCellDetail="getBingoCellDetail"
    @changeBingoViewSetting="changeBingoViewSetting"
    :bingoCards="bingoCardDetails"
    :isFollowingSubject="isFollowingSubject"
    :currentUserUid="currentUser?.uid"
    :selectedBingoCellDetail="bingoCellDetail"
  />
  <congratulations-complete
    v-if="congratulationsCompleteViewIsOpen"
    @closeCongratulationsCompleteView="closeCongratulationsCompleteView"
  />
  <congratulations-bingo
    v-if="congratulationsBingoViewIsOpen"
    @closeCongratulationsBingoView="closeCongratulationsBingoView"
  />
  <AppFooter :bingoCardDetails="bingoCardDetails" />
</template>

<script setup lang="ts">
import { BingoCardDetail, BingoCellDetail } from "@/server/models/bingo/dto";
import {
  BingoCardsGetAllResponse,
  BingoCellGetResponse,
  BingoCellPutResponse,
} from "@/server/models/bingo/response";
import { IsFollowingSubjectResponse } from "@/server/models/facades/visionai/imageDescription";
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const bingoCardDetails = ref([] as BingoCardDetail[]);
const isPublicOnly = ref(true);
const bingoCellDetail = ref(null as BingoCellDetail | null);
const isFollowingSubject = ref(null as IsFollowingSubjectResponse | null);
const congratulationsCompleteViewIsOpen = ref(false);
const congratulationsBingoViewIsOpen = ref(false);
const isLoading = ref(false);
const loadingMessage = ref("");

// 全てのビンゴカードを取得
watchEffect(async () => {
  loadingMessage.value = "ビンゴカードを読み込んでいます";
  isLoading.value = true;
  const token = await currentUser.value?.getIdToken();
  isPublicOnly.value = token !== null;
  await getAllBingoCard(isPublicOnly.value);
  isLoading.value = false;
});

const changeBingoListViewSetting = async (toggle: boolean) => {
  isPublicOnly.value = toggle;
  await getAllBingoCard(isPublicOnly.value);
};

// ビンゴカードの情報取得
const getAllBingoCard = async (isPublicOnly: boolean) => {
  const token = await currentUser.value?.getIdToken();
  const res = await fetch(`api/bingoCard?isPublicOnly=${isPublicOnly}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json()) as BingoCardsGetAllResponse;
  bingoCardDetails.value = data.bingoCardDetails;
};

// 投稿画像に対するチェック処理
const imageAiCheckScore = ref(0);
// アップロードした画像がテーマに沿っているかを確認する。
const postCheckFollowingSubject = async (
  bingoCardId: string,
  bingoCellId: string,
  file: any
) => {
  // 前の検証結果をクリア
  isFollowingSubject.value = null;
  // リクエストボディの作成
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId,
    } as CheckFollowingSubjectPostRequest)
  );
  const res = await fetch(
    `/api/bingoCardCell/checkFollowingSubject/${bingoCardId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  isFollowingSubject.value = await res.json();
  imageAiCheckScore.value = isFollowingSubject.value!.score ?? 0;
};
// チェック処理の結果をクリア
const clearIsFollowingSubject = async () => {
  isFollowingSubject.value = null;
};

// ビンゴセルに対する投稿処理
// ビンゴセルに画像を投稿する。投稿完了後、ビンゴカードの最新の状態を取得する。
const postBingoCellRequest = async (
  bingoCardId: string,
  bingoCellId: string,
  form: { comments: string },
  file: any
) => {
  const baseToken = isFollowingSubject.value?.score ?? 0;
  // 小数点切り捨て
  const expectedToken = Math.floor(baseToken * 10);
  loadingMessage.value = `ビンゴセルに画像を投稿中です...\n
  この投稿で${expectedToken}トークン付与されます！`;
  isLoading.value = true;
  const formData = new FormData();
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId,
      imageAiCheckScore: isFollowingSubject.value?.score ?? 0,
      imageAiCheckReason: isFollowingSubject.value?.reason ?? "なし",
      ...form,
    } as BingoCellPostRequest)
  );
  formData.append("file", file);
  const res = await fetch(`/api/bingoCardCell/${bingoCardId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
    },
    body: formData,
  });
  const data = (await res.json()) as BingoCellPutResponse;

  // 一度ローディング画面をクローズ
  isLoading.value = false;

  if (data.appearBingoCardComplete) {
    // ビンゴカードが完了したかどうか
    openCongratulationsCompleteView();
  } else if (data.appearBingoComplete) {
    // ビンゴしたかどうか
    openCongratulationsBingoView();
  }

  // 最新の状態を取得
  await getAllBingoCard(isPublicOnly.value);
  clearIsFollowingSubject(); // AIの検出結果のキャッシュをクリア
};

// ビンゴセルの詳細情報を取得する
const getBingoCellDetail = async (bingoCardId: string, bingoCellId: string) => {
  const res = await fetch(
    `/api/bingoCardCell/${bingoCardId}?bingoCellId=${bingoCellId}`,
    {
      headers: {},
    }
  );
  const data = (await res.json()) as BingoCellGetResponse;
  bingoCellDetail.value = data.bingoCellDetail;
};

// ビンゴカードの公開設定を変更する
const changeBingoViewSetting = async (
  bingoCardId: string,
  isPublic: boolean
) => {
  const res = await useFetch(`/api/bingoCard/${bingoCardId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
    },
    body: JSON.stringify({
      isPublic: isPublic,
    } as BongoPutRequest),
  });
};

// ビンゴカードをコンプリートしたときのお祝い画面をひらく
const openCongratulationsCompleteView = async () => {
  congratulationsCompleteViewIsOpen.value = true;
};

// ビンゴカードをコンプリートしたときのお祝い画面をとじる
const closeCongratulationsCompleteView = async () => {
  congratulationsCompleteViewIsOpen.value = false;
};

// ビンゴしたときのお祝い画面をひらく
const openCongratulationsBingoView = async () => {
  congratulationsBingoViewIsOpen.value = true;
};

// ビンゴしたときのお祝い画面をとじる
const closeCongratulationsBingoView = async () => {
  congratulationsBingoViewIsOpen.value = false;
};
</script>
