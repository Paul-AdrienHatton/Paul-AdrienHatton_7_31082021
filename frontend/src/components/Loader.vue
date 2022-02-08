<template>
  <div class="loader">
        <div class="loader_form"></div>
</div>
</template>

<script>
export default {
    name: "Loader",
}
</script>

<style>
.loader {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(234,234,231,0.8);
  animation: loader 0.5s;
  animation-delay: 1.5s;
  animation-fill-mode: both;
  z-index: 60;
  display:flex;
  align-items:center;
  justify-content:center;
}
@keyframes loader {
  100% {
    opacity: 0;
    z-index: -10;
  }
} 
.loader_form {
    display: block;
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 7px solid transparent;
    border-top-color: rgb(253, 45, 1);
    animation: spin 1s linear infinite;
}
.loader_form::before, .loader_form::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 7px solid transparent;
}
.loader_form::before {
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-top-color:rgba(253, 45, 1, 0.5);
    animation: spin 3s linear infinite;
}
.loader_form::after {
    top: 25px;
    left: 25px;
    right: 25px;
    bottom: 25px;
    border-top-color: rgba(253, 45, 1, 0.2);
    animation: spin 1.5s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
       transform: rotate(360deg);
    }
}
</style>