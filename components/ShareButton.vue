<template>
  <div v-if="isSupported">
    <input v-model="options.text" type="text" placeholder="Note" />
    <button :disabled="!isSupported" @click="startShare">
      {{ isSupported ? "Share" : "Web share is not supported in your browser" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useShare } from "@vueuse/core";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const options = ref({
  title: props.title,
  text: props.text,
  url: props.url,
});

const { share, isSupported } = useShare(options.value);

function startShare() {
  return share().catch((err) => err);
}
</script>
