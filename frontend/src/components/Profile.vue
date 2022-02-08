<template>
    <div class="container">
        <div class="userProfile">
            <img class="banniereUser" src="../assets/Banniere_distribution.png" alt="Bannière">
            <div class="userInfo">
                <div class="userProfilePicture" :style="{ backgroundImage: `url(${imageData})` }"></div>
                <h1 class="userPseudo">{{user.pseudo}}</h1>
            </div>
            <p>Membre du groupe Groupomania</p>
            <p class="location">Paris, France</p>
            <p>{{user.pseudo}} membre du groupe Groupomania depuis 2017, chargé de la logistique, 
            vous pouvez me contacter pour toute information à l'adresse suivante: <a class="userMail">{{user.email}}</a>.
            <br>Dans le cadre du renouvellement du site et d'une meilleur coopération, n'hésitez pas à m'écrire cordialement
            </p>
            <label class="terms"> 
                <span>
                    <a href="#popup" class="buttonModify"> <fa icon="pen"/></a>
                </span> 
            </label>
        </div>
        <div id="popup" class="overlay">
            <div class="popup">
                <a href="#" class="cross">&times;</a>
                <div class="userProfileInfo">
                    <form class="formModifyUserInfo" @submit.prevent="modifyUser">
                        <h2>Modify user info</h2>
                        <label for="pseudo">Pseudo</label>
                        <input 
                            id="pseudo" class="input" v-model="pseudo"
                            placeholder="My pseudo" maxlength="10"
                            @input="lenghtCheck(20, user.pseudo, 'pseudo')"
                        >
                        <label for="email-adress">E-mail</label>
                        <input 
                            id="e-mail" class="input" v-model="email"
                            type="email" placeholder="My e-mail" maxlength="30"
                            @input="lenghtCheck(30, user.email, 'email')"
                        >
                        <label for="password">Password</label>
                        <input  
                            id="password" class="input" v-model="password"
                            :type="passwordFieldType" placeholder="New password"
                            maxlength="16" @input="lenghtCheck(16, password, 'mot de passe')"
                        >
                        <div class="btnShow">
                            <fa icon="eye" class="visible" type="password" @click="switchVisibility"/>
                        </div>
                        <div>
                        <input 
                            class="inputFile" type="file" ref="fileInput"
                            accept="image/jpeg,image/gif,image/png,image/jpg" @change="onSelectedFile"
                        >
                        </div>
                        <div class="modifyUserInfo">
                            <button>Save changes</button>
                        </div>
                    </form>
                    <div class="deleteAccount">
                        <button 
                            class="btnDelete" 
                            @click="deleteUser()">Delete account
                        </button>
                    </div>
                    <p class="error-message">{{ error }}</p>
                    <p class="sucess-message">{{ success }}</p>
                </div>
            </div>
        </div>
        <div class="sideFeature">
            <img class="connect" src="../assets/connect.jpg" alt="img connect">
            <p>Retrouver tout les posts <router-link class="link" :to="{ name: 'Forum'}">ici, </router-link>n'hésitez pas à partager !</p>
        </div>
         <div class="secondSideFeature">
            <img class="logo" src="../assets/logo_black.svg" alt="logo groupomania">
            <h3>Information</h3>
            <p>Le port du masque au sein de l'entreprise est toujours obligatoire merci de le respecter</p>
        </div>

        <div class="postsContainer">
            <h1 class="userPosts">My Posts</h1>
            <h1>{{message}}</h1>
            <div v-for="userPost in userPosts" :key="userPost">
                <div class="userPost">
                    <div class="userData">
                    <div 
                        class="userPicture" 
                        :style="{ backgroundImage: `url(${userPost.userProfilePicture})` }">
                    </div> 
                    <h1 class="UserName">{{ userPost.user }}</h1>
                    </div>
                    <p class="postCreationDate">{{userPost.creationDate}}</p>
                    <div v-if="userPost.image != null"> 
                        <img class="postPicture" :src="userPost.image" alt="post image">
                    </div>
                    <p class="postContent">{{ userPost.content }}</p>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import axios from 'axios';
