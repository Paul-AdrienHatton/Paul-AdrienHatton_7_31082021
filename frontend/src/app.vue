<template>
    <nav>
      <router-link to='/'>Acceuil</router-link> |
      <router-link to='/profile'>Mon profil</router-link> |
      <router-link to='/forum'>Forum</router-link> | 
      <router-link to='/about'>A propos</router-link> |
    </nav>
    <router-view />
</template>

<script>

export default {
  name: 'App',
  methods: {
    }
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration: none;
  color:#999;
}

.router-link-active {
  font-weight: bold;
  color: blueviolet;
}
</style>
