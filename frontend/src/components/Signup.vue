<template>
  <form>
      <img src="../assets/logo.png" alt="Logo groupomania">
      <router-link class="links" :to="{ name: 'Login'}">Se connecter</router-link>
      <router-view/> 
      <h1>S'inscrire</h1>
      <label>Pseudo</label>
      <input type="pseudo" required v-model="pseudo" placeholder="Enter your pseudo">

      <label>Email:</label>
      <input type="email" required v-model="email" placeholder="Enter your e-mail">

      <label>Password:</label>
      <input type="password" required v-model="password" placeholder="Enter your password">

      <div class="terms">
          <input type="checkbox" v-model="terms" required>
          <label>Accept terms and conditions</label>
      </div>

      <div class="submit">
          <button>Créer un compte</button>
      </div>
      
  </form>
</template>

<script>
import { url } from "../main"; 
export default {
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
</style>