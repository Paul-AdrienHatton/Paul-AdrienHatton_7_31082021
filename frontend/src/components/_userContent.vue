<template>
<div class="Header">
    <div>
        <div class="information">
            <div class="userProfilePicture"
                    :style="{ backgroundImage: `url(${this.imageData})` }">
            </div>
            <h3 class="informationTitle"> Information</h3>
            <img class="banniere" src="../assets/Banniere_distribution.png" alt="Bannière">
            <p>Name: {{this.pseudo}}</p>
            <p>E-mail: {{this.email}}</p>
        </div>
        <div class="infoTwo">
            <img class="banniereMin" src="../assets/logo.png" alt="Bannière">
            <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
            plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
            300 il y a 3 ans.
            Il y a 6 mois, la direction a détecté un ralentissement de la productivité. Elle l’a attribué
            assez rapidement à une baisse de la motivation et de l’implication des employés. La direction a réagi et a mis en
            place un comité de pilotage sur le bien-être au travail il y a deux mois. 
            Il est composé d'une dizaine de personnes, regroupant des représentants de la direction et des salariés. Son rôle est 
            de diffuser des questionnaires aux salariés et de restituer les résultats au département des ressources humaines 
            pour envisager des actions pouvant améliorer le bien être des salariés.</p>
        </div>
    </div>
    <div>
        <form @submit.prevent="createPost" class="formCreatePost">
            <div class="userProfilePictureMin"
                 :style="{ backgroundImage: `url(${this.imageData})` }">
            </div>
            <input
                type="text" 
                name="name" required
                class="createPost"
                minlength="4" 
                maxlength="1000" 
                v-model="content"
                :placeholder=" 'What\'s up, ' + this.pseudo"
                @input="lenghtCheck(1000, this.content, 'content')"
            > 
            <div class="btnPosts">
                <div class="inputImages">Select file</div>
                    <input 
                        class="file-input" 
                        type="file" 
                        ref="fileInput"
                        accept="image/jpeg,image/gif,image/png,image/jpg"
                        @change="onSelectedFile"
                    >
            </div>
            <div class="btnSentPost">
                    <button class="btnPost">Create Post</button>
            </div>
        </form>
             <!-- Users Posts -->
        <div class="allPosts" v-if="posts.length">
            <post v-for="post in posts" :key="post.id" :post="post"/>
        </div>
    </div>

    <div class="personnalInfo">
        <div class="sidebar">
              <p class="ads"><fa icon="store"/> Sponsorisé</p>
              <img class="ad" src="../assets/content.jpg">
        </div>
        <div class="feature share">
             <img class="banniereMin" src="../assets/share.jpeg" alt="Bannière">
            <p>Cette espace à été créé pour faciliter l'échange entre collègue n'hésitez pas à commenter entre vous !</p>
        </div>
     </div> 
     
</div>
</template>
<script>
import axios from 'axios';
import { url } from "../main";
import Post from "./Post.vue";

