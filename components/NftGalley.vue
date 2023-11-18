<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2"
    style="margin: 0rem 3rem"
  >
    <h1 class="m-2 mt-8 text-xl mx-auto col-span-1 md:col-span-2 lg:col-span-5">
      獲得したNFTリスト
    </h1>
    <div v-for="(nft, index) in nfts" class="galley-video">
      <video
        @playing="onVideoPlaying(index)"
        @pause="onVideoPaused()"
        :src="nft.metadata.animation_url!"
        :class="!videoPlaying[index] ? 'color' : ''"
        controls
      ></video>
      <p v-show="!videoPlaying[index]">
        {{ nft.metadata.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NFT } from "@thirdweb-dev/sdk/dist/declarations/src/core/schema/nft";
const props = defineProps({
  nfts: {
    type: Array as PropType<NFT[]>,
    required: true,
  },
});

const videoPlaying = ref(Array(props.nfts.length).fill(false));

const onVideoPlaying = (index) => {
  videoPlaying.value = videoPlaying.value.map((value, i) => i === index);
};

const onVideoPaused = () => {
  videoPlaying.value = Array(props.nfts.length).fill(false);
};
</script>

<style>
.galley-video {
  position: relative;
  display: inline;
  margin: 0 auto;
}

.galley-video video {
  border-radius: 10px;
}

.galley-video .color {
  background: white;
  filter: opacity(0.5);
}

.galley-video p {
  font-family: "Kiwi Maru", serif;
  font-size: 1.25rem;
  padding: 16px;
  position: absolute;
  top: 0%;
  left: 0%;
  max-height: 70%;
  border-radius: 10px;
  color: black;
  font-weight: bold;
}
</style>
