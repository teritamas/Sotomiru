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
  --bg1: #ddd;
  --bg2: #ededed;
  --bg: #fff;
  --body: #666;
  --c1: #d9d7f1;
  --c2: #ffe0a3;
  --c3: #b0e0a8;
  --c4: #ffcbcb;
  --c5: #a486ff;
  --c6: #ff7b74;

  --font: radio canada;
  --smallfont: inconsolata;

  --done: 44%;
}
h1 {
  font-family: "Kiwi Maru", serif;
  text-transform: uppercase;
  font-weight: bold;
}

.color {
  text-transform: uppercase;
  font-weight: bold;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, var(--c5), var(--c6));
}
body {
  font-family: "Mochiy Pop P One", sans-serif;
  font-family: "Open Sans", sans-serif;
  background-image: -webkit-linear-gradient(
    135deg,
    #f8f8f8 25%,
    #fff 25%,
    #fff 50%,
    #f8f8f8 50%,
    #f8f8f8 75%,
    #fff 75%,
    #fff
  );
  background-image: linear-gradient(
    -45deg,
    #f8f8f8 25%,
    #fff 25%,
    #fff 50%,
    #f8f8f8 50%,
    #f8f8f8 75%,
    #fff 75%,
    #fff
  );
  background-size: 10px 10px;
  background-image: linear-gradient(
    to top right,
    var(--bg1),
    var(--c1),
    var(--bg2)
  );
  background-size: cover;
  background-attachment: fixed;
  color: var(--body);
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
