<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2"
    style="margin: 0rem 3rem; margin-bottom: 7rem"
  >
    <h1 class="m-2 mt-8 text-xl mx-auto col-span-1 md:col-span-2 lg:col-span-5">
      獲得したNFTリスト
    </h1>
    <div
      v-if="hasPreGrantBingoToken"
      class="col-span-1 md:col-span-2 lg:col-span-5 m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl"
    >
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="@/assets/img/coin.png"
        alt="思い出NFTの画像"
        style="max-height: 223px"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="color font-kiwi mb-2 text-lg text-center font-bold tracking-tight text-gray-900 dark:text-white"
        >
          トークンを獲得しました！
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ウォレットを連携して、トークンを獲得しましょう！
        </p>
        <w3m-core-button themeVariables="--w3m-accent-color: #000" />
      </div>
    </div>
    <div
      v-if="hasPreGrantMemoryNfts"
      class="col-span-1 md:col-span-2 lg:col-span-5 m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl"
    >
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="@/assets/img/present2.png"
        alt="思い出NFTの画像"
        style="max-height: 223px"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="color font-kiwi mb-2 text-lg text-center font-bold tracking-tight text-gray-900 dark:text-white"
        >
          思い出NFTを獲得しました！
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ウォレットを連携して、思い出NFTを確認しましょう！
        </p>
        <w3m-core-button themeVariables="--w3m-accent-color: #000" />
      </div>
    </div>

    <img
      v-show="nfts.length === 0"
      src="@/assets/img/noItem.png"
      alt=""
      class="col-span-1 md:col-span-2 lg:col-span-5 m-auto"
      style="max-height: 350px"
    />
    <div v-for="(nft, index) in nfts" class="galley-video">
      <video
        @playing="onVideoPlaying(index)"
        @pause="onVideoPaused()"
        :src="nft.metadata.animation_url!"
        poster="@/assets/img/video-loading.jpg"
        controls
      ></video>
      <p v-show="!videoPlaying[index]">
        <span :class="!videoPlaying[index] ? 'galley-video-bg' : ''">
          {{ nft.metadata.name }}
        </span>
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
  displayName: {
    type: String as PropType<string | null>,
    required: true,
  },
  userInfo: {
    type: Object as PropType<UserInfo | null>,
    required: true,
  },
});

const videoPlaying = ref([]);

/**
 * BingoCardsが更新された時、currentNumを更新する
 */
watchEffect(() => {
  if (videoPlaying.value.length === 0) {
    videoPlaying.value = Array(props.nfts.length).fill(false);
  }
});

const onVideoPlaying = (index) => {
  videoPlaying.value = videoPlaying.value.map((value, i) => i === index);
};

const onVideoPaused = () => {
  videoPlaying.value = Array(props.nfts.length).fill(false);
};

// ウォレットと接続していない時に、換金していないビンゴトークンを持っているか
const hasPreGrantMemoryNfts = computed(() => {
  return (
    props.userInfo?.preGrantMemoryNftTokenIds &&
    props.userInfo?.preGrantMemoryNftTokenIds.length > 0
  );
});
// ウォレットと接続していない時に、換金していないビンゴトークンの量
// ウォレットと接続していない時に、換金していないビンゴトークンを持っているか
const hasPreGrantBingoToken = computed(() => {
  return (
    props.userInfo?.preGrantBingoToken && props.userInfo?.preGrantBingoToken > 0
  );
});
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

.galley-video .galley-video-bg {
  background: white;
  filter: opacity(0.8);
  padding: 0 0.5rem;
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
  galley-video-bg: black;
  font-weight: bold;
}
</style>
