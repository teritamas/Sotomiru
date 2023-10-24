<template>
  <MyProfile />
  <!-- サインアウトボタン -->
  <div class="flex justify-center">
    <button
      v-if="currentUser"
      class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
      @click="logout"
    >
      Sign Out
    </button>
  </div>
</template>

<script lang="ts" setup>
import { signOut, getAuth } from "firebase/auth";
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const router = useRouter();

onMounted(() => {
  if (!currentUser.value) {
    console.log("Not logged in");
    router.push(`/login`);
  }
});

// サインアウトボタン
const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  router.push(`/`);
};
</script>
