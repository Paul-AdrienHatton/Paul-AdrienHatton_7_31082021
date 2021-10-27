<template>
 <div class="loader">
        <div class="loader__title">Welcome {{user.pseudo}}</div>
        <div class="loader__dotbox">
          <div class="loader__dot loader__dot--1"></div>
          <div class="loader__dot loader__dot--2"></div>
          <div class="loader__dot loader__dot--3"></div>
        </div>
    </div>
    <div class="userProfile">
        <div 
            class="profil-picture" 
            :style="{ backgroundImage: `url(${imageData})` }">
        </div>  
        <input 
            class="file-input" 
            type="file" 
            ref="fileInput"
            accept="image/jpeg,image/gif,image/png,image/jpg" 
            @change="onSelectedFile"
        >
        <h1>{{user.pseudo}}</h1>
        <form @submit.prevent="modifyUser">
            <h2>Modify user info</h2>
            <label for="pseudo">Pseudo</label>
            <input
                  id="pseudo"
                  class="input"
                  v-model="pseudo"
                  placeholder="My pseudo"
                  maxlength="10"
                  @input="lenghtCheck(10, user.pseudo, 'pseudo')"
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
                <div
                    class="visible"
                    type="password" 
                    @click="switchVisibility">
                </div>
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
    <div v-for="userPost in userPosts" :key="userPost">
         <div class="userPost">
             <div 
                class="userPicture" 
                :style="{ backgroundImage: `url(${userPost.userProfilePicture})` }">
            </div> 
            <h1 class="postTitle">{{ userPost.user }}</h1>
            <p class="postDate">{{userPost.creationDate}}</p>
            <div 
                class="postPicture" 
                :style="{ backgroundImage: `url(${userPost.image})` }">
            </div>  
            <p class="postContent">{{ userPost.content }}</p>
             <input
                type="text" 
                id="post" 
                class="comment"
                name="name" required
                minlength="4" 
                maxlength="150" 
                v-model="comment"
                placeholder="Make a comment"
            > 
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
            formData.append("password", this.password);
            formData.append("admin", this.admin);
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
                        console.log(response);
                        this.userPosts = response.data;
                    })
                    .catch(() => {
                        this.error = "Un problème est survenu, veuillez réessayer"; 
                    })    
        },
    }, 
};
</script>

<style scoped>

h1 {
    margin:0;
    padding: 0 0 12px 0 ;
    text-align:center;
    font-size: 35px;
    text-shadow: 3px 3px 3px  rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #d5d5d5;
}
.container {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border: none;
}
.profil-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: inset  1px 1px 2px #e7e7e7,
                -1px -1px 2px #ffffff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    top: 30px;
}
.file-input {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding:60px 0 0 10px;
    opacity: 0;
    position: absolute;
    top:150px;
}
.input-picture:hover {
    opacity: 1;
}
.userProfile {
    display: block;
    text-align: center;
    max-width: 620px;
    margin: 100px auto;
    background: white;
    text-align: left;
    padding: 20px 40px;
    border-radius: 20px;
    border: none;
    box-shadow: 3px 3px 6px #d5d5d5,
             -3px -3px 6px #ffffff;
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
    margin-top: 20px;
    margin-bottom: 0px;
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
    color: #eee;
    background: url("../assets/visible.png");
    width: 15px;
    height: 15px;
    border: none;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position:absolute;
} 
.btnShow {
    text-align: right;
}
.userMail {
    text-align: right;
}
.loader {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  animation: loader 0.5s;
  animation-delay: 1.6s;
  animation-fill-mode: both;
  z-index: 60;
  display:flex;
  align-items:center;
  justify-content:center;
}
.loader__title {
    color: #f70000;
    font-size: 40px;
    padding-right: 20px;
}
.loader__dot {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    animation: jump 4s;
    animation-iteration-count: 1;
}
.loader__dotbox {
    display: flex;
    justify-content: space-between;
    width: 80px;
}
.loader__dot--1 {
    background-color:#fd2d01;
}
.loader__dot--2 {
    background-color: #fd6140;
    animation-delay: 0.25s;
}
.loader__dot--3 {
    background-color: #FE9680;
    animation-delay: 0.5s;
}
@keyframes jump {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(10px);
  }
  25% {
    transform: translateY(-10px);
  }
  30% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
  70% {
    transform: translateY(10px);
  }
  90% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes loader {
  100% {
    opacity: 0;
    z-index: -10;
  }
} 
.postDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.userPost {
    display: block;
    text-align: center;
    max-width: 620px;
    margin: 100px auto;
    background: white;
    text-align: left;
    padding: 40px 0;
    border-radius: 10px;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    border: none;
    box-shadow: 3px 3px 6px #d5d5d5,
             -3px -3px 6px #ffffff;
     position: relative;
}
.postPicture {
    margin-top: 50px;
    max-width: 100%;
    height: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size:  cover;
}
.postTitle {
    margin-bottom: 0;
    border: none;
    font-size: 40px;
    position: absolute;
    top: 45px;
    left: 100px;
}
.postContent {
    margin: 40px 20px;
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
.comment {
    width: 90%;
    margin: 0 auto;
}

</style>