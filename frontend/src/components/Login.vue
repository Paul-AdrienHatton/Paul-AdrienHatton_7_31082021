<template>
    <header>
        <img class="icon" src="../assets/logo.png" alt="Logo groupomania">
        <nav class="menu">
            <ul>
                <li>
                    <router-link :to="{ name: 'Signup'}">Signup</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Login'}">Login</router-link>
                </li>
            </ul>
        </nav>  
    </header>
    <div class="formHome">
        <form class="homeForms" @submit.prevent="handleLogin">
            <h1>Login</h1>
            <router-link class="links" :to="{ name: 'Signup'}">Créer un compte</router-link>
            <router-view/> 
            <label>Email:</label>
            <input  type="email" 
                    required v-model="email" 
                    placeholder="Enter your e-mail"
            >
            <label>Password:</label>
            <input  :type="passwordFieldType"
                    required v-model="password" 
                    placeholder="Enter your password"
            >
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
              <img class="homeBack" src="../assets/home.svg" alt="home background ">
        </div>
</template>

<script>
import axios from 'axios';
import { url } from "../main";

export default {
    name: "Login",
    data() {
        return {
            isDisplay: false,
            passwordFieldType: "password",
            email: '',
            password:'',
            error: "",
            terms: false
        }
    },
    methods: {
        handleLogin() {
            const user = {
                email: this.email,
                password: this.password
            };
        axios.post(url + "user/login", user)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("loggedInUser", JSON.stringify(res.data));
                    this.$router.push("/profile");
                }
            })
            .catch((res) => {
                localStorage.clear();
                if (res.status === 401) {
                    this.error = "Le mot de passe ou l'adresse mail est incorrect, veuillez réessayer";
                } else {
                    this.error = "Le mot de passe ou l'adresse mail est incorrect, veuillez réessayer";
                }
            });
    },
    switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
  },
};
</script>

<style>
.formHome {
    width: 100%;
}
.homeBack {
    position: absolute;
    top: 50px;
    right: 20Px;
    width:60%;
    z-index: -20;
}
ul {
    display: flex;
    list-style-type: none;
}
.icon {
    position: absolute;
    left: 40px;
    width: 200px;
    height: 65px;
}
header {
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 65px;
    display: flex;
    justify-content: right;
    align-items: center;
    box-shadow:none;
}
header li {
    margin: 30px;
}
header li a:hover {
    color: rgba(0, 0, 0, 0.3);
}

header li a {
    color: black;
    text-decoration: none;
}
.router-link-exact-active {
    padding-bottom: 10px;
    border-bottom: 1px solid #fd2d01;
}
form {
    justify-content: right;
    background: #ffffff;
    text-align: left;
    padding: 60px;
    border-radius: 10px;
    border: 1.5px solid #eaeae7;
}
.homeForms {
    width: 40%;
    margin: 100px 50px;
}
label{
    color: #aaa;
    display: inline-block;
    margin: 40px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input {
    display: block;
    padding: 10px 6px;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid#bbbbbb;
    border-radius:30px;
    color: #000;
    background: #ffffff;
}
.checkbox {
    box-shadow: none;
}
input:focus { 
    outline: none !important;
    border: 1px solid #fd2d01;
}
::placeholder {
    color: rgb(214, 212, 212);
}
input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
button {
    background:#fd2d01;
    border: 1px solid transparent;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
}
button:hover {
    background: white;
    color: #fd2d01;
    border: 1px solid #fd2d01;
}
.submit {
    text-align: center;
    margin-top: 40px;
}
a {
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
}
.links {
    display: none;
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
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.popupCondition {
  margin: 6rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 5px;
  width: 45%;
  position: relative;
  transition: all 0.4s ease-in-out;
  overflow: scroll;
}
.popupCondition::-webkit-scrollbar{ 
    display: none; 
}
.popupCondition .cross {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;
  color: #333;
}
.popupCondition .cross:hover {
  color: #fd2d01 ;
}
.error-message{
    text-align: center;
    color: #fd2d01;
}
.termAgreement {
    margin-top: 20px;
}
@media screen and (min-width: 470px) {
    .popupCondition {
    height: 75%;
    margin: 2rem auto;
    padding: 1rem;
    background: #fff;
    border-radius: 5px;
    width: 75%;
    position: relative;
    transition: all 0.4s ease-in-out;
    overflow: scroll;
    }
}
.visible {
    display: inline-block;
    margin: -45px 0 0 5px;
    width: 15px;
    height: 15px;
    border: none;
    position:absolute;
} 
.btnShow {
    text-align: right;
}
@media screen and (max-width: 560px) {
    .icon {
        position: absolute;
        left: 10px;
    }
    .links {
        display: none;
    }
}
@media screen and (max-width: 470px) {
    input[type="checkbox"] {
        position: relative;
        top: 40px;
    }
    ul {
        display: none;
    }
    .links {
    display: flex;
    justify-content: left;
    position: relative;
    top:-10px;
    }
    .popupCondition {
    height: 75%;
    margin: 2rem auto;
    padding: 1rem;
    background: #fff;
    border-radius: 5px;
    width: 75%;
    position: relative;
    transition: all 0.4s ease-in-out;
    overflow: scroll;
    }
}
@media screen and (max-width: 1200px) {
    .popupCondition {
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 5px;
    width: 75%;
    position: relative;
    transition: all 0.4s ease-in-out;
    overflow: scroll;
    }
}
@media screen and (max-width: 768px) {
    .homeForms {
        width: 60%;
        margin: 100px 10px;
    }
    .homeBack {
        position: absolute;
        top: 50px;
        right: 20Px;
        width:100%;
        z-index: -20;
    }
}
</style>