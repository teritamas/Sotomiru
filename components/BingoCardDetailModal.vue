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
          <h3 class="text-lg font-extrabold text-gray-00 pl-2">
            {{ selectedBingoCell.name }}
          </h3>
          <button
            @click="closeBingoCardDetailModal()"
            type="button"
            class="text-gray-700 border border-gray-300 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
            class="text-base border border-gray-300 font-bold rounded-lg leading-relaxed text-gray-700 border p-5 bg-white"
          >
            <span class="color tracking-widest mission">Mission</span><br />
            {{ selectedBingoCell.description }} を撮ってください
          </p>
          <!-- 投稿済みの時 -->
          <div v-if="registered">
            <div class="mt-8">
              <label class="block mb-2 text-sm font-medium text-gray-700"
                >投稿された画像</label
              >
              <img :src="selectedBingoCell.imageUrl!" alt="" />
            </div>
            <!-- AIの検出結果 -->
            <div class="mt-3">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-700"
                >投稿されたコメント</label
              >
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                :value="selectedBingoCell.comments!"
                disabled
              ></textarea>
            </div>

            <!-- AIの検出結果 -->
            <CellImageAIInspectionResultArea
              v-if="selectedBingoCell.imageAiCheckScore"
              :score="selectedBingoCell.imageAiCheckScore"
              :reason="selectedBingoCell.imageAiCheckReason"
            />

            <div class="mt-8">
              <div>
                <label
                  for="message"
                  class="mb-2 text-sm font-medium text-gray-700"
                  >投稿した人</label
                >
                <CreateUserBadge
                  :currentUserUid="currentUserUid"
                  :createdUid="answeredUserDetail?.uid"
                  :createdUserDetail="answeredUserDetail"
                />
              </div>
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
              <CellImageAIInspectionResultArea
                v-if="isFollowingSubject"
                :score="isFollowingSubject.score"
                :reason="isFollowingSubject.reason"
                :isFollowingSubject="isFollowingSubject.isFollowingSubject"
              />
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
          <button
            class="nav down text-sm"
            v-if="canMove('down', selectedBingoCardCellNo)"
            @click="move('down', selectedBingoCardCellNo)"
          >
            <svg viewBox="0 0 512 512" class="cell-arrow">
              <g>
                <polygon
                  points="256.008,275.876 173.562,193.446 132.928,234.081 256.008,357.161 379.072,234.081 338.438,193.446     "
                />
                <path
                  d="M256.008,0C114.606,0.007,0.015,114.605,0,255.992C0.015,397.394,114.606,511.984,256.008,512   C397.394,511.984,511.984,397.394,512,255.992C511.984,114.605,397.394,0.007,256.008,0z M408.585,408.585   c-39.11,39.087-92.93,63.197-152.577,63.205c-59.655-0.008-113.483-24.118-152.594-63.205   c-39.086-39.119-63.196-92.938-63.204-152.593c0.008-59.647,24.118-113.467,63.204-152.585   c39.111-39.079,92.939-63.19,152.594-63.197c59.647,0.007,113.467,24.118,152.577,63.197   c39.087,39.118,63.197,92.938,63.205,152.585C471.782,315.647,447.664,369.466,408.585,408.585z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <button
        class="nav right text-sm"
        v-if="canMove('right', selectedBingoCardCellNo)"
        @click="move('right', selectedBingoCardCellNo)"
      >
        <svg viewBox="0 0 512 512" class="cell-arrow">
          <g>
            <polygon
              points="193.447,173.562 275.877,256 193.447,338.438 234.081,379.08 357.161,256 234.081,132.928  "
            />
            <path
              d="M255.992,0C114.606,0.015,0.015,114.606,0,256c0.015,141.394,114.606,255.984,255.992,256   C397.394,511.984,511.985,397.394,512,256C511.985,114.606,397.394,0.015,255.992,0z M408.585,408.585   c-39.118,39.079-92.938,63.189-152.593,63.205c-59.647-0.016-113.467-24.126-152.577-63.205   C64.328,369.474,40.218,315.647,40.21,256c0.008-59.655,24.118-113.475,63.205-152.585c39.11-39.087,92.93-63.197,152.577-63.205   c59.655,0.008,113.476,24.118,152.593,63.205c39.087,39.11,63.197,92.93,63.205,152.585   C471.782,315.647,447.672,369.474,408.585,408.585z"
            />
          </g>
        </svg>
      </button>
      <button
        class="nav up text-sm"
        v-if="canMove('up', selectedBingoCardCellNo)"
        @click="move('up', selectedBingoCardCellNo)"
      >
        <svg viewBox="0 0 512 512" class="cell-arrow">
          <g>
            <polygon
              points="132.928,277.919 173.562,318.553 255.992,236.123 338.438,318.553 379.072,277.919 255.992,154.839     "
            />
            <path
              d="M255.992,0C114.606,0.015,0.015,114.606,0,256.008C0.015,397.394,114.606,511.984,255.992,512   C397.394,511.984,511.985,397.394,512,256.008C511.985,114.606,397.394,0.015,255.992,0z M408.585,408.585   c-39.118,39.079-92.938,63.189-152.593,63.205c-59.647-0.016-113.467-24.126-152.577-63.205   c-39.087-39.111-63.197-92.93-63.205-152.577c0.008-59.655,24.118-113.483,63.205-152.593   c39.11-39.087,92.93-63.197,152.577-63.205c59.655,0.008,113.476,24.118,152.593,63.205c39.079,39.11,63.197,92.938,63.205,152.593   C471.782,315.655,447.672,369.474,408.585,408.585z"
            />
          </g>
        </svg>
      </button>
      <button
        class="nav left text-sm"
        v-if="canMove('left', selectedBingoCardCellNo)"
        @click="move('left', selectedBingoCardCellNo)"
      >
        <svg viewBox="0 0 512 512" class="cell-arrow">
          <g>
            <polygon
              points="277.919,132.921 154.839,256 277.919,379.072 318.552,338.438 236.122,256 318.552,173.562  "
            />
            <path
              d="M256.008,0C114.605,0.016,0.016,114.606,0,256c0.015,141.394,114.605,255.984,256.008,256   C397.394,511.984,511.983,397.394,512,256C511.983,114.606,397.394,0.016,256.008,0z M408.585,408.585   c-39.11,39.079-92.93,63.189-152.577,63.205c-59.655-0.016-113.483-24.126-152.594-63.205C64.328,369.475,40.217,315.647,40.21,256   c0.007-59.654,24.118-113.474,63.204-152.585c39.111-39.086,92.939-63.197,152.594-63.205   c59.646,0.008,113.466,24.119,152.577,63.205c39.079,39.11,63.197,92.93,63.205,152.585   C471.782,315.647,447.664,369.475,408.585,408.585z"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCell } from "@/server/models/bingo/dto";
