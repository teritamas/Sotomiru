<template>
  <div>
    <!-- 中央揃え -->
    <h2 class="flex justify-center">ログイン</h2>
    <span v-if="currentUser"> Welcome {{ currentUser.displayName }}</span>
    <span v-else> <div id="firebase-ui-auth-container"></div></span>
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
      router.push(`/mypage`);
    },
  },
};

onMounted(() => {
  if (!currentUser.value) {
    ui.start("#firebase-ui-auth-container", config as any);
  } else {
    router.push(`/mypage`);
  }
});

// リロード時ログインしていたらマイページに遷移
onUpdated(() => {
  if (currentUser.value) {
    router.push(`/mypage`);
  }
});
</script>
