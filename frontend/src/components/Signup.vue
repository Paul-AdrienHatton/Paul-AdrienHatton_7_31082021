<template>
    <header>
        <img class="icon" src="../assets/logo.png" alt="Logo groupomania">
        <nav class="menu">
            <ul>
                <li>
                    <router-link :to="{ name: 'Signup'}">
                        Signup
                    </router-link>
                </li>
                <li><router-link :to="{ name: 'Login'}">Login</router-link></li>
            </ul>
        </nav>  
    </header>
    <form class="homeForms" @submit.prevent="handleSubmit">
        <h1>Create an account</h1>
        <router-link class="links" :to="{ name: 'Login'}">Se connecter</router-link>
        <router-view/> 
        <label>Pseudo</label>
        <input  type="pseudo"  
                @input="lenghtCheck(10, pseudo, 'pseudo')" 
                required 
                v-model="pseudo" 
                placeholder="Enter your pseudo"
        >

        <label>Email:</label>
        <input  type="email"
                @input="lenghtCheck(30, email, 'email')" 
                required 
                v-model="email"
                placeholder="Enter your e-mail"
        >

        <label>Password:</label>
        <input  @input="lenghtCheck(16, password, 'mot de passe')" 
                required 
                v-model="password" 
                :type="passwordFieldType"
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
        <div class="termAgreement">
            <input type="checkbox" class="checkbox" v-model="terms" required>
                <label> 
                    <span>
                        <a href="#popup" class="button">Accept terms and conditions to continue</a>
                    </span> 
                </label>
        </div>
        
        <div id="popup" class="overlay">
            <div class="popupCondition">
                <h2>TERMS AND CONDITIONS</h2>
                <a href="#" class="cross">&times;</a>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae provident 
                expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae provident 
                expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae provident 
                expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae provident 
                expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae provident 
                expedita alias sint itaque libero nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit 
                laboriosam amet in necessitatibus ipsa assumenda corrupti dolorem.
                Modi voluptate delectus, nihil iure ipsum aperiam eveniet, esse sint, 
                corrupti porro exercitationem tempora? Quidem iure, sapiente similique aspernatur 
                animi dolorum illo expedita officia in, a non? Ratione autem, ducimus iusto non quo, 
                facere unde, enim et deserunt dolorum assumenda natus cum magnam labore vero quae provident 
                expedita alias sint itaque libero nemo!
                </p>
                </div>
            </div>

            <div class="submit">
                <button>Submit</button>
            </div>
            <p class="error-message">{{ error }}</p>
    </form>
     <div>
              <img class="homeBack" src="../assets/home.svg" alt="home background ">
        </div>
</template>

<script> 
import axios from 'axios';
import { url } from "../main";

export default {
    data() {
        return {
            isDisplay: false,
            passwordFieldType: "password",
            pseudo:'',
            email: '',
            password:'',
            error: "",
            pseudoRegex: /^[a-zA-Z0-9]{3,}$/,
            emailRegex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
            terms: false
        }
    },
    methods: {
        lenghtCheck(length, object, message) {
            if (object.length === length) {
                this.error = "Votre " + message + " est trop long";
            } else {
                this.error = "";
            }
        },
        handleSubmit(){
            const newUser = {
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
                profil_picture: url.substring(0, url.length - 4) + "images/avatar.png",
            };
            if (!this.emailRegex.test(this.email)) {
                return (this.error = "Vous devez renseigner une adresse email valide");
            } else if (!this.pseudoRegex.test(this.pseudo)) {
                return (this.error = "Votre pseudo doit contenir au moins 3 caractères");
            } else if (!this.passwordRegex.test(this.password)) {
                return (this.error =
                "Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre");
            }
            axios.post(url + "user/", newUser)
            .then((res) => {
            if (res.status === 200) {
                axios.post(url + "user/login", newUser) 
                .then((res) => {
                    if (res.status === 200) {
                    localStorage.setItem("loggedInUser", JSON.stringify(res.data));
                    this.$router.push("/login")
                    }
                })
                .catch(() => {
                    localStorage.clear();
                    this.error = "Un problème est survenu, veuillez réessayer";
                });
            }
            })
            .catch((res) => {
                if (res.status === 500) {
                    this.error = "L'adresse e-mail est déjà utilisé, veuillez réessayer";
                } else {
                    this.error = "Un problème est survenu, veuillez réessayer";
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
</style>