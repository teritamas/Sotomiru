<template>
  <footer
    class="text-gray-600 body-font fixed bottom-2 border border-gray-700 w-11/12"
  >
    <div class="bg-footer grid grid-cols-3">
      <router-link class="footer-item block text-gray-500" to="/">
        <div class="p-1 py-2 grid justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
      <router-link class="footer-item block text-gray-500" to="/mypage">
        <div class="p-1 py-2 grid justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clip-rule="evenodd"
            />
          </svg>
          <small>マイページ</small>
        </div>
      </router-link>
      <router-link class="footer-item block text-gray-500" to="/create">
        <div class="p-1 py-2 grid justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
          <small>ビンゴ作成</small>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-Footer",
};
</script>

<style scoped>
footer {
  border-radius: 1rem;
  margin: 1rem;
  z-index: 10000;
}
.router-link-active {
  background: #859395;
  color: white;
  border-radius: 1rem;
}

.router-link-active path {
  fill: white;
}
.bg-footer {
  background: white;
  border-radius: 1rem;
  box-shadow: 10px;
}
.footer-item:hover {
  background: #878c8d;
  color: white;
  border-radius: 1rem;
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
