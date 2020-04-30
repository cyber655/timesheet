<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

tbody {
  cursor: pointer;
}

*:focus {
  outline: none;
}

.center-horizontally {
  display: flex;
  justify-content: center;
}
</style>
