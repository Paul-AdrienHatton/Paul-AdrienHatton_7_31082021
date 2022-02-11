<template>
    <p>{{comment.content}}</p>
    <p>bonjour</p>
</template>
<script>
import axios from 'axios';
import { url } from "../main";

export default {
    name: 'comment',
    data() {
        return { 
           comments:"",
        }
    },
    props: ['comment'],
}
</script>
<style scoped>
.makeCommentBlock {
    display: flex;
    margin: 20px;
}
.writeComment {
    width: 80%;
    margin: 0px auto;
}
.userPictureComment {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #eaeae7;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
</style>