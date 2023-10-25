import { getAuth } from "firebase-admin/auth";

export const idAuthentication = async (token: string | undefined) => {
  if (!token) throw new Error("token is not found");

  let uid: string = "";
  await getAuth()
    .verifyIdToken(token.replace("Bearer ", ""))
    .then((decodedToken) => {
      uid = decodedToken.uid;
    })
    .catch((error) => {
      throw new Error("token is missing", error);
    });
  return uid;
};
