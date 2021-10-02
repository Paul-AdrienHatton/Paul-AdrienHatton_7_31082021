<template>
  <form>
      <img src="../assets/logo.png" alt="Logo groupomania">
      <router-link class="links" :to="{ name: 'Signup'}">Créer un compte</router-link>
      <router-view/> 
      <h1>Se connecter</h1>
      <label>Email:</label>
      <input type="email" required v-model="email" placeholder="Enter your e-mail">

      <label>Password:</label>
      <input type="password" required v-model="password" placeholder="Enter your password">

      <div class="terms">
          <input type="checkbox" v-model="terms" required>
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
            <button @click="login">Connection</button>
        </div>
      
  </form>
</template>

<script>
import { url } from "../main";

export default {
    name: "Login",
    data() {
        return {
            email: '',
            password:'',
            pseudo:'',
            terms: false
        }
    },
    methods: {
    }
}
</script>

<style>
h1 {
    margin-top: 40px;
}
img {
    position: absolute;
    top: 5px;
    left: 130px;
    width: 220px;
    padding-bottom: 60px;
}
form {
    position: relative;
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
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
    padding: 10px 20px;
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
    display: flex;
    justify-content: right;
    position: relative;
    top: 70px;
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
@media screen and (min-width: 500px) {
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
@media screen and (max-width: 560px) {
    img {
    position: absolute;
    left: 10px;
    }
    .links {
    display: flex;
    justify-content: left;
    position: relative;
    top: 100px;
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