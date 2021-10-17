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
    <main>
        <form @submit.prevent="handleLogin">
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
                <div
                    class="visible"
                    type="password" 
                    @click="switchVisibility">
                </div>
            </div>
            <div class="terms">
                <input  type="checkbox" 
                        v-model="terms" 
                        required
                >
                <label> 
                    <span>
                        <a href="#popup" class="button">Accept terms and conditions to continue</a>
                    </span> 
                </label>
            </div>
            
            <div id="popup" class="overlay">
                <div class="popup">
                    <h2>TERMS AND CONDITIONS</h2>
                    <a href="#" class="cross">&times;</a>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                    laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                    Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                    corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                    animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                    facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae 
                    provident expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Exercitationem fugit laboriosam amet in necessitatibus ipsa assumend
                    corrupti dolorem. Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                    corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                    animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                    facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae
                    provident expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Exercitationem fugit laboriosam amet in necessitatibus ipsa assumenda
                    corrupti dolorem. Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                    corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                    animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                    facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae 
                    expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur
                    elit. Exercitationem fugit laboriosam amet in necessitatibus ipsa assumenda corrupti.
                    Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                    corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                    animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                    facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae 
                    expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Exercitationem fugit laboriosam amet in necessitatibus ipsa 
                    assumenda corrupti dolorem.
                    Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                    corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                    animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                    facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae 
                    expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Exercitationem fugitlaboriosam amet in necessitatibus ipsa assumenda 
                    corrupti dolorem.Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                    corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                    animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                    facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae 
                    provident 
                    expedita alias sint itaque libero nemo!
                    </p>
                    </div>
                </div>

                <div class="submit">
                    <button>Connexion</button>
                </div>
                <p class="error-message">{{ error }}</p>
        </form>
    </main>
    <footer>
        <img class="footer-icon" src="../assets/icon.png" alt="Icone groupomania ">
        <p class="footer-text">groupomania social network © 2021</p>
    </footer>
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
                    localStorage.setItem("currentUser", JSON.stringify(res.data));
                    this.$router.push("/profile");
                }
            })
            .catch(() => {
                localStorage.clear();
                this.error =
                "Nous ne pouvons pas vous connecter. Vérifiez vos identifiants.";
            });
    },
    switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
  },
};
</script>

<style>
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
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
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
    max-width: 420px;
    margin: 100px auto;
    background: #ffffff;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 6px 6px 12px #d5d5d5,
             -6px -6px 12px #ffffff;
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
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
input:focus { 
    outline: none !important;
    border-color: #fd2d01;
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
    border: 0;
    padding: 10px 30px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}
button:hover {
    background: white;
    color: #fd2d01;
    border: 1px solid #fd2d01;
    margin-top: 18px;
}
.submit {
    text-align: center;
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
.popup {
  margin: 6rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 5px;
  width: 45%;
  position: relative;
  transition: all 0.4s ease-in-out;
}
.popup::-webkit-scrollbar{ 
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
footer {
    background-color: white;
    bottom: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.1);
}
.footer-icon {
    width: 30px;
    margin: 15px;
}
.footer-text {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
}
@media screen and (min-width: 470px) {
    .popup {
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
    top: 10px;
    }
    .popup {
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
    .popup {
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 5px;
    width: 75%;
    position: relative;
    transition: all 0.4s ease-in-out;
    }
}
</style>