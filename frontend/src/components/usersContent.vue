<template>
  <div class="container">
    <div class="info">
      <div class="userInfo Block">
        <h3 class="sponsored"><fa icon="info-circle"/> Information</h3>
        <img
          class="banniere"
          src="../assets/Banniere_distribution.png"
          alt="Bannière"
        />
        <p>Name: {{ this.pseudo }}</p>
        <p>E-mail: {{ this.email }}</p>
      </div>
      <div class="businessInfo Block">
        <img class="banniereMin" src="../assets/logo.png" alt="Bannière" />
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
        <input
          type="text"
          class="postInput"
          name="name"
          required
          minlength="4"
          maxlength="1000"
          v-model="content"
          :placeholder="'What\'s up, ' + this.pseudo"
          @input="lenghtCheck(1000, this.content, 'content')"
        />
        <div class="btnSelectFile">
          <div class="inputImg"><fa class="iconFile" icon="image" size="lg"/></div>
          <input
            class="file-input"
            type="file"
            ref="fileInput"
            accept="image/jpeg,image/gif,image/png,image/jpg"
            @change="onSelectedFile"
          />
        </div>
        <div class="sentPost">
          <button class="btnSentPost">Create Post</button>
        </div>
      </form>
      <!-- Users Posts -->
      <div class="usersPosts" v-if="posts.length">
        <post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>

    <div class="sides">
      <div class="ad Block">
        <h3 class="sponsored"><fa icon="users" /> Règles du forum</h3>
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
</template>
<script>
import axios from "axios";
import { url } from "../main";
import Post from "./Post.vue";

export default {
  name: "UsersContent",
  data() {
    return {
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
  mounted: function() {
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
<style scoped>
.container {
  display: grid;
  width: 95%;
  min-height: 300vh;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0px;
  margin: 100px auto;
}
.posts {
  margin: 0;
  grid-area: 1 / 2 / 3 / 3;
  justify-self: center;
}
.postInput {
  margin-top: 10px;
}
.userInfo {
  grid-area: 1 / 1 / 2 / 2;
}
.businessInfo {
  grid-area: 2 / 1 / 3 / 2;
  text-align: left;
  position: sticky;
  top: 100px;
}
.formCreatePost {
  position: relative;
  display: grid;
  grid-template-columns: [first] 20% [second] 80%;
  grid-gap: 20px 0;
  margin: 5px 10px;
  padding: 40px;
  border-radius: 10px;
  grid-area: content;
  border: 1.5px solid #eaeae7;
  box-shadow: none;
}
.ad {
  grid-area: 1 / 3 / 2 / 4;
}
.rules {
  text-align: left;
}
.message {
  grid-area: 2 / 3 / 3 / 4;
  text-align: left;
  position: sticky;
  top: 100px;
}
.Block {
  box-shadow: none;
  background: white;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  border: 1.5px solid #eaeae7;
  font-size: 12px;
}
.usersPosts {
  margin: 0 auto;
}
.banniere {
  width: 100%;
  border: 1px solid #eaeae7;
}
.banniereMin {
  display: block;
  width: 70%;
  margin: 0 auto;
}
.sideImg {
  width: 100%;
  margin: 0 auto;
}
.userProfilePictureMin {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #eaeae7;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.sponsored {
  color: #fd2d01;
}
.btnSelectFile {
  display: flex;
  justify-content: space-between;
}
.inputImg {
    width: 30px;
    font-size: 13px;
    background:none;
    border: none;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;   
    color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    z-index: 30;
    position: absolute;
    right: 45px;
    top: 50px;
}
.file-input {
    width: 20px;
    height: 20px;
    opacity: 0;
    margin: 0;
    position: absolute;
    z-index: 40;
    box-shadow: none;
    border-radius: 20px;
    color: black;
    cursor: pointer;
    right: 50px;
    top: 55px;
}
.sentPost {
  justify-self: self-end;
}
@media screen and (max-width: 1200px) {
  .container {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3fr;
  }
  .info {
    grid-area: 1 / 1 / 2 / 3;
  }
  .info,
  .sides {
    display: flex;
    justify-content: center;
    margin: 0 50px 20px 50px;
  }
  .userInfo,
  .businessInfo,
  .ad,
  .message {
    grid-area: none;
    width: 40%;
    margin: 50px 20px;
  }
  .posts {
    margin: 0 auto;
    grid-area: 2 / 1 / 3 / 3;
  }
  .sides {
    grid-area: 3 / 1 / 4 / 3;
  }
  .ad {
    grid-area: none;
    width: 30%;
  }
  .message {
    grid-area: none;
    width: 30%;
  }
  .userPosts {
    margin-top: 50px;
  }
}
@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
  }
  .info,
  .sides {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sides {
    margin: -50px 50px 20px 50px;
  }
  .userInfo,
  .businessInfo,
  .ad,
  .message {
    width: 80%;
    margin: 30px 0 0 0;
  }
}
@media screen and (max-width: 900px) {
  .userInfo,
  .businessInfo,
  .ad,
  .message {
    width: 100%;
  }
}
</style>
