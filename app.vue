<template>
  <NuxtLayout>
    <NuxtPage />
    <AppFooter />
  </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&family=Open+Sans:wght@300;400&display=swap");
body {
  font-family: "Mochiy Pop P One", sans-serif;
  font-family: "Open Sans", sans-serif;
  background: #f8fbff;
}

.bingo-card-frame {
  max-width: 600px;
  margin: 1rem auto;
  padding-top: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 4rem;
}

.bingo-cell-frame {
  max-width: 456px;
  margin: 0 auto;
}
</style>
