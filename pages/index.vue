<template>
  <div class="main">
    <div class="p-3 bg-gray-200" style="display: flex; overflow-x: scroll">
      <a
        v-for="BingoList in BingoLists"
        :href="`/BingoCard/${BingoList.id}`"
        class="min-w-[98%] md:min-w-[70%] mr-1"
      >
        <BingoCardView
          :bingoCells="BingoList.bingoCells"
          class="bg-white hover:bg-sky-100"
        />
      </a>
    </div>

    <bingo-card-carousel />
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";

const bingoCardId = ref("");
const bingoCard = ref(null as BingoCard | null);

// 最初の画面描画時にビンゴルームを作成
onMounted(async () => {
  // await createBingoCard(); // 動作確認用
  bingoCardId.value = "006bb342-31aa-4fd8-a0c7-af089858bd6d";
  bingoCard.value = await fetchBingoCard();
});

// 将来的にTopページに移動する
const createBingoCard = async () => {
  const res = await fetch("api/bingoCard", {
    method: "POST",
  });
  const data = (await res.json()) as { message: string; bingoCardId: string };

  bingoCardId.value = data.bingoCardId;
};

// ビンゴカードの情報取得
const fetchBingoCard = async () => {
  const res = await fetch(`api/bingoCard/${bingoCardId.value}`);
  const data = (await res.json()) as BingoCard;
  return data;
};

