<template>
  <div>
    <div
      class="block border border-gray-300 p-5 m-3 md:max-w-[600px] md:m-auto md:mt-6 pb-10 bg-white"
    >
      <!-- 中央揃え -->
      <h1
        class="color text-center tracking-wider mb-5 mt-5 font-normal text-xl text-gray-700"
      >
        ログインしてください
      </h1>
      <span v-if="currentUser"> Welcome {{ currentUser.displayName }}</span>
      <span v-else> <div id="firebase-ui-auth-container"></div></span>
      <small class="px-6 block m-auto w-2/3">
        ログインをするとトークンがたまったり、思い出の動画のNFTをGETできたりします！
      </small>
      <img src="@/assets/img/present.png" class="w-1/2 m-auto" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const router = useRouter();
const ui =
  firebaseui.auth.AuthUI.getInstance() ||
  new firebaseui.auth.AuthUI(useFirebaseAuth());

const config = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  signInFlow: "popup",
  signInSuccessUrl: "/",
  callbacks: {
    signInSuccessWithAuthResult() {
      // ログイン後マイページに遷移
      //ページ遷移しないでそのままリロードする
      //router.push(`/mypage`);
    },
  },
};

onMounted(() => {
  if (!currentUser.value) {
    ui.start("#firebase-ui-auth-container", config as any);
  } else {
    //ページ遷移しないでそのままリロードする
    //router.push(`/mypage`);
  }
});

// リロード時ログインしていたらマイページに遷移
onUpdated(() => {
  if (currentUser.value) {
    //ページ遷移しないでそのままリロードする
    //router.push(`/mypage`);
  }
});
</script>
