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
</style>