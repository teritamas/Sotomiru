import { inject } from "vue";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { set } from "firebase/database";

export default defineNuxtPlugin(async (NuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const sdk = new ThirdwebSDK("goerli", {
    clientId: runtimeConfig.public.thirdwebClientId,
  });
  // WalletAddressが指定されている時はNFTの一覧を取得する
  const contract = await sdk.getContract(
    runtimeConfig.public.erc1155ContractAddress
  );

  return {
    provide: {
      thirdweb: sdk,
      contract: contract,
    },
  };
});
