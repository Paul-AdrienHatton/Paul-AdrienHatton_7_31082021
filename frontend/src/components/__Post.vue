<template>
    <div class="userPost">
                <div 
                    class="userPicture"
                    :style="{ backgroundImage: `url(${post.userProfilePicture})` }"
                >
                </div>
                <h2>{{ post.user }}</h2>
                <p class="postDate">{{post.creationDate}}</p>
                <button 
                    v-if="post.userId === userId" 
                    class="btnDeletePost"
                    @click="deletePost(post)" 
                >
                <fa 
                    class="iconDelete" 
                    icon="trash" 
                />
                </button>
                <div v-if="post.image != null"> 
                    <img class="postPicture" :src="post.image" alt="post image">
                </div>
                <p 
                    v-if="post.userId === userId" 
                    v-show="switchVisibility"
                    class="postContent">{{post.content}}
                </p>
                <p 
                    v-else
                    class="postContent">{{post.content}}
                </p>
                <button 
                  v-if="post.userId === userId"
                    class="btnModifyPost" 
                    @click="hideAndShow(post)"
                >
                    <fa 
                        class="iconModify" 
                        icon="pen" 
                    />
                </button> 
                <form @submit.prevent="modifyPost(post)" 
                    v-if="post.userId === userId"
                    class="modifyForm"
                    v-show="!switchVisibility"
                >
                    <input
                        type="text"  
                        class="userPostContent"
                        name="name" required
                        minlength="4" 
                        maxlength="150"
                        v-model="postContent" 
                        :placeholder="post.content"
                        @input="lenghtCheck(1000, this.postContent, 'content')"
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
                    <button class="btnSendModifyPost">modifyPost</button>
                    </div>
                </form>
    <div>
        
    <form class="title">
        <div class="userProfilePicture"
                 :style="{ backgroundImage: `url(${this.imageData})` }">
        </div>
        <input
            class="writeComment"
            type="text" 
            name="name" required
            minlength="4" 
            maxlength="1000" 
            v-model="commentContent"
            :placeholder=" 'Écrivez un commentaire public..'"
            @input="lenghtCheck(1000, this.commentContent, 'commentContent')"
        > 
        <button class="btnComment" @click="makeComment(post)"> comment </button>
    </form>
    </div>
</div>
            
</template>

