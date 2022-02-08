<template>
<div class="Header">
    <img class="banniere" src="../assets/Banniere_distribution.png" alt="Bannière">  

    <div 
            class="profil-picture" 
            :style="{ backgroundImage: `url(${imageData})` }">
    </div>
<div class="Profile" >
    <h1 class="userPseudo">{{user.pseudo}}</h1>
    <div class="terms">
        <label> 
            <span>
                <a href="#popup" class="buttonModify"> <fa icon="ellipsis-h"/></a>
            </span> 
        </label>
    </div>
    <div id="popup" class="overlay">
        <div class="popup">
            <a href="#" class="cross">&times;</a>
            <input 
                class="file-input" 
                type="file" 
                ref="fileInput"
                accept="image/jpeg,image/gif,image/png,image/jpg" 
                @change="onSelectedFile"
            >
            <div class="userProfile">
                <form @submit.prevent="modifyUser">
                    <h2>Modify user info</h2>
                    <label for="pseudo">Pseudo</label>
                    <input
                        id="pseudo"
                        class="input"
                        v-model="pseudo"
                        placeholder="My pseudo"
                        maxlength="10"
                        @input="lenghtCheck(20, user.pseudo, 'pseudo')"
                    >
                    <label for="email-adress">E-mail</label>
                    <input
                        id="e-mail"
                        class="input"
                        v-model="email"
                        type="email"
                        placeholder="My e-mail"
                        maxlength="30"
                        @input="lenghtCheck(30, user.email, 'email')"
                    >
                    <label for="password">Password</label>
                    <input
                        class="input"
                        id="password"
                        v-model="password"
                        :type="passwordFieldType"
                        placeholder="New password"
                        maxlength="16"
                        @input="lenghtCheck(16, password, 'mot de passe')"
                    >
                    <div class="btnShow">
                        <fa 
                            icon="eye" 
                            class="visible"
                            type="password" 
                            @click="switchVisibility"
                        />
                    </div>
                    <div>
                    <input 
                        class="input fichier" 
                        type="file" 
                        ref="fileInput"
                        accept="image/jpeg,image/gif,image/png,image/jpg"
                        @change="onSelectedFile"
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
    </div>    
</div> 
 <div class="feature">
            <p>Retrouvez tout vos post</p>
            <p><router-link class="link" :to="{ name: 'Profile'}">Mon profil</router-link></p>
 </div>
     
    <h1 class="Title">My Posts</h1>
    <h1>{{message}}</h1>
    <div v-for="userPost in userPosts" :key="userPost">
         <div class="userPost">
            <div class="userData">
            <div 
                class="userPicture" 
                :style="{ backgroundImage: `url(${userPost.userProfilePicture})` }">
            </div> 
            <h1 class="postTitle">{{ userPost.user }}</h1>
            </div>
            <p class="postDate">{{userPost.creationDate}}</p>
            <div v-if="userPost.image != null"> 
                <img class="postPicture" :src= "userPost.image" alt="post image">
            </div>   
            <p class="postContent">{{ userPost.content }}</p>
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

<style scoped>
.feature {
     padding: 10px 10px;
    border-radius: 10px;
    background: white;
    margin:30px 20px 0 0; 
    grid-area: feature;
    border: 1.5px solid #eaeae7;
    font-size: 12px;
}
.Profile {
    display: flex;
    justify-content: space-between;
    margin-top: -140px;
}
h1 {
    font-size: 50px;
}
.Title {
    font-size: 30px;
}
.banniere {
    border-top-left-radius: 10px;
    border-top-right-radius:10px ;
    width: 100%;
}
.profil-picture {
    position: relative;
    top: -100px;
    margin-left: 50px;
    width: 200px;
    height: 200px;
    border: 5px solid white;
    border-radius: 50%;
    background-position: center;
    background-color: white;
    background-repeat: no-repeat;
    background-size: contain;
}
.file-input {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding:60px 0 0 10px;
    opacity: 0;
    position: absolute;
    top: 380px;
    left: 160px;
}
.input-picture:hover {
    opacity: 1;
}
.userProfile {
    display: block;
    text-align: center;
    margin: -30 auto 0 auto;
    background: white;
    text-align: left;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
}
.modifyUserInfo {
    text-align: center;
    padding-top: 20px;
}
.deleteAccount {
    text-align: center;
    margin: 0;
    padding: 0;
}
.btnDelete {
    background:white;
    border: 1px solid #fd2d01;
    color: #fd2d01;
}
.btnDelete:hover {
    background: #fd2d01;
    color: white;
    border: 1px solid white;
    margin-top: 20px;
}
form {
    border: none;
    box-shadow: none;
    margin: 0 auto;
    padding: 5px 0 0 0;
}
label  {
    margin: 20px 0 15px;
}
.sucess-message {
    text-align: center;
    color:rgba(0, 0, 0, 0.3)
}
.visible {
    display: inline-block;
    margin: -25px 0 0 10px;
    width: 15px;
    height: 15px;
    border: none;
    position:absolute;
} 
.btnShow {
    text-align: right;
}
.terms {
    position: relative;
    top: -51px;
    right: 30px;
}
    
.buttonModify {
    border-radius: 5px;
    padding: 8px 15px;
    font-size: 20px;
    color: black;
    text-decoration: none;
    background:#eee ;
}
.buttonModify:hover {
    background:#c6c6c6;
}
.userMail {
    text-align: right;
}
.postDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.userPost {
     box-shadow: none;
    display: block; 
    text-align: center;
    max-width: 620px;
    margin: 50px auto 50px auto;
    background: white;
    text-align: left;
    padding: 40px 0;
    border-radius: 10px;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    position: relative;
    border: 1.5px solid #eaeae7;
}
.userData {
    display: flex;
    align-items: center;
}
.userPseudo {
    font-size: 60px;
    margin-left: 100px;
}
.postPicture {
    position: relative;
    margin: 50px auto 0 auto;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.postTitle {
    margin-left: 30px;
    border: none;
    font-size: 40px;
}
.postContent {
    width: 80%;
    margin: 20px auto;
}
.userPicture {
    width: 50px;
    height: 50px;
    margin-left: 30px;
    border-radius: 50%;
    border: 1px solid  #d5d5d5;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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
.popup {
  margin: 3rem 5rem 0 5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 5px;
  width: 50%;
  max-height: 500px;
  position: relative;
  transition: all 0.4s ease-in-out;
  z-index: 600;
  overflow: scroll;
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
.Header {
    outline:1.5px solid #eaeae7;
    border-radius: 10px;
    margin-left: 20px;
    background: white;
    width: 65%;
    margin:100px 0 20px 0;
}
.fichier {
   border: none;
   box-shadow: none;
   margin-top: 10px;
}
@media screen and (max-width: 600px) {
    .profil-picture {
        width: 100px;
        height: 100px;
    }
    .buttonModify {
        border-radius: 5px;
        padding: 4px 7px;
        font-size: 12px;  
    }
    .userPseudo {
        font-size: 40px;
    }
    .terms {
        margin-top: 30px;
    }
    h1 {
        font-size: 30px;
    }
    .loader__title {
        color: #f70000;
        font-size: 20px;
    }
}
@media screen and (max-width: 1024px) {
    .popup {
        width: 90%; 
    }
}
</style>