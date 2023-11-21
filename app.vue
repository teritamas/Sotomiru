<template>
  <AppHeader />
  <div class="main">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Decol&family=Kaisei+Opti:wght@700&family=Kiwi+Maru:wght@300&family=Lato:wght@900&family=Mochiy+Pop+P+One&family=Open+Sans:wght@300;400&display=swap");
:root {
  --bg: #d3e3fd;
  --body: #666;
  --c1: #d9d7f1;
  --c2: #ffe0a3;
  --c3: #b0e0a8;
  --c4: #ffcbcb;
  --c5: #d3e3fd;
  --c6: #ff7b74;
  --c7: #568de5;
  --font: radio canada;
  --smallfont: inconsolata;

  --done: 44%;
}
h1 {
  font-family: "Kiwi Maru", serif;
  text-transform: uppercase;
  font-weight: bold;
}

.font-kiwi {
  font-family: "Kiwi Maru", serif;
}
.color {
  color: var(--c7);
}
body {
  font-family: "Mochiy Pop P One", sans-serif;
  font-family: "Open Sans", sans-serif;
  background-color: var(--bg);
  background-attachment: fixed; /*--背景画像の固定--*/
  background-repeat: no-repeat; /*--背景画像の繰り返し--*/
  background-position: bottom; /*--背景画像の位置--*/
  background-image: url("@/assets/img/bg-cloud.png");
  min-height: 100%;
}

.main {
  /*max-width: 600px;*/
  margin: 0 auto;
  padding-top: 4rem;
}
.bingo-card-frame {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
}
</style>
