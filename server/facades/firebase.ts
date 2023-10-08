import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const app = initializeApp({
  storageBucket: process.env.FIRE_STORAGE_BUCKET,
});

export const firestore = getFirestore(app);
export const bucket = getStorage(app).bucket(); // 画像を保存する場合はこちらを使う
