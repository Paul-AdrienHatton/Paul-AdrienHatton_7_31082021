<template>
    <Loader />
    <Header />
    <Post />
</template>

<script>
import Header from '../components/Header.vue';
import Post from '../components/UsersContent.vue';
import Loader from '../components/Loader.vue';


export default {
  name: 'Forum',
  components: {
    Header, Post, Loader
  },
}
</script>

<style>
body {
    background: #f3f2ef;
    margin: 0;
    padding: 0;
}
</style>