<script>
import axios from 'axios';
import { url } from "../main";
export default {
    name: 'post',
    data() {
        return { 
            switchVisibility:true,
            visible:true,
            postContent:"",
            posts:"",  
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
            comments:"",
            commentContent:"",
        }
    },
    props: ['post'],
    mounted:function(){
        this.getData()
    },
    computed: {
        createdDate() {
         return this.post.creationDate;
        },
    },
    methods: {
          getData() {
            const Store = localStorage.getItem("dataUser");
            const data = JSON.parse(Store);
            this.imageData = data.profilePicture;
            this.email = data.email;
            this.userId = data.userId;
            this.pseudo = data.pseudo;
            this.admin = data.admin;
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
          },

         deletePost(post) {
            const id = post.id; 
            const deleteConfirm = confirm (
                "Attention, votre post sera supprimée. Cette action est irréversible.");
            if (deleteConfirm) {
                axios.delete(url + "post/" + id,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => { console.log(response);
                        this.$router.go();
                    })
                    .catch((error) => { console.log(error);})  
            }
        },
        hideAndShow(post) {
            this.switchVisibility ?  this.switchVisibility = false : this.switchVisibility = true;    
        },
        onSelectedFile(e) {
            const input = this.$refs.fileInput;
            const files = input.files;
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            const file = this.$refs.fileInput.files[0];
            this.file = file;
        }, 
        lenghtCheck(length, object, message) {
            if (object.length === length) {
                this.error = "Votre " + message + " est trop long";
            } else {
                this.error = "";
            }
        },
        modifyPost(post) {
            const Store = localStorage.getItem("dataUser");
            const data = JSON.parse(Store);
            this.userId = data.userId;
            this.pseudo = data.pseudo;
            const id = post.id;
            console.log(this.userId);
            console.log(id);
            console.log(this.pseudo);
            console.log(this.postContent);
            console.log(this.file);
            const dataToken = localStorage.getItem("token");
            this.token = JSON.parse(dataToken);
            console.log(this.token);
            const formData = new FormData();
            formData.append("images", this.file);
            formData.append("content", this.postContent);
            axios.put(url + "post/user/" + id, formData,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then((res) => {
                    this.success = "Your information has been changed with success"   
                     this.$router.go();
                    })
                    .catch(() => {
                    this.error = "Un problème est survenu, veuillez réessayer";
                    });
        },
    },
};
</script>
<style scoped>
.title {
    display: grid;
    grid-template-columns: 10% 60% 30%;
    grid-gap: 20px;
    margin: 40px 10px 0 10px;
    background: none;
    padding: 40px;
}
.btnComment {
    width: 120px;
    margin: 5px;
    height: 40px;
}
.userPostImage {
    position: relative;
    margin-top: 50px;
    max-width: 100%;
    margin: 0 auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;width: 80%;
    height:500px;
}
.userId {
    color: red;
}
.postId{
    color: blue;
}
.btnModifyPost {
    background: none;
    border: none;
    position: absolute;
    bottom: 170px;
    right: 15px;
     padding: 0;
}
.btnModifyPost:hover {
    margin-top: 20px;
}
.input {
    margin-left: 20px;
  border: none;
  box-shadow: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: auto;
 
}
.input::placeholder { 
   color: black;
  opacity: 1; 
}
form {
    margin-bottom: 0; 
}
.modifyForm {
    background:none;
    box-shadow:none;
    margin:0 auto;
    padding:0;
}
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
input {
    height: 50px;
}
h3 {
   font-size: 16px;
}
.title {
    margin-top: 5px;
    font-size: 60px;
    max-width: 600px;
    box-shadow: none;
    animation: on-page 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.file-input {
    width: 140px;
    height: 35px;
    padding: 10px 30px;
    color: white;
    opacity: 0;
    z-index: 40;
    box-shadow: none;
    border-radius: 20px;
    position: absolute;
    top: 30px;
    left: -20px;
    cursor: pointer;
}
.btnPosts {
    text-align: right;
    position: relative;
    
}
.inputImages {
    width: 100px;
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
    top:20px;
}
.btnSendModifyPost {
    text-align: right;
}
.btnSendModifyPicturePost {
    text-align: left;
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
    margin: 50px auto 0 auto;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.btnDeletePost {
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0;
}
.btnDeletePost:hover {
    margin-top: 20px;
}
.iconDelete {
    width: 20px;
    cursor: pointer;
    color: black;
}
.iconModify {
    width: 60px;
    cursor: pointer;
    color: black;
}
.postDate {
    font-size: 14px;
    margin: 20px 0 0 25px;
}
.postContent {
    width: 80%;
    margin: 20px auto 0;
}
.modifyContent {
    display: none;
    width: 80%;
    margin: 20px auto;
}
.userPostContent {
    width: 100%;
    margin:20px auto 0;
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
    width: 40px;
    height: 40px;
    margin: 10px 0 0 0;
    border-radius: 50%;
    box-shadow: 0px 3px 6px #d5d5d5,
             4px -3px 6px #ffffff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.ad {
    width: 180px;
    margin: 15px 0;
}
.ads {
    border-bottom: 1px solid #eee;
    margin: 30px;
    padding-bottom: 30px;
}
.Header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: [first] 20% [second] 60% [third] 20%;
    margin-bottom: 40px;
}
.writeComment {
    border-radius: 20px;
}
@media screen and (max-width: 1024px) {
 .Header {
     grid-template-columns: 1fr;
  }
  .adContainer {
      display: flex;
      flex-direction: column;
  }
  .ad {
  margin: 20px auto ;
  }
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