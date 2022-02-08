<template>
    <Loader />
    <Header />
    <Post />
</template>

<script>
import Header from '../components/Header.vue'
import Post from '../components/usersContent.vue'
import Loader from '../components/Loader.vue'


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
}
</style>