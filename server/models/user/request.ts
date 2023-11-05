interface UserWalletPutDto extends UserWalletPutRequest {}

interface UserWalletPutRequest {
  walletAddress: string;
}

interface UserPutRequest {
  displayName: string;
  photoURL: string;
}
