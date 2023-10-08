<template>
  <!-- Extra Large Modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-7xl max-h-full">
      <!-- Modal content -->
      <div
        class="relative bg-gradient-to-b from-cyan-400 to-blue-500 rounded-lg shadow dark:bg-gray-700"
      >
        <!-- Modal header -->
        <div class="flex items-center justify-between p-5 rounded-t">
          <h3 class="text-5xl font-extrabold text-white">Mission</h3>
          <button
            @click="closeBingoCardDetailModal()"
            type="button"
            class="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
            class="text-base font-bold rounded-lg leading-relaxed text-gray-700 border p-5 bg-white"
          >
            {{ targetBingoCell.name }}
          </p>
          <p class="text-base leading-relaxed text-white font-bold">
            {{ targetBingoCell.description }}
          </p>
          <div class="mt-8">
            <label
              class="block mb-2 text-sm font-medium text-white"
              for="file_input"
              >写真をアップロード</label
            >
            <input
              class="white w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              id="file_input"
              type="file"
              @change="onFileChange"
            />
          </div>
          <div class="mt-3">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-white"
              >コメントを残す</label
            >
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="コメント"
              v-model="form.comments"
            ></textarea>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 rounded-b">
          <button
            @click="postBingoCellRequest()"
            data-modal-hide="extralarge-modal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            保存する
          </button>
          <button
            @click="closeBingoCardDetailModal()"
            data-modal-hide="extralarge-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCell } from "@/server/models/bingo/dto";

const props = defineProps({
  bingoCells: {
    type: Array as PropType<BingoCell[]>,
    required: true,
  },
  bingoCellId: {
    type: String,
    required: true,
  },
});

const targetBingoCell = computed(() => {
  return props.bingoCells.filter((value) => value.id === props.bingoCellId)[0];
});

const emits = defineEmits([
  "closeBingoCardDetailModal",
  "postBingoCellRequest",
]);

// モーダルをクローズする
const closeBingoCardDetailModal = async () => {
  await emits("closeBingoCardDetailModal");
};

// 投稿する
const form = ref({
  comments: "",
});
let selectedFile = ref(null);
const onFileChange = (e: any) => {
  selectedFile.value = e.target.files[0];
};
const postBingoCellRequest = async () => {
  await emits("postBingoCellRequest", form.value, selectedFile.value);
};
</script>
