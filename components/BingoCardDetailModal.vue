<template>
  <loading v-show="isCheckProcessing" LoadingText="AIが画像を確認しています" />
  <!-- Extra Large Modal -->
  <div
    class="bingo-card-frame fixed top-0 left-0 right-0 z-50 w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]"
  >
    <div class="relative w-full max-w-7xl max-h-full">
      <!-- Modal content -->
      <div class="relative border bg-white rounded-lg border-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-5 rounded-t">
          <h3 class="text-md font-extrabold text-gray-700 pl-1">Mission</h3>
          <button
            @click="closeBingoCardDetailModal()"
            type="button"
            class="text-gray-700 border border-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-6">
          <p
            class="text-base border border-gray-700 font-bold rounded-lg leading-relaxed text-gray-700 border p-5 bg-white"
          >
            {{ selectedBingoCell.description }}
          </p>
          <!-- 投稿済みの時 -->
          <div v-if="registered">
            <div class="mt-8">
              <label class="block mb-2 text-sm font-medium text-gray-700"
                >あなたが投稿した画像</label
              >
              <img :src="selectedBingoCell.imageUrl!" alt="" />
            </div>
            <div class="mt-3">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-700"
                >あなたが投稿したコメント</label
              >
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                :value="selectedBingoCell.comments!"
                disabled
              ></textarea>
            </div>
          </div>
          <!-- 投稿済みでない場合 -->
          <div v-else>
            <div class="mt-8">
              <label
                class="block mb-2 text-sm font-medium text-gray-700"
                for="file_input"
                >写真をアップロード</label
              >
              <input
                class="white w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="file_input"
                type="file"
                @change="onFileChange"
              />
              <!-- アップロードした写真を表示 -->
              <div v-if="fileUrl" class="border border-gray-200 my-2 shadow-md">
                <img :src="fileUrl" alt="アップロードした写真" />
              </div>
              <div
                v-if="isFollowingSubject"
                class="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8"
              >
                <div class="flex items-center mb-5">
                  <p
                    v-if="checkResultMessage == 'NG'"
                    class="bg-red-100 text-red-800 text-sm font-semibold inline-flex items-center p-1.5 rounded"
                  >
                    {{ isFollowingSubject.score }}
                  </p>
                  <p
                    v-if="checkResultMessage != 'NG'"
                    class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded"
                  >
                    {{ isFollowingSubject.score }}
                  </p>
                  <p class="ml-2 font-medium text-gray-900 dark:text-white">
                    {{ checkResultMessage }}
                  </p>
                </div>
                <p>理由: {{ isFollowingSubject.reason }}</p>
              </div>
            </div>
            <div class="mt-3">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-700"
                >コメントを残す</label
              >
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="コメント"
                v-model="form.comments"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex justify-between p-6 space-x-2 rounded-b">
          <button
            @click="closeBingoCardDetailModal()"
            data-modal-hide="extralarge-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            戻る
          </button>
          <button
            v-if="!registered"
            @click="postBingoCellRequest"
            type="button"
            :class="buttonClass"
            :disabled="!isRegisterButtonActive"
          >
            保存する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCell } from "@/server/models/bingo/dto";
import { IsFollowingSubjectResponse } from "@/server/models/facades/visionai/imageDescription";

const props = defineProps({
  selectedBingoCell: {
    type: Object as PropType<BingoCell>,
    required: true,
  },
  isFollowingSubject: {
    type: Object as PropType<IsFollowingSubjectResponse | null>,
    required: true,
  },
});

const emits = defineEmits([
  "closeBingoCardDetailModal",
  "postBingoCellRequest",
  "postCheckFollowingSubject",
]);

/**
 * モーダルの状態に関する定義
 */
// モーダルクローズのイベント発火
const closeBingoCardDetailModal = async () => {
  await emits("closeBingoCardDetailModal");
};
// モーダルのセルが投稿済みの場合: True
const registered = computed(() => {
  return props.selectedBingoCell.completed;
});
// モーダルが投稿可能な状態の場合: True
const isRegisterButtonActive = computed(() => {
  return (
    !registered.value && // このセルが登録済みでない
    form.value.comments !== "" && // コメントが入力されている
    selectedFile.value !== null // 画像が選択されている
    // props.isFollowingSubject?.isFollowingSubject // 画像がテーマに沿っている、検証中のためコメントアウト
  );
});
// ボタンの表示を切り替えるためのクラス
const buttonClass = computed(() => {
  return `text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
    isRegisterButtonActive.value
      ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      : "bg-gray-400 cursor-not-allowed"
  }`;
});

/*
 * 画像がアップロードされたときの処理
 */
//ファイルが変更された時、ファイルの検査処理のイベント発火
let selectedFile = ref(null);
let fileUrl = ref("");
const onFileChange = async (e: any) => {
  selectedFile.value = e.target.files[0];
  fileUrl.value = URL.createObjectURL(e.target.files[0]);
  await emits("postCheckFollowingSubject", selectedFile.value);
};
// 検証プロセスが実行中の場合: True
const isCheckProcessing = computed(() => {
  return selectedFile.value !== null && props.isFollowingSubject === null;
});
// 検証結果のBooleanを文字列に変換
const checkResultMessage = computed(() => {
  return props.isFollowingSubject?.isFollowingSubject ? "OK" : "NG";
});

/*
 * 画像を投稿する処理
 */
// 投稿する
const form = ref({
  comments: "",
});
// 投稿ボタンが押されたときのイベント発火
const postBingoCellRequest = async () => {
  if (!isRegisterButtonActive.value) {
    // 投稿ボタンが押されたが、投稿できない場合は何もしない
    return;
  }
  await emits("postBingoCellRequest", form.value, selectedFile.value);
};
</script>
