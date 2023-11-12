<template>
  <div v-for="nft in nfts">
    <div>
      <p>タイトル: {{ nft.metadata.name }}</p>
      <p>概要: {{ nft.metadata.description ?? "なし" }}</p>
      <p>NFTの規格: {{ nft.metadata.type }}</p>
      <p>保持数: {{ nft.metadata.supply }}</p>
    </div>
    <!-- ここを有効化すると動画がダウンロードされてしまうため、一旦コメントアウト -->
    <!-- <iframe :src="nft.metadata.animation_url!" frameborder="0"></iframe> -->
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
</script>
