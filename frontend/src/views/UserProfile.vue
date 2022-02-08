<template>
    <Loader />
    <Header />
    <Profile />
</template>

<script>

import Header from '../components/Header.vue'
import Profile from '../components/Profile.vue'
import Loader from '../components/Loader.vue'


export default {
  name: 'Forum',
  components: {
      Header, Profile, Loader
  }
}
</script>

<style>
</style>