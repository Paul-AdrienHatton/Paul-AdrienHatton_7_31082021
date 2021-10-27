<template>
    <Header />
    <Post />
   <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Post from '../components/Post.vue'


export default {
  name: 'Forum',
  components: {
    Header, Footer, Post
  },
}
</script>

<style>

</style>