<template>
    <Header />
    <Profile />
    <Footer />
</template>

<script>

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Profile from '../components/Profile.vue'


export default {
  name: 'Forum',
  components: {
      Header, Footer, Profile
  }
}
</script>

<style>

</style>