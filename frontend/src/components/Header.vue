<template>
  <header>
    <button
      @click="displayMenu()"
      class="iconMenu"
      alt="btnMenu"
      aria-label="menu"
    >
      <fa class="burger" icon="bars" />
    </button>
    <img class="icon" src="../assets/logo.png" alt="Logo groupomania" />
    <nav v-show="!visible" class="menu">
      <ul>
        <li><router-link :to="{ name: 'Forum' }">Accueil</router-link></li>
        <li><router-link :to="{ name: 'Profile' }">Profil</router-link></li>
        <li class="disconnect" @click="clearStorage">Déconnexion</li>
      </ul>
    </nav>
    <nav v-show="visible" class="sideMenu">
      <ul>
        <li><router-link :to="{ name: 'Forum' }">Accueil</router-link></li>
        <li><router-link :to="{ name: 'Profile' }">Profil</router-link></li>
        <li class="disconnect" @click="clearStorage">Déconnexion</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    clearStorage() {
      localStorage.clear();
      this.$router.push("/login");
    },
    displayMenu() {
      this.visible ? (this.visible = false) : (this.visible = true);
    },
  },
};
</script>
<style scoped src="../Css/Header.css">
</style>
