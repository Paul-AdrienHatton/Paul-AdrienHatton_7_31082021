<template>
    <img class="banniere" src="../assets/Banniere_distribution.png" alt="Bannière">
    <form @submit.prevent="createPost" class="title">
            <div 
                class="userProfilePicture"
                :style="{ backgroundImage: `url(${this.imageData})` }"
            >
            </div>
            <h2 class="currentUserPicture">{{this.pseudo}}</h2>
            <input
                type="text" 
                id="post" 
                name="name" required
                minlength="4" 
                maxlength="150" 
                v-model="content"
                :placeholder=" 'What\'s up, ' + this.pseudo"
                @input="lenghtCheck(150, this.content, 'content')"
            > 
            <div class="btnPosts">
            <div class="inputImages">Select file</div>
            <input 
                class="file-input" 
                type="file" 
                ref="fileInput"
                accept="image/jpeg,image/gif,image/png,image/jpg"
                @change="onSelectedFile"
            >
            <button class="btnPost">Create Post</button>
            </div>
    </form>
    <div v-for="post in posts" :key="post">
        <div class="userPost">
            <div 
                class="userPicture"
                :style="{ backgroundImage: `url(${post.userProfilePicture})` }"
            >
            </div> 
            <h2>{{ post.user }}</h2>
            <p class="postDate">{{post.creationDate}}</p>
            <button 
                class="btnDeletePost"
                @click="deletePost(post)" 
            >
            <img 
                class="iconDelete" 
                src="../assets/delete.png" 
                alt="delete icon"
            >
            </button>
            <div v-if="post.image != null"> 
                <img class="postPicture" :src= "post.image" alt="post image">
            </div>  
            <p class="postContent">{{ post.content }}</p>
            <button 
                class="btnModifyPost"
                @click="modifyPost(post)" 
            >
            <img 
                class="iconModify" 
                src="../assets/modify.png" 
                alt="modify icon"
            >
            </button>
             <input
                type="text"  
                class="comment"
                name="name" required
                minlength="4" 
                maxlength="150" 
                v-model="comment"
                placeholder="Make a comment"
            > 
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { url } from "../main";

export default {
    name: "Post",
    data() {
        return {
            content:"",
            posts:"",
            comment:"",
            error: "",
            user:"",
            imageData:"",
            file: "",
            token:"",
            userId:"",
            email:"",
            pseudo:"",
            error:"",
        }
    },
     mounted:function(){
        this.getPost() 
    },
    methods: {
        createPost() {
            const Store = localStorage.getItem("dataUser");
            const data = JSON.parse(Store);
            this.userId = data.userId;
            this.pseudo = data.pseudo;
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
            const formData = new FormData();
            formData.append("images", this.file);
            formData.append("content", this.content);
            formData.append("user_id", this.userId);
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            } 
            axios.post(url + "post/" + this.userId, formData,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then((res) => {
                    console.log(res);
                    this.success = "Your information has been changed with success"   
                    this.$router.go();
                    })
                    .catch(() => {
                    this.error = "Un problème est survenu, veuillez réessayer";
                    });
        },
        onSelectedFile(e) {
            const input = this.$refs.fileInput;
            const files = input.files;
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            const file = this.$refs.fileInput.files[0];
            this.file = file;
            console.log(this.file);
        },
         lenghtCheck(length, object, message) {
            if (object.length === length) {
                this.error = "Votre " + message + " est trop long";
            } else {
                this.error = "";
            }
        },
        getPost() {
            const Store = localStorage.getItem("dataUser");
            const data = JSON.parse(Store);
            this.imageData = data.profilePicture;
            console.log(this.imageData);
            this.userId = data.userId;
            this.pseudo = data.pseudo;
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
                axios.get(url + "post/", 
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => {
                        console.log(response.data);
                        this.posts = response.data;
                    })
                    .catch(() => {
                        this.error = "Un problème est survenu, veuillez réessayer"; 
                    })    
        },
        deletePost(post) {
            const id = post.id; 
            console.log(post.id);
            const deleteConfirm = confirm (
                "Attention, votre post sera supprimée. Cette action est irréversible."
            );
            if (deleteConfirm) {
                axios.delete(url + "post/" + id,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => { 
                        console.log(response);
                        this.$router.go();
                    })
                    .catch((error) => { 
                        console.log(error);
                    })  
            }
        },
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 0;
    font-size: 35px;
    position: absolute;
    top: 15px;
    left: 100px;
}
.banniere {
    width: 100%;
}
.currentUserPicture {
    left: 120px;
}

input {
    height: 50px;
}
h3 {
   font-size: 16px;
}
.title {
    margin-top: 10px;
    font-size: 60px;
    max-width: 600px;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.userPost {
    display: block;
    text-align: center;
    max-width: 620px;
    margin: 100px auto;
    background: white;
    text-align: left;
    padding: 40px 0;
    border-radius: 10px;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    border: none;
    box-shadow: 0px 3px 6px #d5d5d5,
             4px -3px 6px #ffffff;
     position: relative;
}
.file-input {
    width: 130px;
    height: 35px;
    padding: 10px 30px;
    color: white;
    opacity: 0;
    z-index: 40;
    box-shadow: none;
    border-radius: 20px;
    position: absolute;
    top: 30px;
}

.btnPosts {
    text-align: right;
    position: relative;
}
.btnPost:hover {
    margin-bottom: -30px;
}
.inputImages {
    width: 130px;
    height: 35px;
    font-size: 13px;
    background:#fd2d01;
    border: 0;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;   
    color: white;
    border-radius: 20px;
    z-index: 30;
    position: absolute;
    top:33px;
}
.postPicture {
    margin-top: 50px;
    max-width: 100%;
    height:100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.deletePost {
    text-align: right;
}
.btnDeletePost {
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
}
.btnModifyPost {
    background: none;
    border: none;
    position: absolute;
    bottom: 115px;
    right: 0;
}
.btnDeletePost:hover {
    margin-top: 20px;
}
.postDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.iconDelete {
    width: 20px;
}
.iconModify {
    width: 20px;
}
.postContent {
    margin: 40px 20px;
}
.comment {
    width: 90%;
    margin: 0 auto;
}
.userPicture {
    width: 50px;
    height: 50px;
    margin-left: 30px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #d5d5d5,
             4px -3px 6px #ffffff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.userProfilePicture {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #d5d5d5,
             4px -3px 6px #ffffff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

@keyframes on-page {
    0% {
    -webkit-transform: translateZ(-1400px) translateY(-800px);
            transform: translateZ(-1400px) translateY(-800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}

</style>