export default {
    name: "_userContent",
    data() {
        return { 
            content:"",
            posts: [],  
            error: "",            
            token:"",
            admin:"",
            currentUserId:"",
            email:"",
            pseudo:"",
            error:"",
            imageData:"",
        }
    },
    mounted:function(){
        this.getPost()
    },
    methods: {
        getPost() {
            const Store = localStorage.getItem("dataUser");
            const data = JSON.parse(Store);
            this.imageData = data.profilePicture;
            this.email = data.email;
            this.currentUserId = data.userId;
            this.pseudo = data.pseudo;
            this.admin = data.admin;
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
                axios.get(url + "post/", 
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => {
                        this.posts = response.data;
                    })
                    .catch(() => {
                        this.error = "Un problème est survenu, veuillez réessayer"; 
                    })    
        },
         createPost() {
            const Store = localStorage.getItem("dataUser");
            const data = JSON.parse(Store);
            this.userId = data.userId;
            this.pseudo = data.pseudo;
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
            const formData = new FormData();
            formData.append("images", this.file);
            formData.append("content", this.content);
            formData.append("user_id", this.userId);
            axios.post(url + "post/" + this.userId, formData,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then((res) => {
                    this.success = "Your information has been changed with success"   
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
        Post
    },
}
</script>

<style scoped>
.link {
    color: #fd2d01;
}
.createPost {
    margin: 5px;
    box-shadow: none;
    border-radius: 30px;
    border: 1.5px solid #eaeae7;
}
.input {
  margin-left: 20px;
  border: none;
  box-shadow: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: auto;
 
}
.input::placeholder { 
   color: black;
   opacity: 1; 
}
form {
    margin-bottom: 0; 
}
.modifyForm {
    background:none;
    box-shadow:none;
    margin:0 auto;
    padding:0;
}
h2 {
    margin-bottom: 0;
    font-size: 35px;
    position: absolute;
    top: 15px;
    left: 100px;
}
.banniere {
    width: 100%;
}
.banniereMin {
    display: block;
    width: 70%;
    margin: 0 auto;
}
input {
    height: 50px;
}
h3 {
   font-size: 16px;
}
.formCreatePost {
    display: grid;
    justify-items: left;
    grid-template-columns: [first] 20% [second] 80%;
    margin: 5px auto;
    width: 100%;
    padding: 20px 40px;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    border-radius: 10px;
    grid-area: content;
    border: 1.5px solid #eaeae7;
    box-shadow: none;
}
.userPost {
    box-shadow: none;
    display: block; 
    text-align: center;
    max-width: 620px;
    margin: 50px auto 0px auto;
    background: white;
    text-align: left;
    padding: 40px 0;
    border-radius: 10px;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    position: relative;
    border: 1.5px solid #eaeae7;
}
.file-input {
    width: 140px;
    height: 35px;
    padding: 10px 30px;
    color: white;
    opacity: 0;
    z-index: 40;
    box-shadow: none;
    border-radius: 20px;
    position: absolute;
    top: 30px;
    left: -20px;
    cursor: pointer;
}
.btnPosts {
    text-align: right;
    position: relative;
}
.btnSentPost {
    justify-self: self-end;
}

.inputImages {
    width: 100px;
    height: 35px;
    font-size: 13px;
    background:#fd2d01;
    border: 0;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;   
    color: white;
    border-radius: 20px;
    z-index: 30;
    position: absolute;
    top:20px;
}
.inputPostImages {
    width: 100px;
    height: 25px;
    font-size: 13px;
    background:#fd2d01;
    opacity: 0;
    text-align: center;
    vertical-align: middle;
    line-height: 25px;   
    border-radius: 20px;
    color: white;
    z-index: 30;
    position: absolute;
    bottom:70px;
    left: 250px;
}
.btnModifyPost {
    background: none;
    border: none;
    position: absolute;
    bottom: 40px;
    right: 15px;
     padding: 0;
}
.btnModifyPost:hover {
    margin-top: 20px;
}
.btnDeletePost {
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0;
}
.btnDeletePost:hover {
    margin-top: 20px;
}
.iconDelete {
    width: 20px;
    cursor: pointer;
    color: black;
}
.iconModify {
    width: 15px;
    cursor: pointer;
    color: black;
}
.postDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.postContent {
    width: 80%;
    margin: 20px auto 0;
}
.modifyContent {
    display: none;
    width: 80%;
    margin: 20px auto;
}
.userPostContent {
    width: 100%;
    margin:20px auto 0;
}
.userPicture {
    width: 50px;
    height: 50px;
    margin-left: 30px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.userProfilePicture {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.userProfilePictureMin {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.info {
 margin: 0 auto;
}
.ad {
    width: 180px;
    margin: 15px 0;
}
.ads {
    color: #fd2d01;
    margin: 0;
}
.Header {
    display: grid;
    grid-template-columns: [first] 20% [second] 60% [third] 20%;
    grid-template-rows: 1fr;
    grid-template-areas: 
    "info infoTwo content content sidebar feature";
    margin:100px 0 20px 0;
}
.personnalInfo {
    display: block;
    text-align: center;
}
.information {
    padding: 40px 0;
    border-radius: 10px;
    margin-left: 20px;
    background: white;
    display: block;
    text-align: center;
    grid-area: info;
    border: 1.5px solid #eaeae7;
}
.infoTwo {
    position: sticky;
    top: 100px;
    padding: 10px 10px;
    border-radius: 10px;
    margin:30px 0 0 20px; 
    background: white;
    display: block;
    text-align: left;
    grid-area: infoTwo;
    border: 1.5px solid #eaeae7;
    font-size: 12px;
}
.sidebar {
    position: sticky;
    top: 70px;
    padding: 40px 0;
    border-radius: 10px;
    background: white;
    margin-right: 20px;
    grid-area: sidebar;
    border: 1.5px solid #eaeae7;
}
.feature {
    position: sticky;
    top: 350px;
    padding: 10px 10px;
    border-radius: 10px;
    background: white;
    margin:30px 20px 0 0; 
    grid-area: feature;
    border: 1.5px solid #eaeae7;
}
.share {
    text-align: left;
    font-size: 12px;
}
.informationTitle, .store{
    color: #fd2d01;
}
@media screen and (max-width: 1024px) {
 .Header {
     grid-template-columns: 1fr;
  }
  .adContainer {
      display: flex;
      flex-direction: column;
  }
  .ad {
  margin: 20px auto ;
  }
}
@keyframes on-page {
    0% {
    -webkit-transform: translateZ(-1400px) translateY(-800px);
            transform: translateZ(-1400px) translateY(-800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}
</style>