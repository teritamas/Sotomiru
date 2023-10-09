<template>
  <div
    class="block border border-gray-700 p-5 m-3 md:max-w-[600px] md:m-auto md:mt-6 pb-10"
  >
    <h1
      class="text-center tracking-wider mb-5 mt-5 font-normal text-xl text-gray-700"
    >
      BINGO <span class="text-lg">をつくる</span>
    </h1>

    <form class="px-5 md:px-12">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="title"
          id="title"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="title"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >タイトル</label
        >
        <small>例：冬の景色と車、家族との思い出</small>
      </div>
      <div class="mb-3">
        <legend class="text-sm text-gray-500 mb-1">テーマ</legend>
        <div class="sample-form flex">
          <div class="w-1/3 text-center">
            <input id="ryokou" type="radio" value="ryokou" name="image" />
            <label for="ryokou"
              ><img src="@/assets/img/ryokou.jpg" width="150px"
            /></label>
            <small class="text-gray-700">旅行</small>
          </div>
          <div class="w-1/3 text-center">
            <input id="nichijo" type="radio" value="nichijo" name="image" />
            <label for="nichijo"
              ><img src="@/assets/img/nichijo.jpg" width="150px"
            /></label>
            <small class="text-gray-700">日常</small>
          </div>
          <div class="w-1/3 text-center">
            <input id="tuukin" type="radio" value="tuukin" name="image" />
            <label for="tuukin"
              ><img src="@/assets/img/tuukin.jpg" width="150"
            /></label>
            <small class="text-gray-700">通勤</small>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <fieldset class="flex">
          <legend class="text-sm text-gray-500 mb-1">テーマカラー</legend>
          <div class="flex items-center mb-4 mr-9">
            <input type="color" v-model="color" class="w-1/2 mr-3" />
            <input
              v-model="color"
              type="text"
              name="color"
              id="color"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
          </div>
        </fieldset>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const color = ref("#6B8CFF");
</script>

<style scoped>
.bingo-cell-image {
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    var(--bg-url);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* ラジオボタンの○を消す */
.sample-form input[type="radio"] {
  display: none;
}
/* 画像の周りに隙間をあける */
.sample-form label img {
  margin: 3px;
  padding: 5px;
}
/* 未選択の場合、色を薄くする */
.sample-form input[type="radio"] + label img {
  opacity: 0.2;
}
/* 選択済みの場合、色を濃くする */
.sample-form input[type="radio"]:checked + label img {
  opacity: 1;
}

/* 未選択の場合、色を薄くする */
.sample-form input[type="radio"] + label img {
  opacity: 0.2;
}
/* 選択済みの場合、色を濃くする */
.sample-form input[type="radio"]:checked + label img {
  opacity: 1;
}
</style>