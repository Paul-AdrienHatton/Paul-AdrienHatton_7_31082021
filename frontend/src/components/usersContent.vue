<template>
  <div class="container">
    <div class="info">
      <div class="userInfo Block">
        <h2 class="sponsored">
          <fa icon="info-circle" aria-hidden="false" /> Information
        </h2>
        <img
          class="banniere"
          src="../assets/Banniere_distribution.png"
          alt="Bannière"
        />
        <p>Name: {{ this.pseudo }}</p>
        <p>E-mail: {{ this.email }}</p>
      </div>
      <div class="businessInfo Block">
        <img class="banniereMin" src="../assets/logo.png" alt="BannièreMin" />
        <p>
          Notre entreprise, spécialisée dans la grande distribution, est en
          pleine expansion. Nous avons actuellement plus de 600 collaborateurs
          et avons beaucoup recruté depuis quelques années. Nous étions
          uniquement 300 il y a 3 ans. Il y a 6 mois, la direction a détecté un
          ralentissement de la productivité. Elle l’a attribué assez rapidement
          à une baisse de la motivation et de l’implication des employés. La
          direction a réagi et a mis en place un comité de pilotage sur le
          bien-être au travail il y a deux mois. Il est composé d'une dizaine de
          personnes, regroupant des représentants de la direction et des
          salariés. Son rôle est de diffuser des questionnaires aux salariés et
          de restituer les résultats au département des ressources humaines pour
          envisager des actions pouvant améliorer le bien être des salariés.
        </p>
      </div>
    </div>
    <div class="posts">
      <form @submit.prevent="createPost" class="formCreatePost">
        <div
          class="userProfilePictureMin"
          :style="{ backgroundImage: `url(${this.imageData})` }"
        ></div>
        <textarea
          id="createPost"
          type="text"
          cols="30"
          aria-label="Créer un post"
          name="createAPost"
          required
          minlength="4"
          maxlength="1000"
          v-model="content"
          :placeholder="'Quoi de neuf, ' + this.pseudo"
          @input="lenghtCheck(1000, this.content, 'content')"
        />
        <div class="btnSelectFile">
          <div class="inputImg">
            <fa
              class="iconFile"
              icon="image"
              size="lg"
              aria-hidden="false"
              title="icon input img"
            />
          </div>
          <input
            name="createAPost"
            aria-label="input img"
            id="createAPost"
            class="file-input"
            type="file"
            ref="fileInput"
            accept="image/jpeg,image/gif,image/png,image/jpg"
            @change="onSelectedFile"
          />
        </div>
        <div class="sentPost">
          <button class="btnSentPost">Créer un post</button>
        </div>
      </form>
      <!-- Users Posts -->
      <h1 v-if="post === null">{{ message }}</h1>
      <div class="usersPosts" v-if="posts.length">
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>

    <div class="sides">
      <div class="ad Block">
        <h2 class="sponsored">
          <fa icon="users" aria-hidden="false" /> Règles du forum
        </h2>
        <div class="rules">
          <ol>
            <li>
              Pas d'insultes ethniques, sexuelles, religieuses, de handicap,
              d'agression ou transphobes
            </li>
            <li>Respecter les autres humains</li>
            <li>Inclure tout le monde</li>
            <li>Écoutez l'équipe de modération</li>
            <li>
              Pas d'intimidation, de sexisme, de racisme, d'homophobie ou
              d'autre conversation basée sur la haine
            </li>
          </ol>
        </div>
      </div>
      <div class="message Block">
        <img
          class="sideImg"
          src="../assets/share.jpeg"
          alt="image pc portable"
        />
        <p>
          Cette espace à été créé pour faciliter l'échange entre collègue
          n'hésitez pas à commenter entre vous !
        </p>
      </div>
    </div>
  </div>
  <footer>
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
import Post from "./Post.vue";

export default {
  name: "UsersContent",
  data() {
    return {
      message: "",
      content: "",
      posts: [],
      error: "",
      token: "",
      admin: "",
      currentUserId: "",
      email: "",
      pseudo: "",
      error: "",
      imageData: "",
    };
  },
  mounted: function () {
    this.getPost();
  },
  methods: {
    getPost() {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      this.imageData = data.profilePicture;
      this.email = data.email;
      this.currentUserId = data.userId;
      this.pseudo = data.pseudo;
      this.admin = data.admin;
      const dataToken = localStorage.getItem("loggedInUser");
      this.token = JSON.parse(dataToken);
      axios
        .get(url + "post/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          this.posts = response.data;
          if (response.data.length === 0) {
            this.message = "Pas de post pour le moment";
          }
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    createPost() {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      this.userId = data.userId;
      this.pseudo = data.pseudo;
      const dataToken = JSON.parse(localStorage.getItem("loggedInUser"));
      this.token = dataToken.token;
      const formData = new FormData();
      formData.append("images", this.file);
      formData.append("content", this.content);
      formData.append("user_id", this.userId);
      axios
        .post(url + "post/" + this.userId, formData, {
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
      reader.readAsDataURL(files[0]);
      const file = this.$refs.fileInput.files[0];
      this.file = file;
    },
    lenghtCheck(length, object, message) {
      if (object.length === length) {
        this.error = "Votre " + message + " est trop long";
      } else {
        this.error = "";
      }
    },
  },
  components: {
    Post,
  },
};
</script>
<style scoped src="../Css/UsersContent.css">
</style>
