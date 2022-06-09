<template>
  <router-view />
</template> 
<script>
</script>

<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
textarea {
  resize: none;
  border-radius: 10px;
  border: 1.32px solid #eaeae7;
}
textarea:focus {
  outline: 1px solid #fd2d01;
  border: none;
}
textarea:focus::placeholder {
  color: transparent;
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>
