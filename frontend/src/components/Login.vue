<template>
  <header>
    <img class="icon" src="../assets/logo.png" alt="Logo groupomania" />
    <nav class="menu">
      <ul>
        <li><router-link :to="{ name: 'Signup' }">S'inscrire</router-link></li>
        <li><router-link :to="{ name: 'Login' }">Se connecter</router-link></li>
      </ul>
    </nav>
  </header>
  <div class="formHome">
    <form class="homeForms" @submit.prevent="handleLogin">
      <h1>Se connecter</h1>
      <router-link class="links" :to="{ name: 'Signup' }"
        >Créer un compte</router-link
      >
      <router-view />
      <label for="email">E-mail:</label>
      <input
        type="email"
        name="email"
        id="email"
        required
        v-model="email"
        placeholder="Entrer votre e-mail"
      />
      <label for="password">Mot de passe:</label>
      <input
        :type="passwordFieldType"
        name="password"
        id="password"
        required
        v-model="password"
        placeholder="Entrer votre mot de passe"
      />
      <div class="btnShow">
        <fa
          icon="eye"
          class="visible"
          type="password"
          @click="switchVisibility"
        />
      </div>
      <div class="submit">
        <button>Connexion</button>
      </div>
      <p class="error-message">{{ error }}</p>
    </form>
  </div>
  <div>
    <img class="homeBack" src="../assets/home.svg" alt="home background " />
  </div>
  <footer>
    <img
      class="footer-icon"
      src="../assets/icon.png"
      alt="Icone groupomania "
    />
    <p class="footer-text">groupomania social network © 2021</p>
  </footer>
</template>

<script>
import axios from "axios";
import { url } from "../main";

export default {
  name: "Login",
  data() {
    return {
      isDisplay: false,
      passwordFieldType: "password",
      email: "",
      password: "",
      error: "",
      terms: false,
    };
  },
  methods: {
    handleLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(url + "user/login", user)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("loggedInUser", JSON.stringify(res.data));
            this.$router.push("/profile");
          }
        })
        .catch((res) => {
          localStorage.clear();
          if (res.status === 401) {
            this.error =
              "Le mot de passe ou l'adresse mail est incorrect, veuillez réessayer";
          } else {
            this.error =
              "Le mot de passe ou l'adresse mail est incorrect, veuillez réessayer";
          }
        });
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style src="../Css/Global.css">
</style>