import { url } from "../main";
export default {
  name: "Profile",
    data() {
        return {
            message: "",
            isDisplay: false,
            admin: false,
            user:"",
            imageData:"",
            file: "",
            token:"",
            userId:"",
            email:"",
            pseudo:"",
            passwordFieldType: "password",
            pseudoRegex: /^[a-zA-Z0-9]{3,}$/,
            emailRegex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
            error:"",
            success:"",
            userPosts:"",
        }
    },
    mounted:function(){
        this.getUser(),
        this.getUserPost() 
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
           const Store = localStorage.getItem("currentUser");
           const data = JSON.parse(Store);
           this.token = data.token;
           localStorage.setItem('token', JSON.stringify(this.token))
           this.userId = data.userId
                axios.get(url + "user/" + this.userId, 
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => {
                        localStorage.setItem("dataUser", JSON.stringify(response.data))
                        this.email = response.data.email
                        this.pseudo = response.data.pseudo
                        this.user = response.data
                        this.admin = response.data.admin
                        this.imageData = response.data.profilePicture
                    })
                    .catch(() => {
                        this.error = "Un problème est survenu, veuillez réessayer"; 
                    })    
        },
        deleteUser() {
            const deleteConfirm = confirm (
                "Attention, vos données seront supprimées. Cette action est irréversible."
            );
            if (deleteConfirm) {
                axios.delete(url + "user/" + this.userId,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => { 
                        console.log(response);
                        this.success = "Votre compte à bien été supprimé"
                    })
                    .catch(() => { 
                        this.error = "Un problème est survenu, veuillez réessayer"
                    })  
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
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            if (!this.emailRegex.test(this.email)) {
                return (this.error = "Vous devez renseigner une adresse email valide");
            } else if (!this.pseudoRegex.test(this.pseudo)) {
                return (this.error =
                "Votre pseudo doit contenir au moins 3 caractères");
            } else if (this.password) {
                if (!this.passwordRegex.test(this.password)){
                    return (this.error =
                "Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
                }
            }
                axios.put(url + "user/" + this.userId, formData,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then((res) => {
                    console.log(res);
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
            reader.onload = (e) => {
                this.imageData = e.target.result;
            };
            reader.readAsDataURL(files[0]);
            const file = this.$refs.fileInput.files[0];
            this.file = file;
            console.log(this.file);
        },
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        getUserPost() {
                console.log(this.userId);
                axios.get(url + "post/" + this.userId, 
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => {
                        console.log(response.data);
                        this.userPosts = response.data;
                        if (response.data.length  === 0) {
                             this.message = "Pas de post pour le moment"; 
                        }
                    })
                    .catch(() => {
                        this.error = "Un problème est survenu, veuillez réessayer"; 
                    })    
        },
    }, 
};
</script>
<style>
.container {
    display: grid;
    grid-template-columns: [first] 70% [second] 25%;
    margin: 0 30px;
    grid-column-gap: 50px;
}
.userProfile {
    position: relative;
    margin-top: 100px;
    border-radius: 10px;
    outline: 1.5px solid #eaeae7;
    background: white;
    grid-area: 1 / 1 / 3 / 2;
    text-align: left;
}
.banniereUser {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.userProfilePicture {
    width: 100px;
    height: 100px;
    margin :-50px 0 0 20px;
    border: 2.5px solid #eaeae7;
    border-radius: 50%;
    background-position: center;
    background-color: white;
    background-repeat: no-repeat;
    background-size: contain;
}
.userInfo {
    display: flex;
    flex-direction: column;
}
.userPseudo, .userProfile p {
    margin :0px 0 10px 20px;
}
.location {
    font-size: 12px;
    font-style: italic;
    margin-bottom: 50px;
}
.sideFeature {
    border-radius: 10px;
    outline: 1.5px solid #eaeae7;
    background: white;
    margin-top: 100px;
    padding: 30px;
    text-align: left;
    grid-area: 1 / 2 / 2 / 3;
}
.secondSideFeature {
    border-radius: 10px;
    outline: 1.5px solid #eaeae7;
    background: white;
    margin-top: 100px;
    padding: 30px;
    text-align: left;
    grid-area: 2 / 2 / 3 / 3;
}
.userPost {
    box-shadow: none;
    text-align: center;
    max-width: 620px;
    margin: 0 auto 50px auto;
    background: white;
    text-align: left;
    padding: 40px 0 0 0;
    border-radius: 10px;
    border: 1.5px solid #eaeae7;
}
.userData {
    display: flex;
    align-items: center;
}
.userPicture {
    width: 50px;
    height: 50px;
    margin-left: 30px;
    border-radius: 50%;
    border: 1px solid #eaeae7;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.UserName {
    margin-left: 30px;
    border: none;
    font-size: 25px;
    font-family: Arial, Helvetica, sans-serif;
}
.postCreationDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.postPicture {
    position: relative;
    margin: 20px auto 0 auto;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.postContent {
    width: 80%;
    margin: 30px auto 50px auto;
    font-size: 20px;
}
.terms {
    position: absolute;
    bottom: 150px; 
    right: 30px;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  transition: opacity .4s;
  visibility: hidden;
  opacity: 0;
  z-index: 30;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.userProfileInfo {
     display: block;
    text-align: center;
    margin: -30 auto 0 auto;
    background: white;
    text-align: left;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
}
.popup {
    margin: 3rem auto;
    background: #fff;
    border-radius: 5px;
    width: 70%;
    max-height: 500px;
    position: relative;
    transition: all 0.4s ease-in-out;
    z-index: 600;
    overflow: scroll;
    border: 2.5px solid #eaeae7;
}
.popup::-webkit-scrollbar {
    display: none;
}
.popup .cross {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;
  color: #333;
}
.popup .cross:hover {
  color: #fd2d01 ;
}
.error-message{
    text-align: center;
    color: #fd2d01;
}
.formModifyUserInfo {
    width: 70%;
    justify-content: right;
    background: #ffffff;
    text-align: left;
    padding: 30px;
    border-radius: 10px;
    border: none;
    margin: 0 auto;
}
.modifyUserInfo {
    text-align: center;
}
.deleteAccount {
    text-align: center;
    margin: -30px 0 0 5px;
}
.btnDelete {
    background:white;
    border: 1px solid #fd2d01;
    color: #fd2d01;
    margin-top: 20px;
}
.btnDelete:hover {
    background: #fd2d01;
    color: white;
    border: 1px solid white;
}
.inputFile {
   border: none;
   box-shadow: none;
   margin-top: 10px;
}
.link {
    color: #fd2d01;
    font-size: 16px;
}
.logo {
    width: 60%;
}
.connect {
    display: block;
    margin: 0 auto;
    width: 60%;
    text-align: center;
}
.userMail {
    color: blue;
    font-size: 16px;
    font-style: italic;
}
.postsContainer {
    display: grid;
    grid-area: 3 / 1 / 4 / 3; 
}
label {
    margin: 10px 0 10px 0;
}
.userPosts {
    margin: 20px 0 0 0;
}
@media screen and (max-width: 1024px) {
    .container {
        display: grid;
        height: 500px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }
    .userProfile {
        grid-area: 1 / 1 / 2 / 3;
    }
    .sideFeature {
        grid-area: 2 / 1 / 3 / 2;
        margin-top: 0;
    }
    .secondSideFeature {
        grid-area: 2 / 2 / 3 / 3;
        margin-top: 0;
    }
    .postsContainer {
        grid-area: 3 / 1 / 4 / 3;
    }
}
@media screen and (max-width: 900px) {
    .container {
        display: grid;
        height: 500px;
        margin: 0 10px;
        grid-template-columns:1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }
    .userProfile {
        grid-area: 1 / 1 / 2 / 2;
    }
    .sideFeature {
        grid-area: 2 / 1 / 3 / 2;
        margin-top: 0;
    }
    .secondSideFeature {
        grid-area: 3 / 1 / 4 / 2;
        margin-top: 0;
    }
    .postsContainer {
        display: grid;
        grid-area: 4 / 1 / 5 / 2; 
    }
    .connect {
        width: 40%;
        text-align: center;
    }
}
</style>