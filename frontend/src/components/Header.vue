<template>
<header>
    <img src="../assets/logo.png" alt="Logo groupomania">
    <nav class="menu">
        <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Mon profil</a></li>
            <li><a href="#">Forum</a></li>
            <li><a href="#">Se deconnecter</a></li>
        </ul>
    </nav>  
</header>
</template>

<script>
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
img {
    position: absolute;
    left: 1px;
    width: 300px;
    height: 80px;
}

header {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    justify-content: right;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

header * {
    display: inline;
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
</style>