const BingoLists = [
  {
    createdAt: { _seconds: 1696817452, _nanoseconds: 20000000 },
    name: "test",
    id: "006bb342-31aa-4fd8-a0c7-af089858bd6d",
    updatedAt: { _seconds: 1696817452, _nanoseconds: 20000000 },
    bingoCells: [
      {
        comments: "",
        geo_location: null,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Fc7e73842-07c3-4cde-a0ca-9d6f5369b0fe.png?alt=media",
        name: "自然の美しさ",
        description: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817497, _nanoseconds: 117000000 },
        completed: true,
        id: "b44a757c-2493-47e8-8bf1-e8a7aef88b50",
      },
      {
        comments: "",
        geo_location: null,
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Feaf089ee-e2b5-4a0b-8109-07a25104855c.png?alt=media",
        name: "街の風景",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description: "ドライブ中に通過する街や町の風景をキャッチした写真",
        answered_at: { _seconds: 1696817617, _nanoseconds: 313000000 },
        completed: true,
        id: "b107d53d-39d8-4b57-b84a-ee428d691327",
      },
      {
        comments: "",
        geo_location: null,
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Fec6d946f-e985-4ae5-9da5-d4a0db7a5ba3.png?alt=media",
        name: "路の途中のカフェ",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817644, _nanoseconds: 975000000 },
        description:
          "道路脇にあるカフェやレストランでの風景や料理を撮影した写真",
        completed: true,
        id: "1707927b-73b8-478a-b328-2082579b7304",
      },
      {
        geo_location: null,
        comments: "",
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F1b26f02b-bfc7-40c7-aece-ac065cb824ed.png?alt=media",
        name: "休憩ポイント",
        description:
          "ドライブ中に立ち寄った休憩スポットでの風景や活動を記録した写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817539, _nanoseconds: 605000000 },
        id: "701f0fcc-defa-43d4-84c0-deed9201943e",
        completed: true,
      },
      {
        geo_location: null,
        comments: "abdd",
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F437b42f0-44cb-407e-9f30-82d30b28c3b4.png?alt=media",
        name: "季節の変化",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817803, _nanoseconds: 542000000 },
        description: "季節ごとの変化を示す風景や植物を捉えた写真",
        id: "d9348380-ada2-402a-9156-f1cc598732bb",
        completed: true,
      },
      {
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        name: "地元のアート",
        description: "地元のアート作品、壁画、彫刻などを探し、撮影した写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        completed: false,
        id: "70c8858c-ff75-47c6-9965-5e629b787317",
      },
      {
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        name: "車のディテール",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description:
          "愛車のディテールやカスタマイズをアップクローズで撮影した写真",
        completed: false,
        id: "1e18a3fb-db35-4d49-9b8f-47f434082279",
      },
      {
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        name: "日の出または日の入り",
        description: "美しい日の出や日の入りをキャッチした写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        completed: false,
        id: "87d7c999-270d-4ace-8aa9-7e1f4282d7df",
      },
      {
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        name: "道路のカーブ",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description: "道路のカーブや山道の風景を楽しんで撮影した写真",
        completed: false,
        id: "11298daa-aeaa-49f4-b1c0-81ad3a59300a",
      },
    ],
  },
  {
    createdAt: { _seconds: 1696817452, _nanoseconds: 20000000 },
    name: "test",
    id: "006bb342-31aa-4fd8-a0c7-af089858bd6d",
    updatedAt: { _seconds: 1696817452, _nanoseconds: 20000000 },
    bingoCells: [
      {
        comments: "",
        geo_location: null,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Fc7e73842-07c3-4cde-a0ca-9d6f5369b0fe.png?alt=media",
        name: "自然の美しさ",
        description: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817497, _nanoseconds: 117000000 },
        completed: true,
        id: "b44a757c-2493-47e8-8bf1-e8a7aef88b50",
      },
      {
        comments: "",
        geo_location: null,
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Feaf089ee-e2b5-4a0b-8109-07a25104855c.png?alt=media",
        name: "街の風景",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description: "ドライブ中に通過する街や町の風景をキャッチした写真",
        answered_at: { _seconds: 1696817617, _nanoseconds: 313000000 },
        completed: true,
        id: "b107d53d-39d8-4b57-b84a-ee428d691327",
      },
      {
        comments: "",
        geo_location: null,
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Fec6d946f-e985-4ae5-9da5-d4a0db7a5ba3.png?alt=media",
        name: "路の途中のカフェ",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817644, _nanoseconds: 975000000 },
        description:
          "道路脇にあるカフェやレストランでの風景や料理を撮影した写真",
        completed: true,
        id: "1707927b-73b8-478a-b328-2082579b7304",
      },
      {
        geo_location: null,
        comments: "",
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F1b26f02b-bfc7-40c7-aece-ac065cb824ed.png?alt=media",
        name: "休憩ポイント",
        description:
          "ドライブ中に立ち寄った休憩スポットでの風景や活動を記録した写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817539, _nanoseconds: 605000000 },
        id: "701f0fcc-defa-43d4-84c0-deed9201943e",
        completed: true,
      },
      {
        geo_location: null,
        comments: "abdd",
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F437b42f0-44cb-407e-9f30-82d30b28c3b4.png?alt=media",
        name: "季節の変化",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817803, _nanoseconds: 542000000 },
        description: "季節ごとの変化を示す風景や植物を捉えた写真",
        id: "d9348380-ada2-402a-9156-f1cc598732bb",
        completed: true,
      },
      {
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        name: "地元のアート",
        description: "地元のアート作品、壁画、彫刻などを探し、撮影した写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        completed: false,
        id: "70c8858c-ff75-47c6-9965-5e629b787317",
      },
      {
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        name: "車のディテール",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description:
          "愛車のディテールやカスタマイズをアップクローズで撮影した写真",
        completed: false,
        id: "1e18a3fb-db35-4d49-9b8f-47f434082279",
      },
      {
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        name: "日の出または日の入り",
        description: "美しい日の出や日の入りをキャッチした写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        completed: false,
        id: "87d7c999-270d-4ace-8aa9-7e1f4282d7df",
      },
      {
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        name: "道路のカーブ",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description: "道路のカーブや山道の風景を楽しんで撮影した写真",
        completed: false,
        id: "11298daa-aeaa-49f4-b1c0-81ad3a59300a",
      },
    ],
  },
  {
    createdAt: { _seconds: 1696817452, _nanoseconds: 20000000 },
    name: "test",
    id: "006bb342-31aa-4fd8-a0c7-af089858bd6d",
    updatedAt: { _seconds: 1696817452, _nanoseconds: 20000000 },
    bingoCells: [
      {
        comments: "",
        geo_location: null,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Fc7e73842-07c3-4cde-a0ca-9d6f5369b0fe.png?alt=media",
        name: "自然の美しさ",
        description: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817497, _nanoseconds: 117000000 },
        completed: true,
        id: "b44a757c-2493-47e8-8bf1-e8a7aef88b50",
      },
      {
        comments: "",
        geo_location: null,
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Feaf089ee-e2b5-4a0b-8109-07a25104855c.png?alt=media",
        name: "街の風景",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description: "ドライブ中に通過する街や町の風景をキャッチした写真",
        answered_at: { _seconds: 1696817617, _nanoseconds: 313000000 },
        completed: true,
        id: "b107d53d-39d8-4b57-b84a-ee428d691327",
      },
      {
        comments: "",
        geo_location: null,
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2Fec6d946f-e985-4ae5-9da5-d4a0db7a5ba3.png?alt=media",
        name: "路の途中のカフェ",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817644, _nanoseconds: 975000000 },
        description:
          "道路脇にあるカフェやレストランでの風景や料理を撮影した写真",
        completed: true,
        id: "1707927b-73b8-478a-b328-2082579b7304",
      },
      {
        geo_location: null,
        comments: "",
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F1b26f02b-bfc7-40c7-aece-ac065cb824ed.png?alt=media",
        name: "休憩ポイント",
        description:
          "ドライブ中に立ち寄った休憩スポットでの風景や活動を記録した写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817539, _nanoseconds: 605000000 },
        id: "701f0fcc-defa-43d4-84c0-deed9201943e",
        completed: true,
      },
      {
        geo_location: null,
        comments: "abdd",
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        answered_user: 0,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F437b42f0-44cb-407e-9f30-82d30b28c3b4.png?alt=media",
        name: "季節の変化",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        answered_at: { _seconds: 1696817803, _nanoseconds: 542000000 },
        description: "季節ごとの変化を示す風景や植物を捉えた写真",
        id: "d9348380-ada2-402a-9156-f1cc598732bb",
        completed: true,
      },
      {
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        name: "地元のアート",
        description: "地元のアート作品、壁画、彫刻などを探し、撮影した写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        completed: false,
        id: "70c8858c-ff75-47c6-9965-5e629b787317",
      },
      {
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        created_user: 0,
        name: "車のディテール",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description:
          "愛車のディテールやカスタマイズをアップクローズで撮影した写真",
        completed: false,
        id: "1e18a3fb-db35-4d49-9b8f-47f434082279",
      },
      {
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        name: "日の出または日の入り",
        description: "美しい日の出や日の入りをキャッチした写真",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        completed: false,
        id: "87d7c999-270d-4ace-8aa9-7e1f4282d7df",
      },
      {
        created_user: 0,
        updated_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        name: "道路のカーブ",
        created_at: { _seconds: 1696817452, _nanoseconds: 20000000 },
        description: "道路のカーブや山道の風景を楽しんで撮影した写真",
        completed: false,
        id: "11298daa-aeaa-49f4-b1c0-81ad3a59300a",
      },
    ],
  },
];
</script>
