<template>
  <div class="flex justify-center">
    <div class="pt-2">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          :value="props.isPublicOnly"
          :checked="props.isPublicOnly"
          @input="updateInput($event)"
          class="sr-only peer"
        />
        <div
          class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span
          class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ bingoCardPublicMessage }}</span
        >
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "firebase/auth";

const props = defineProps({
  isPublicOnly: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["changeBingoListViewSetting"]);

/**
 * ビンゴカードの公開設定
 */
const bingoCardPublicMessage = computed(() => {
  return props.isPublicOnly
    ? "公開中のビンゴカードのみ表示中"
    : "自分のビンゴカードのみ表示中";
});

const updateInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;
  emits("changeBingoListViewSetting", value);
};
</script>
