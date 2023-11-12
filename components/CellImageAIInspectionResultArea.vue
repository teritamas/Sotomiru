<template>
  <div
    class="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8"
  >
    <div class="flex items-center mb-5">
      <p
        v-if="scoreIsOver50"
        class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded"
      >
        {{ props.score }}
      </p>
      <p
        v-else
        class="bg-red-100 text-red-800 text-sm font-semibold inline-flex items-center p-1.5 rounded"
      >
        {{ props.score }}
      </p>
      <p class="ml-2 font-medium text-gray-900 dark:text-white">
        {{ checkResultMessage }}
      </p>
    </div>
    <p>理由: {{ props.reason }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  isFollowingSubject: {
    type: Boolean,
    required: false,
  },
});

const scoreIsOver50 = computed(() => {
  return props.score > 0.5;
});

const checkResultMessage = computed(() => {
  return props.score > 0.5
    ? "お題に近い可能性があります"
    : "お題から外れている可能性があります";
});
</script>
