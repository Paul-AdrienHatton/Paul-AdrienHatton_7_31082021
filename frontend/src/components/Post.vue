<template>
<div class="userPost">
    <div class="userData">
        <div 
            class="userPicture" 
            :style="{ backgroundImage: `url(${post.userProfilePicture})` }">
        </div> 
        <h1 class="UserName">{{post.user }}</h1>
        <button v-if="post.userId === userId" class="btnDeletePost" @click="deletePost(post)">
            <fa class="iconDelete" icon="trash"/>
        </button>
    </div>
    <p 
        class="postCreationDate">{{post.creationDate}}
    </p>
    <div v-if="post.image != null"> 
        <img class="postPicture" :src="post.image" alt="post image">
    </div>
    <div class="contentBlock">
        <p 
            v-if="post.userId === userId" v-show="switchVisibility"
            class="postContent">{{post.content}} 
        </p>
        <p 
            v-else class="postContent">{{post.content}}
        </p>
        <button 
            v-if="post.userId === userId" class="btnModifyPost" @click="hideAndShow(post)"
        ><fa class="iconModify" icon="pen"/>
        </button>
    </div>
    <form @submit.prevent="modifyPost(post)" v-if="post.userId === userId"
        class="modifyForm" v-show="!switchVisibility">
        <input
            type="text" class="userPostContent" name="name" required minlength="4" 
            maxlength="150" v-model="postContent" :placeholder="post.content"
            @input="lenghtCheck(1000, this.postContent, 'content')"
        >
        <div class="btnPosts">
            <div class="inputImages">Select file</div>
            <input 
                class="file-input" type="file" ref="fileInput"
                accept="image/jpeg,image/gif,image/png,image/jpg"
                @change="onSelectedFile"
            >
            <button class="btnSendModifyPost">modifyPost</button>
        </div>
    </form>
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
<style>
.contentBlock {
    position: relative;
    margin: 30px 0 0 0;
}
.userData {
    position: relative;
}
.btnDeletePost {
    background: none;
    border: none;
    position: absolute;
    right: 20px;
    top:-10px;
    padding: 0;
}
.btnModifyPost {
    background: none;
    border: none;
    position: absolute;
    bottom: 0;
    right: -12px;
}
.iconDelete, .iconModify  {
    width: 20px;
    cursor: pointer;
    color: black;
    border: none;
    background: none;
}
.btnDeletePost:hover, .btnModifyPost:hover  {
    border: none;
    background: none;
}
.modifyForm {
    position: relative;
    margin: 20px 20px;
    background: #f2f2f2;
    height: 80px;
}
.userPostContent {
    outline: 1px solid #eaeae7;
    margin-bottom: 40px;
}
.file-input {
    width: 125px;
    height: 38px;
    padding: 8px 3px;
    margin: 0;
    opacity: 0;
    z-index: 40;
    box-shadow: none;
    border-radius: 20px;
    cursor: pointer;
    color: white;
    cursor: pointer;
}
.btnPosts {
    display: flex;
    justify-content: space-between;
}
.btnSendModifyPost {
    margin: 0;
}
.inputImages {
    width: 125px;
    height: 38px;
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
}
</style>