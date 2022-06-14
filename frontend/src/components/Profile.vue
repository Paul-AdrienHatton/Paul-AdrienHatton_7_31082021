<template>
  <div class="container">
    <div class="userProfile">
      <img
        class="banniereUser"
        src="../assets/Banniere_distribution.png"
        alt="Bannière"
      />
      <div class="userInfo">
        <div
          class="userProfilePicture"
          :style="{ backgroundImage: `url(${imageData})` }"
        ></div>
        <h1 class="userPseudo">{{ user.pseudo }}</h1>
      </div>
      <p>Membre du groupe Groupomania</p>
      <p class="location">Paris, France</p>
      <p v-if="this.admin === false">
        <em>{{ user.pseudo }}</em> est membre du groupe Groupomania depuis 2017,
        chargé de la logistique, vous pouvez me contacter pour toute information
        à l'adresse suivante: <a class="userMail">{{ user.email }}</a
        >. <br />Dans le cadre du renouvellement du site et d'une meilleur
        coopération, n'hésitez pas à m'écrire cordialement.
      </p>
      <p v-else>
        <em>{{ user.pseudo }}</em> est membre du groupe Groupomania depuis 2017,
        chargé de corriger et de modérer les utilisateurs du site afin de faire
        respecter les règles du forum vous pouvez lee contacter pour toute
        information à l'adresse suivante:
        <a class="userMail">{{ user.email }}</a
        >. <br />Dans le cadre du renouvellement du site et d'une meilleur
        coopération, n'hésitez pas à m'écrire cordialement.
      </p>

      <div class="terms">
        <span>
          <a href="#popup" aria-label="modify info" class="buttonModify">
            <fa icon="pen" />
          </a>
        </span>
      </div>
    </div>
    <div id="popup" class="overlay">
      <div class="popup">
        <a href="#" class="cross">&times;</a>
        <div class="userProfileInfo">
          <form class="formModifyUserInfo" @submit.prevent="modifyUser">
            <h2>Modifier mes informations</h2>
            <label for="pseudo">Pseudo</label>
            <input
              id="pseudo"
              class="input"
              v-model="pseudo"
              placeholder="My pseudo"
              maxlength="20"
              @input="lenghtCheck(20, user.pseudo, 'pseudo')"
            />
            <label for="email">E-mail</label>
            <input
              id="email"
              class="input"
              v-model="email"
              type="email"
              placeholder="My e-mail"
              maxlength="30"
              @input="lenghtCheck(30, user.email, 'email')"
            />
            <label for="password">Mot de passe</label>
            <input
              id="password"
              class="input"
              v-model="password"
              :type="passwordFieldType"
              placeholder="Nouveau mot de passe"
              maxlength="16"
              @input="lenghtCheck(16, password, 'mot de passe')"
            />
            <div class="btnShow">
              <fa
                icon="eye"
                class="visible"
                type="password"
                @click="switchVisibility"
              />
            </div>
            <div>
              <label for="fileInput" class="modifyTitle"
                >Changer ma photo de profil</label
              >
              <input
                id="fileInput"
                class="inputFile"
                type="file"
                ref="fileInput"
                accept="image/jpeg,image/gif,image/png,image/jpg"
                @change="onSelectedFile"
              />
            </div>
            <div class="modifyUserInfo">
              <button>Sauvegarder</button>
            </div>
          </form>
          <div class="deleteAccount">
            <button class="btnDelete" @click="deleteUser()">
              Supprimer le compte
            </button>
          </div>
          <p class="error-message">{{ error }}</p>
          <p class="sucess-message">{{ success }}</p>
        </div>
      </div>
    </div>
    <div class="sideFeature">
      <img class="connect" src="../assets/connect.jpg" alt="img connect" />
      <p>
        Retrouver tout les posts
        <router-link class="link" :to="{ name: 'Forum' }">ici, </router-link
        >n'hésitez pas à partager !
      </p>
    </div>
    <div class="secondSideFeature">
      <img class="logo" src="../assets/logo_black.svg" alt="logo groupomania" />
      <h3>Information</h3>
      <p>
        Le port du masque au sein de l'entreprise est toujours obligatoire merci
        de le respecter
      </p>
    </div>

    <div class="postsContainer">
      <h1 v-if="this.admin === false" class="userPosts">Mes Posts</h1>
      <h1 v-else class="userPosts">Admin message</h1>
      <h2>Bonjour {{ user.pseudo }}<br />{{ message }}</h2>
      <div v-for="userPost in userPosts" :key="userPost">
        <div class="userPost">
          <div class="userData">
            <div
              class="userPicture"
              :style="{
                backgroundImage: `url(${userPost.userProfilePicture})`,
              }"
            ></div>
            <h1 class="UserName">{{ userPost.user }}</h1>
            <p class="ProfilePostCreationDate">{{ userPost.creationDate }}</p>
          </div>
          <p class="postContent">{{ userPost.content }}</p>
          <div v-if="userPost.image != null">
            <img
              class="postPictureProfile"
              :src="userPost.image"
              alt="post image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer">
    <img
      class="footer-icon"
      src="../assets/icon.png"
      alt="Icone groupomania "
    />
    <p class="footer-text">groupomania social network © 2022</p>
  </footer>
