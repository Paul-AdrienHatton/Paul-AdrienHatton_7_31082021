<template>
    <div class="comment">
        <div 
            class="userProfilPictureComment" 
            :style="{ backgroundImage: `url(${comment.profil_picture})` }">
        </div> 
        <div class="commentContent" v-show="switchVisibility">
            <h4>{{comment.user}}</h4>
            <div class="commentText">
                <p>{{comment.content}}</p>
                <p class="creationDate">{{comment.updateDate}}</p>
            </div>
        </div>
        <button 
            v-if="comment.userId === userId"
            class="btnModifyComment" @click="hideAndShow()"><fa class="iconModify" icon="pen"/>
        </button>
        <button v-if="comment.userId === userId" class="btnDeleteComment" @click="deleteComment(comment)">
            <fa class="iconDelete" icon="trash"/>
        </button>
        <form 
            @submit.prevent="modifyComment(comment)" class="modifyForm" v-show="!switchVisibility">
            <input
                type="text" class="userCommentContent" name="name" required minlength="4" 
                maxlength="150" v-model="commentContent" :placeholder="comment.content"
                @input="lenghtCheck(1000, this.commentContent, 'content')"
            >
            <div class="btnComment">
                <div class="inputImages"><fa class="iconFile" icon="image" size="lg"/></div>
                <input 
                    class="file-input" type="file" ref="fileInput"
                    accept="image/jpeg,image/gif,image/png,image/jpg"
                    @change="onSelectedFile"
                >
                <button class="btnSendModifyComment">Modify comment</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import { url } from "../main";

export default {
    name: 'comment',
    data() {
        return { 
            comments:"",
            switchVisibility:true,
            commentContent:"",
            imageData:"",
            token:"",
            userId:"",
        }
    },
    mounted:function(){
        this.getData()
    },
    methods: {
        hideAndShow() {
            this.switchVisibility ?  this.switchVisibility = false : this.switchVisibility = true;    
        },
        getData() {
            const data = JSON.parse(localStorage.getItem("UserInfo"));
            this.userId = data.userId;
            const userData = JSON.parse(localStorage.getItem("loggedInUser"));
            this.token = userData.token;
        },
        modifyComment(comment) {
            const id = comment.id;
            const dataComment = { content: this.commentContent}
            axios.put(url + "comment/" +  id, dataComment,
                {headers: {'Authorization': 'Bearer ' + this.token }})
                    .then((res) => {
                    this.success = "Your information has been changed with success" 
                    this.$router.go();
                    })
                    .catch(() => {
                    this.error = "Un problème est survenu, veuillez réessayer";
                    });
        },
        deleteComment(comment) {
            const id = comment.id; 
            const deleteConfirm = confirm (
                "Attention, votre post sera supprimée. Cette action est irréversible.");
            if (deleteConfirm) {
                axios.delete(url + "comment/" + id,
                {headers: {'Authorization': 'Bearer ' +  this.token }})
                    .then(response => { console.log(response);
                        this.$router.go();
                    })
                    .catch((error) => { console.log(error);})  
            }
        },
        lenghtCheck(length, object, message) {
            if (object.length === length) {
                this.error = "Votre " + message + " est trop long";
            } else {
                this.error = "";
            }
        },
    },
    props: ['comment'],
}
</script>
<style scoped>
.comment {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    position: relative;
}
.commentContent {
    width: 90%;
    position: relative;
    background: #f2f2f2;
    margin: 20px 5px;
    border-radius: 5px;
    border-top-left-radius: 0;
    padding: 10px;
}
.commentContent h4 {
    margin: 0;
}
.userProfilPictureComment {
    width: 40px;
    height: 40px;
    margin-bottom: 50px;
    border-radius: 50%;
    border: 1px solid #eaeae7;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.creationDate {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 8px;
}
.btnModifyComment {
    position: absolute;
    right: 10px;
    top: 25px;
    background: none;
    border: none;
    padding: 0;
}
.btnDeleteComment {
    position: absolute;
    right: 10px;
    bottom: 25px;
    background: none;
    border: none;
    padding: 0;
}
.iconModify, .iconDelete {
    width: 10px;
}
.btnComment {
    display: flex;
    justify-content: right;
}
.modifyForm {
    width: 70%;
    height: 50px;
}
.userCommentContent {
    margin: -10px 0 10px 0 ;
}
.inputImages {
    position: absolute;
    right: 45px;
    top: 32px;
}
</style>