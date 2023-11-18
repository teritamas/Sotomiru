<template>
  <footer
    class="text-gray-600 body-font fixed bottom-2 border border-gray-700 w-11/12"
  >
    <div class="bg-footer grid grid-cols-3">
      <router-link class="footer-item block text-gray-500" to="/login">
        <div class="p-1 py-2 grid justify-items-center">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
            />
          </svg>
          <small>画面を更新</small>
        </div>
      </router-link>
      <router-link class="footer-item block text-gray-500" to="/mypage">
        <div class="p-1 py-2 grid justify-items-center">
          <w3m-core-button themeVariables="--w3m-accent-color: #000" />
        </div>
      </router-link>
      <a class="footer-item block text-gray-500" @click="logout">
        <div class="p-1 py-2 grid justify-items-center">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          <small>ログアウト</small>
        </div>
      </a>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const emits = defineEmits(["logout"]);
const logout = () => {
  emits("logout", logout);
};
</script>

<style scoped>
footer {
  border-radius: 1rem;
  margin: 1rem;
  z-index: 10000;
}
.bg-footer {
  background: white;
  border-radius: 1rem;
  box-shadow: 10px;
}
.footer-item:hover {
  background: var(--c7);
  color: white;
  border-radius: 1rem;
  cursor: pointer;
}
path {
  fill: gray;
  stroke: transparent;
}

.footer-item:hover path {
  -webkit-animation: stroke 2s ease-in-out forwards;
  animation: stroke 2s ease-in-out forwards;
  stroke: white;
  stroke-dasharray: 1800;
  stroke-dashoffset: 0;
  stroke-width: 1;
}

@-webkit-keyframes stroke {
  0% {
    fill: #eee;
    stroke-dashoffset: 1800;
  }
  10% {
    fill: transparent;
  }
  80% {
    fill: transparent;
  }
  100% {
    fill: white;
    stroke-dashoffset: 0;
  }
}

@keyframes stroke {
  0% {
    fill: #eee;
    stroke-dashoffset: 1800;
  }
  10% {
    fill: transparent;
  }
  80% {
    fill: transparent;
  }
  100% {
    fill: white;
    stroke-dashoffset: 0;
  }
}
</style>