</template>

<script>
import axios from "axios";
import { url } from "../main";
export default {
  name: "Profile",
  data() {
    return {
      password: "",
      message: "",
      isDisplay: false,
      admin: false,
      user: "",
      imageData: "",
      file: "",
      token: "",
      userId: "",
      email: "",
      pseudo: "",
      passwordFieldType: "password",
      pseudoRegex: /^[a-z ,.'-]+$/i,
      emailRegex:
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
      error: "",
      success: "",
      userPosts: "",
    };
  },
  mounted: function () {
    this.getUser(), this.getUserPost();
  },
  methods: {
    lenghtCheck(length, object, message) {
      if (object.length === length) {
        this.error = "Votre " + message + " est trop long";
      } else {
        this.error = "";
      }
    },
    getUser() {
      const data = JSON.parse(localStorage.getItem("loggedInUser"));
      this.token = data.token;
      this.userId = data.userId;
      axios
        .get(url + "user/" + this.userId, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          localStorage.setItem("UserInfo", JSON.stringify(res.data));
          this.email = res.data.email;
          this.pseudo = res.data.pseudo;
          this.user = res.data;
          this.admin = res.data.admin;
          this.imageData = res.data.profilePicture;
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    deleteUser() {
      const deleteConfirm = confirm(
        "Attention, vos données seront supprimées. Cette action est irréversible."
      );
      if (deleteConfirm) {
        axios
          .delete(url + "user/" + this.userId, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((res) => {
            this.success = "Votre compte à bien été supprimé";
          })
          .catch(() => {
            this.error = "Un problème est survenu, veuillez réessayer";
          });
        localStorage.clear();
        this.$router.push("/login");
      }
    },
    modifyUser() {
      const formData = new FormData();
      formData.append("images", this.file);
      formData.append("pseudo", this.pseudo);
      formData.append("email", this.email);
      formData.append("user_id", this.userId);
      formData.append("admin", this.admin);
      if (this.password !== undefined) {
        formData.append("password", this.password);
      }
      if (!this.emailRegex.test(this.email)) {
        return (this.error = "Vous devez renseigner une adresse email valide");
      } else if (!this.pseudoRegex.test(this.pseudo)) {
        return (this.error =
          "Votre pseudo doit contenir au moins 3 caractères");
      } else if (this.password) {
        if (!this.passwordRegex.test(this.password)) {
          return (this.error =
            "Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
        }
      }
      axios
        .put(url + "user/" + this.userId, formData, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.success = "Your information has been changed with success";
          this.$router.go();
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    onSelectedFile(e) {
      const input = this.$refs.fileInput;
      const files = input.files;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageData = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      const file = this.$refs.fileInput.files[0];
      this.file = file;
      console.log(this.file);
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    getUserPost() {
      axios
        .get(url + "post/" + this.userId, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          this.userPosts = response.data;
          if (response.data.length === 0) {
            this.message = "Pas de post pour le moment";
          }
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
  },
};
</script>
<style src="../Css/Profile.css">
</style>