<template>
    <img class="banniere" src="../assets/Banniere_distribution.png" alt="Bannière">
    <form @submit.prevent="createPost" class="title">
        <div 
            class="userProfilePicture"
            :style="{ backgroundImage: `url(${this.imageData})` }"
        >
        </div>
        <h2 class="currentUserPicture">
            {{this.pseudo}}
        </h2>
        <input
            type="text" 
            name="name" required
            minlength="4" 
            maxlength="1000" 
            v-model="content"
            :placeholder=" 'What\'s up, ' + this.pseudo"
            @input="lenghtCheck(1000, this.content, 'content')"
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
    <!-- Users Posts -->
    <div 
        v-for="(post, index) in posts" 
        :index="index"
        :key="post" 
        :data-id="post.id">
        <div 
            class="userPost" 
            :value="post.id" >
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
                style="color:red"
                src="../assets/delete.png" 
                alt="delete icon"
            >
            </button>
            <div v-if="post.image != null"> 
                <img class="postPicture" :src= "post.image" alt="post image">
            </div>
            <p 
                v-if="post.userId === userId" 
                v-show="visible"
                class="postContent">{{post.content}}
            </p>
            <p 
                v-else
                class="postContent">{{post.content}}
            </p>
            <input
                v-if="post.userId === userId"
                v-show="!visible"
                type="text"  
                class="comment"
                name="name" required
                minlength="4" 
                maxlength="150" 
                v-model="comment"
                :placeholder="post.content"
            > 
            <div class="btn_post">
            <button 
                v-if="post.userId === userId"
                :index="index"
                class="btnPosts" 
                @click="hideAndShow(post, index)"
                >Modifier</button>
            </div>
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
            index:"",
            activePost: undefined,
            visible:true,
            content:"",
            posts:"",
            comment:"",
            error: "",
            user:"",
            imageData:"",
            postFile:"",
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
            axios.post(url + "post/" + this.userId, formData,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then((res) => {
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
        }, 
        postSelectedFile(e) {
            const input = this.$refs.postFileInput;
            const files = input.files;
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            const file = this.$refs.postFileInput.files[0];
            this.postFile = file;
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
            this.userId = data.userId;
            this.pseudo = data.pseudo;
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
                axios.get(url + "post/", 
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => {
                        this.posts = response.data;
                        console.log(this.posts);
                    })
                    .catch(() => {
                        this.error = "Un problème est survenu, veuillez réessayer"; 
                    })    
        },
        deletePost(post) {
            const id = post.id; 
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
        hideAndShow(post, index) {
        console.log(this.index);
        const postId = post.userId;
            if (this.userId === postId && index === index ) {
                this.visible ?  this.visible = false : this.visible = true; 
            }
        }
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
    box-shadow:  9px 9px 18px #e8e8e8,
             -9px -9px 18px #ffffff;
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

.btnPost {
    text-align: center;
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
.inputPostImages {
    width: 100px;
    height: 25px;
    font-size: 13px;
    background:#fd2d01;
    opacity: 0;
    text-align: center;
    vertical-align: middle;
    line-height: 25px;   
    border-radius: 20px;
    color: white;
    z-index: 30;
    position: absolute;
    bottom:70px;
    left: 250px;
}
.postPicture {
    position: relative;
    margin-top: 50px;
    max-width: 100%;
    height:100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.modifyPost {
    text-align: center;
}
.btnDeletePost {
    background: none;
    border: none;

    position: absolute;
    top: 10px;
    right: 0;
}
.btnDeletePost:hover {
    margin-top: 20px;
    color: rgba(255, 255, 255, 255, 0.4);
}
.postDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.iconDelete {
    width: 20px;
    cursor: pointer;
}
.iconModify {
    width: 15px;
}
.postContent {
    width: 80%;
    margin: 20px auto;
}
.modifyContent {
    display: none;
    width: 80%;
    margin: 20px auto;
}
.comment {
    width: 80%;
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