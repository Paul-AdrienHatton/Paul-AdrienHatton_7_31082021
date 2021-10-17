<template>
    <div class="userProfile">
        <h1>Welcome {{user.pseudo}}</h1>
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
        <form @submit.prevent="modifyUser">
            <h3>User info</h3>
            <label for="pseudo">Pseudo</label>
            <input
                  id="pseudo"
                  class="input"
                  v-model="pseudo"
                  placeholder="My pseudo"
                  maxlength="10"
                  @input="lenghtCheck(10, user.pseudo, 'pseudo')"
            >
            <label for="email-adress">Adresse email</label>
            <input
                id="e-mail"
                class="input"
                v-model="email"
                type="email"
                placeholder="My e-mail"
                maxlength="30"
                @input="lenghtCheck(30, user.email, 'email')"
            >
            <label for="password">Mot de passe</label>
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
                <button>Modify user info</button>
            </div>
            <p class="error-message">{{ error }}</p>
            <p class="sucess-message">{{ success }}</p>
        </form>
            <div class="deleteAccount">
                <button 
                    class="btnDelete" 
                    @click="deleteUser()">Delete account
                </button>
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
        }
    },
    mounted:function(){
        this.getUser() 
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
           this.userId = data.userId
                axios.get(url + "user/" + this.userId, 
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => {
                        this.email = response.data.email
                        this.pseudo = response.data.pseudo
                        this.user = response.data
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
    },
    
};
</script>

<style scoped>
h1 {
    margin-top: 0;
    font-size: 30px;
    text-shadow: 3px 3px 3px  rgba(0, 0, 0, 0.1);
}
.container {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
      box-shadow: 6px 6px 12px #d5d5d5,
             -6px -6px 12px #ffffff;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
}
.profil-picture {
    display: flex;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    background: #eeeeee;
    box-shadow:  13px 13px 26px #e9e9e9,
             -13px -13px 26px #ffffff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
}
.file-input {
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: none;
    padding:60px 0 0 10px;
    opacity: 0;
    color: #fd2d01;
}
.input-picture:hover {
    opacity: 1;
}
.userProfile {
    display: block;
    text-align: center;
    max-width: 420px;
    margin: 100px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
}
.modifyUserInfo {
    text-align: center;
    padding-top: 20px;
}
.deleteAccount {
    text-align: center;
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
p {
    font-weight: bold;
}
form {
    margin-top: 20px;
    margin-bottom: 5px;
    box-shadow: inset  1px 1px 2px #e7e7e7,
                -1px -1px 2px #ffffff;
    border: solid 1px rgba(238,238,238, 1);
    padding-top: 5px;
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
    margin: -25px 0 0 0;
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
</style>