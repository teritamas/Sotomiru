<template>
  <header class="bg-white text-gray-600 body-font fixed top w-full">
    <div class="bg-footer grid grid-cols-4 md:grid-cols-9">
      <router-link class="footer-item block text-gray-500" to="/">
        <div class="p-1 py-2 grid justify-items-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <small>TOP</small>
        </div>
      </router-link>
      <div
        class="col-span-2 md:col-span-7 text-center grid items-center color system-title"
      >
        SOTOMIRU
      </div>
      <router-link class="footer-item block text-gray-500" to="/mypage">
        <div class="p-1 py-2 grid justify-items-center">
          <svg v-if="!currentUser" fill="currentColor" class="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clip-rule="evenodd"
            />
          </svg>
          <img
            v-if="currentUser"
            :src="currentUser.photoURL"
            alt="you"
            class="rounded-full w-10"
          />
          <small v-if="!currentUser">マイページ</small>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useCurrentUser } from "vuefire";
const currentUser = useCurrentUser();
</script>

<style scoped>
header {
  z-index: 10;
}
.system-title {
  font: 700 1rem var(--font);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.router-link-active {
  border-bottom: 2px solid var(--c5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, var(--c5), var(--c6));
  border-bottom: 3px solid linear-gradient(to right, var(--c1), var(--c4));
  fill: var(--c5);
}

.footer-item:hover {
  border-bottom: #878c8d 1px solid;
}
path {
  fill: gray;
  stroke: transparent;
}

.router-link-active path {
  fill: #b6b2ef;
}
.footer-item:hover path {
  -webkit-animation: stroke 2s ease-in-out forwards;
  animation: stroke 2s ease-in-out forwards;
  stroke: gray;
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
