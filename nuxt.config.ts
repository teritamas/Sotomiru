// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ["~/plugins/thirdweb.client.ts"],
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "nuxt-vuefire"],
  nitro: {
    preset: "firebase",
    firebase: {
      gen: 2,
    },
  },
  runtimeConfig: {
    public: {
      walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID || "",
      thirdWebClientId: process.env.THIRD_WEB_CLIENT_ID || "",
      erc1155ContractAddress: process.env.ERC1155_CONTRACT_ADDRESS || "",
    },
  },
  vuefire: {
    auth: true, // enable Firebase Authentication
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
});
