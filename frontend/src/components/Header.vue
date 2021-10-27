<template>
 <header>
    <img class="icon" src="../assets/logo.png" alt="Logo groupomania">
        <nav class="menu">
            <ul>
                <li><router-link :to="{ name: 'Forum'}"><img class="home" src="../assets/home.png" alt=""></router-link></li>
                <li><router-link :to="{ name: 'Profile'}"><img src="../assets/user.png" alt=""></router-link></li>
                <li class="disconnect" @click="clearStorage">Disconnection</li>
            </ul>
        </nav>  
</header>
</template>

<script>
export default {
    methods: {
        clearStorage() {
            localStorage.clear();
            this.$router.push("/login");
        }
    }
}
</script>
<style scoped>
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
    position: fixed;
    background-color: white;
    animation: header 1.1s;
    top: 0;
    left: 0;
    right: 0;
    height: 65px;
    display: flex;
    justify-content: right;
    align-items: center;
    box-shadow: none;
    z-index: 30;
}
header li {
    margin-top: 40px;
}
.router-link-exact-active {
    padding-bottom: 10px;
    border-bottom: none;
}
.disconnect {
    font-size: 12px;
    margin-top: 50px;
}
.disconnect:hover {
    color: rgba(0, 0, 0, 0.3);
}

header li a:hover {
    color: rgba(0, 0, 0, 0.3);
}

header li a {
    color: black;
    text-decoration: none;
}
img {
    width: 30px;
    height: 30px;
}
.home {
    width: 25px;
    height: 25px;
    margin-top: 3px;
} 
@keyframes header {
  0% {
    transform: translateY(-300px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
