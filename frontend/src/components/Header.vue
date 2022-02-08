<template>
 <header>
    <button
        @click="displayMenu()"
        class="iconMenu">
    <fa class="burger" icon="bars"/>
    </button>
    <img class="icon" src="../assets/logo.png" alt="Logo groupomania">
        <nav v-show="!visible" class="menu">
            <ul>
                <li><router-link :to="{ name: 'Forum'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Profile'}">Profile</router-link></li>
                <li class="disconnect" @click="clearStorage">Disconnection</li>
            </ul>
        </nav>
         <nav v-show="visible" class="sideMenu">
            <ul>
                <li><router-link :to="{ name: 'Forum'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Profile'}">Profile</router-link></li>
                <li class="disconnect" @click="clearStorage">Disconnection</li>
            </ul>
        </nav>    
</header>
</template>

<script>
export default {
    data() {
        return {
            visible:false,
        }
    },
    methods: {
        clearStorage() {
            localStorage.clear();
            this.$router.push("/login");
        },
        displayMenu() {
            this.visible ?  this.visible = false : this.visible = true; 
        },
    }
}
</script>
<style scoped>
.menu {
    width: 30%;
}
ul {
    display: flex;
    list-style-type: none;
}
.burger {
    font-size: 15px;
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
    z-index: 100;
    border-bottom: 1.5px solid #eaeae7;;
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
    margin-top: 44px;
    cursor: pointer;
}
.disconnect:hover {
    color: rgba(253, 45, 1, 0.8);
}

header li a:hover {
    color: rgba(253, 45, 1, 0.8);
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
.iconMenu {
    display:none;
    cursor: pointer;
    color: black;
    border: none;
    background: none;
    position: absolute;
    right: 10px;
}
@keyframes header {
  0% {
    transform: translateY(-300px);
  }
  100% {
    transform: translateY(0px);
  }
}
@media screen and (max-width: 600px) {
    .menu {
        display: none;
    }
    router-link {
        color: white;
    }
    ul {
        display: flex;
        border: 1px solid #eaeae7;
        flex-direction: column;
        list-style-type: none;
        position: absolute;
        border-radius: 5px;
        padding: 0;
        top: 30px;
        right: 10px;
        animation: slidein 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        transition: all 0.4s ease-in-out;
        background: rgba(253, 45, 1, 0.3);
        backdrop-filter: blur(3px);
        text-align: center;
    }
    li, header li a {
        color: rgb(255, 255, 255);
        font-size: 15px;
    }
    li, header li a:hover {
        color: rgba(255, 255, 255, 0.3);
    }
    .disconnect {
        font-size: 15px;
         color: rgb(255, 255, 255);
    }
    .iconMenu {
        display: block;
        size: 30px;
        margin-top: 0;
    }
    @keyframes slidein {
        0% {
           transform: translateX(300px)
        }
        100% {
           transform: translateX(0px)
        }
    }
}
</style>