import { IsFollowingSubjectResponse } from "@/server/models/facades/visionai/imageDescription";

const props = defineProps({
  currentUserUid: {
    type: Object as PropType<String | undefined>,
    required: true,
  },
  selectedBingoCell: {
    type: Object as PropType<BingoCell>,
    required: true,
  },
  isFollowingSubject: {
    type: Object as PropType<IsFollowingSubjectResponse | null>,
    required: true,
  },
  selectedBingoCardCellNo: {
    type: Number,
    required: true,
  },
  answeredUserDetail: {
    type: Object as PropType<UserInfo | undefined>,
    required: true,
  },
});
const currentPosition = ref(props.selectedBingoCardCellNo); // 現在の位置、初期値はセンターのセル

const canMove = (direction, index) => {
  switch (direction) {
    case "up":
      return index - 3 >= 0;
    case "down":
      return index + 3 <= 8;
    case "left":
      return index % 3 !== 0;
    case "right":
      return index % 3 !== 2;
    default:
      return false;
  }
};

const move = (direction, index) => {
  let newIndex = index;

  switch (direction) {
    case "up":
      newIndex -= 3;
      break;
    case "down":
      newIndex += 3;
      break;
    case "left":
      if (index % 3 !== 0) {
        newIndex -= 1;
      }
      break;
    case "right":
      if (index % 3 !== 2) {
        newIndex += 1;
      }
      break;
  }
  emits("openNextBingoCardDetailModal", newIndex);
};

const emits = defineEmits([
  "closeBingoCardDetailModal",
  "postBingoCellRequest",
  "postCheckFollowingSubject",
  "openNextBingoCardDetailModal",
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

<style scoped>
.mission {
  font: 700 1rem var(--font);
  text-transform: uppercase;
}
.cell-arrow {
  width: 30px;
  height: 30px;
  opacity: 1;
  background-image: linear-gradient(to right, var(--c1), var(--c4));
  border-radius: 100%;
  fill: white;
}

.nav {
  position: absolute;
  border-radius: 10px;
  fill: white;
}

.nav:hover {
  color: var(--c5);
}

.up {
  top: -2%;
  left: 37%;
  padding: 0 35px;
}

.left {
  top: 37%;
  left: -3%;
  padding: 35px 0;
}

.right {
  top: 37%;
  right: -3%;
  padding: 35px 0;
}

.down {
  bottom: -2%;
  left: 37%;
  padding: 0 35px;
}
</style>
