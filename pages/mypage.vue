<template>
  <loading v-show="isLoading" LoadingText="獲得したNFT一覧を取得しています" />
  <MyProfile
    v-if="currentUser"
    :avatarImageUrl="currentUser.photoURL"
    :displayName="currentUser.displayName"
    :userInfo="userInfo"
    :walletAccount="walletAccount"
    :bingoToken="bingoToken"
  />
  <!-- NFTギャラリー -->
  <NftGalley :nfts="ownNfts" />
  <!-- 画面の更新ボタン -->
  <AppControlArea v-if="currentUser" @logout="logout" />
</template>

<script lang="ts" setup>
import { signOut, getAuth } from "firebase/auth";
import { useCurrentUser } from "vuefire";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import { configureChains, createConfig } from "@wagmi/core";
import { goerli } from "@wagmi/chains";
import { getAccount, GetAccountResult, PublicClient } from "@wagmi/core";
import { NFT } from "@thirdweb-dev/sdk/dist/declarations/src/core/schema/nft";

const currentUser = useCurrentUser();
const router = useRouter();
const isLoading = ref(false);

// WalletConnectのプロジェクトIDが取得できていることを確認する
const runtimeConfig = useRuntimeConfig();
const projectId = runtimeConfig.public.walletConnectProjectId;
if (!projectId || projectId === "") {
  // WalletConnectのプロジェクトIDが設定されていない場合はエラーを投げる
  throw new Error("walletConnectProjectId is not defined");
}
const bingoTokenId = runtimeConfig.public.bingoTokenId;
const chains = [goerli];

// ログインしていない場合はログイン画面にリダイレクト
onBeforeMount(async () => {
  if (!currentUser.value) {
    router.push(`/login`);
  } else {
    await getUser();
    updateUser(); // バックグラウンドで実行するため、awaitしない
  }
});

// ユーザ情報をDBから取得
const userInfo = ref(Object as unknown as UserInfo);
const getUser = async () => {
  const res = await fetch("/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
    },
  });
  const data = await res.json();
  userInfo.value = data;
};

// ユーザ情報を更新
const updateUser = async () => {
  const res = await fetch("/api/user", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
      ContentType: "application/json",
    },
    body: JSON.stringify({
      displayName: currentUser.value?.displayName,
      photoURL: currentUser.value?.photoURL,
    } as UserPutRequest),
  });
};

// サインアウトボタン
const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  router.push(`/`);
};

/**
 * Web3Modalの初期化する
 */
const initWeb3Client = async () => {
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  const web3modal = new Web3Modal({ projectId }, ethereumClient);
};
onMounted(() => {
  initWeb3Client();
});

const walletAccount = ref(Object as unknown as GetAccountResult<PublicClient>);
onMounted(async () => {
  walletAccount.value = getAccount();
});

// NFTの一覧取得
const ownNfts = ref<NFT[]>([]);
const bingoToken = ref<NFT>();
const { $contract } = useNuxtApp();
watchEffect(async () => {
  // ウォレットアドレスが取得できていない場合は何もしない
  if (walletAccount.value.address) {
    // useテーブルにウォレットアドレスを登録
    registerWallet(walletAccount.value.address); // 非同期で実行するのでawaitしない

    isLoading.value = true;
    const nfts = await $contract.erc1155.getOwned(walletAccount.value.address);
    // 新しいものから先にする
    ownNfts.value = nfts.reverse();
    // bingoTokenIdの指定したものだけ省く
    ownNfts.value = ownNfts.value.filter(
      (nft) => nft.metadata.name !== bingoTokenId
    );
    bingoToken.value = ownNfts.value.find(
      (nft) => nft.metadata.id === bingoTokenId
    );
    isLoading.value = false;
  }
});

// useテーブルにウォレットを登録
const registerWallet = async (walletAddress: string) => {
  await fetch("/api/user/wallet", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
      ContentType: "application/json",
    },
    body: JSON.stringify({
      walletAddress: walletAddress,
    } as UserWalletPutRequest),
  });
};
</script>
