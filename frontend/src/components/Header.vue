<template>
 <header>
    <img class="icon" src="../assets/logo.png" alt="Logo groupomania">
        <nav class="menu">
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
.router-link-exact-active {
    padding-bottom: 10px;
    border-bottom: 1px solid #fd2d01;
}
.disconnect {
    font-size: 12px;
    margin-top: 34px;
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
</style>
