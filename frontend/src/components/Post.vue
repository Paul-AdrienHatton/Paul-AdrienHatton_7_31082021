<template>
  <div class="userPost">
    <div class="userData">
      <div
        class="userPicture"
        :style="{ backgroundImage: `url(${post.userProfilePicture})` }"
        aria-label="photo de profil utilisateur"
      ></div>
      <h1 class="UserName">{{ post.user }}</h1>
      <p class="postCreationDate">Publié le {{ post.creationDate }}</p>
      <button
        v-if="post.userId === userId || this.admin === true"
        class="btnDeletePost"
        @click="deletePost(post)"
        aria-label="Boutton supprimer post"
      >
        <fa class="iconDelete" icon="trash" />
      </button>
    </div>
    <div class="contentBlock">
      <p
        v-if="post.userId === userId || this.admin === true"
        v-show="switchVisibility"
        class="postContent"
        aria-label="post content"
      >
        {{ post.content }}
      </p>
      <p v-else class="postContent">{{ post.content }}</p>
      <button
        v-if="post.userId === userId || this.admin === true"
        class="btnModifyPost"
        aria-label="Boutton modifier post"
        @click="hideAndShow()"
      >
        <fa class="iconModify" icon="pen" />
      </button>
    </div>
    <form
      @submit.prevent="modifyPost(post)"
      v-if="post.userId === userId || this.admin === true"
      class="modifyForm"
      v-show="!switchVisibility"
    >
      <textarea
        type="text"
        class="userPostContent"
        name="name"
        minlength="4"
        maxlength="150"
        aria-label="TextArea to modify post content"
        v-model="postContent"
        :placeholder="post.content"
        @input="lenghtCheck(1000, this.postContent, 'content')"
      />
      <div class="btnPosts">
        <div class="inputImages">
          <fa class="iconFile" icon="image" size="lg" />
        </div>
        <input
          class="file-input"
          type="file"
          ref="fileInput"
          aria-label="input modify post img"
          accept="image/jpeg,image/gif,image/png,image/jpg"
          @change="onSelectedFile"
        />
        <button class="btnSendModifyPost">Modifier le post</button>
      </div>
    </form>
    <div v-if="post.image != null">
      <img
        class="postPicture"
        :src="post.image"
        :alt="post.image + post.user"
        title="post image of {{post.user}}"
      />
    </div>
    <button
      class="btnLikes"
      aria-label="Boutton mettre un like"
      @click="makeLike(post)"
    >
      <fa class="iconLikes" icon="thumbs-up" />
    </button>
    <div v-for="like in likes" :key="like.id" :likes="like">
      <button
        v-if="
          like.postId === post.id &&
          like.userId === this.userId &&
          like.isliked === 1
        "
        aria-label="Boutton mettre un dislike"
        class="btnDislikes"
        @click="desaprouve(post)"
      >
        <fa class="iconDislikes" icon="thumbs-up" />
      </button>
    </div>
    <div class="getComment">
      <button class="btnDisplayCom" v-on:click="hideComments()" :ref="post.id">
        {{ comments.length }} commentaires
      </button>
    </div>
    <p class="likesCount">{{ post.likes }}</p>
    <div
      class="usersComment"
      v-if="comments.length !== 0"
      :key="post.id"
      v-show="!visibility"
    >
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <div class="makeCommentBlock">
      <div
        class="userPictureComment"
        :style="{ backgroundImage: `url(${post.userProfilePicture})` }"
      ></div>
      <textarea
        class="writeComment"
        type="text"
        name="name"
        required
        minlength="4"
        maxlength="1000"
        aria-label="Faire un commentaire"
        v-model="commentContent"
        :placeholder="'Écrivez un commentaire public..'"
        @input="lenghtCheck(1000, this.commentContent, 'commentContent')"
      />
      <button
        @click="makeComment(post)"
        aria-label="Boutton envoyer commentaire"
        class="btnSendComment"
      >
        <fa class="iconSend" icon="paper-plane" role="sendComment" />
      </button>
    </div>
    <div class="infoBulle" v-show="infoBulle">
      <p>Veuillez renseigner ce champ</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { url } from "../main";
