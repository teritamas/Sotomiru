<template>
  <MyProfile
    v-if="currentUser"
    :avatarImageUrl="currentUser.photoURL"
    :displayName="currentUser.displayName"
    :userInfo="userInfo"
    :walletAccount="walletAccount"
  />

  <div class="flex flex-col justify-center text-center mt-5">
    <!-- ウォレットと接続するボタン -->
    <div>
      <div class="mb-3">
        <h2
          class="text-center tracking-wider mb-3 font-normal text-xm text-gray-700"
        >
          ウォレット
        </h2>
        <w3m-core-button themeVariables="--w3m-accent-color: #000" />
      </div>
      <!-- <div class="">
        <w3m-network-switch themeVariables="--w3m-accent-color: #000" />
      </div> -->
    </div>
  </div>

  <div class="flex flex-col justify-center text-center mt-5">
    <h2
      class="text-center tracking-wider mb-3 font-normal text-xm text-gray-700"
    >
      その他の操作
    </h2>
    <!-- 画面の更新ボタン -->
    <div v-if="currentUser">
      <button
        type="button"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
        @click="router.push(`/login`)"
      >
        画面を更新する
      </button>

      <!-- ログアウトボタン -->
      <button
        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        @click="logout"
      >
        ログアウトする
      </button>
    </div>
  </div>
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

const currentUser = useCurrentUser();
const router = useRouter();

// ログインしていない場合はログイン画面にリダイレクト
onBeforeMount(async () => {
  if (!currentUser.value) {
    console.log("Not logged in");
    router.push(`/login`);
  } else {
    await getUser();
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

// サインアウトボタン
const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  router.push(`/`);
};

// WalletConnectのプロジェクトIDが取得できていることを確認する
const runtimeConfig = useRuntimeConfig();
const projectId = runtimeConfig.public.walletConnectProjectId;
if (!projectId || projectId === "") {
  // WalletConnectのプロジェクトIDが設定されていない場合はエラーを投げる
  throw new Error("walletConnectProjectId is not defined");
}
const chains = [goerli];

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

onUpdated(async () => {
  if (walletAccount.value.isConnected) {
    // useテーブルにウォレットアドレスを登録
    await registerWallet();
  }
});
// useテーブルにウォレットを登録
const registerWallet = async () => {
  await fetch("/api/user/wallet", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
      ContentType: "application/json",
    },
    body: JSON.stringify({
      walletAddress: walletAccount.value.address?.toString(),
    } as UserWalletPutRequest),
  });
};
</script>
