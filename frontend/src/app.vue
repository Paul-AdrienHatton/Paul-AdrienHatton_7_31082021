<template>
  <img src="./assets/logo.png" alt="Logo groupomania">
  <p>Bienvenue, veuillez vous connecter ou procéder à votre inscription</p>
  <div v-if="showModal">
    <Modal  theme="" @close="toggleModal">
      <img class="logo" src="./assets/icon.png" alt="Logo groupomania">
      <h1>Inscrivez-vous</h1>
      <p>Veuillez entrer vos informations</p>
      <form action="/ma-page-de-traitement" method="post">
        <div class="form-input">
            <label for="mail">E-mail </label>
            <input type="email" id="mail" name="user_mail" placeholder="Entrez votre e-mail">
        </div>
        <div class="form-input">
            <label for="password">password </label>
            <input id="password" name="user_password" placeholder="Entrez un pseudo">
        </div>
      </form>
    </Modal>
  </div>

  <div v-if="showModalTwo">
    <Modal @close="toggleModalTwo">
      <img class="logo" src="./assets/icon.png" alt="Logo groupomania">
      <h1>Connectez-vous</h1>
      <p>Veuillez entrer vos informations</p>
      <form action="/ma-page-de-traitement" method="post">
         <div class="form-input">
            <label for="pseudo">Pseudo </label>
            <input id="pseudo" name="user_pseudo" placeholder="Entrez votre pseudo">
        </div>
        <div class="form-input">
            <label for="mail">E-mail </label>
            <input type="email" id="mail" name="user_mail" placeholder="Entrez votre e-mail">
        </div>
        <div class="form-input">
            <label for="password">Password </label>
            <input id="password" name="user_password" placeholder="Entrez un pseudo">
        </div>
      </form>
    </Modal>
  </div>

  <button @click="toggleModal">Sign up</button>
  <button @click="toggleModalTwo">Login</button>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      showModal: false,
      showModalTwo: false
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleModalTwo() {
      this.showModalTwo = !this.showModalTwo
    }
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
img {
  width: 500px;
}
h1 {
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
button {
  background: white;
  width: 260px;
  color: crimson;
  padding:12px;
  border: solid 1px rgb(0, 0, 0, 0.3);
  border-radius: 4px;
  text-decoration: none;
  margin: 30px;
  box-shadow: 2px 5px 10px 2px  rgb(0, 0, 0, 0.2);
}
button:hover {
  background: crimson;
  color: white;
   box-shadow: 2px 5px 10px 2px  rgb(0, 0, 0, 0.6);
}
input {
  width: 60%;
  height: 20px;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 2px 5px 10px 2px  rgb(0, 0, 0, 0.2);
}
label {
  display: flex;
  justify-content: center;
  font-weight: 600;
  margin: 10px;
  height: 20px;
}
.logo {
  width: 45px;
  margin-block:-10px ;
}

</style>