import Comment from "./Comment.vue";

export default {
  name: "Post",
  data() {
    return {
      switchVisibility: true,
      visibility: true,
      infoBulle: false,
      likes: [],
      count: "",
      postContent: "",
      posts: "",
      error: "",
      user: "",
      imageData: "",
      postFile: "",
      file: "",
      token: "",
      userId: "",
      email: "",
      pseudo: "",
      error: "",
      comments: [],
      commentContent: "",
      postId: "",
      admin: "",
    };
  },
  props: ["post"],
  mounted: function () {
    this.getData();
    this.getComments();
    this.getLikes();
  },
  methods: {
    getData() {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      this.imageData = data.profilePicture;
      this.email = data.email;
      this.userId = data.userId;
      this.pseudo = data.pseudo;
      this.admin = data.admin;
      const userData = JSON.parse(localStorage.getItem("loggedInUser"));
      this.token = userData.token;
    },
    deletePost(post) {
      const id = post.id;
      const deleteConfirm = confirm(
        "Attention, votre post sera supprimée. Cette action est irréversible."
      );
      if (deleteConfirm) {
        axios
          .delete(url + "post/" + id, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            console.log(response);
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    hideAndShow() {
      this.switchVisibility
        ? (this.switchVisibility = false)
        : (this.switchVisibility = true);
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
      const id = post.id;
      const formData = new FormData();
      formData.append("images", this.file);
      if (this.postContent !== "") {
        formData.append("content", this.postContent);
      } else {
        formData.append("content", post.content);
      }
      axios
        .put(url + "post/user/" + id, formData, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.success = "Your information has been changed with success";
          this.$router.go();
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    getComments() {
      const post = JSON.stringify(this.$refs);
      const dataPost = JSON.parse(post);
      const postInfo = Object.entries(dataPost);
      const postID = postInfo[0];
      const id = postID[0];
      const data = JSON.parse(localStorage.getItem("loggedInUser"));
      this.token = data.token;
      axios
        .get(url + "comment/" + id, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.comments = res.data;
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    makeComment(post) {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      this.token = data.token;
      this.pseudo = data.pseudo;
      this.userId = data.userId;
      const dataComment = {
        content: this.commentContent,
        post_id: post.id,
        user_id: this.userId,
        images: this.imageData,
      };
      const deleteConfirm = this.commentContent !== "";
      if (deleteConfirm === false) {
        this.infoBulle = true;
        setTimeout(() => {
          this.show();
        }, 3000);
      } else {
        axios
          .post(url + "comment/" + this.userId, dataComment, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((res) => {
            this.success = "Your information has been changed with success";
            this.$router.go();
          })
          .catch(() => {
            this.error = "Un problème est survenu, veuillez réessayer";
          });
      }
    },
    getLikes() {
      axios
        .get(url + "likesDislikes/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.likes = res.data;
          const likes = res.data;
          localStorage.setItem("likes", JSON.stringify(res.data));
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    makeLike(post) {
      const dataLikes = { post_id: post.id, user_id: this.userId };
      axios
        .post(url + "likesDislikes/likes/" + this.userId, dataLikes, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.success = "Your information has been changed with success";
          this.$router.go();
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    desaprouve(post) {
      const dataLikes = { post_id: post.id, user_id: this.userId };
      axios
        .post(url + "likesDislikes/dislikes/" + this.userId, dataLikes, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.success = "Your information has been changed with success";
          this.$router.go();
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    show() {
      this.infoBulle = false;
    },
    hideComments() {
      this.visibility ? (this.visibility = false) : (this.visibility = true);
    },
  },
  components: {
    Comment,
  },
};
</script>
<style src="../Css/Post.css">
</style>