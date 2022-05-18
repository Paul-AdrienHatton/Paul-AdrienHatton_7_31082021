<template>
  <div class="comment">
    <div
      class="userProfilPictureComment"
      :style="{ backgroundImage: `url(${comment.profil_picture})` }"
    ></div>
    <div class="commentContent" v-show="switchVisibility">
      <p class="userName">{{ comment.user }}</p>
      <div class="commentText">
        <p>{{ comment.content }}</p>
        <p class="creationDate">{{ comment.updateDate }}</p>
      </div>
    </div>
    <button
      aria-label="BtnModifyComment"
      v-if="comment.userId === userId || this.admin === true"
      class="btnModifyComment"
      @click="hideAndShow()"
    >
      <fa class="iconModify" icon="pen" />
    </button>
    <button
      v-if="comment.userId === userId || this.admin === true"
      class="btnDeleteComment"
      aria-label="BtnDeletedComment"
      @click="deleteComment(comment)"
    >
      <fa class="iconDelete" icon="trash" />
    </button>
    <form
      @submit.prevent="modifyComment(comment)"
      class="modifyForm"
      v-show="!switchVisibility"
    >
      <textarea
        type="text"
        class="userCommentContent"
        name="name"
        required
        minlength="4"
        maxlength="450"
        aria-label="textArea to modify comment"
        v-model="commentContent"
        :placeholder="comment.content"
        @input="lenghtCheck(1000, this.commentContent, 'content')"
      />
      <div class="btnComment">
        <button aria-label="btnSendModifyComment" class="btnSendModifyComment">
          Modifier le commentaire
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { url } from "../main";

export default {
  name: "comment",
  data() {
    return {
      comments: "",
      switchVisibility: true,
      commentContent: "",
      imageData: "",
      token: "",
      userId: "",
      admin: "",
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    hideAndShow() {
      this.switchVisibility
        ? (this.switchVisibility = false)
        : (this.switchVisibility = true);
    },
    getData() {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      this.userId = data.userId;
      this.admin = data.admin;
      const userData = JSON.parse(localStorage.getItem("loggedInUser"));
      this.token = userData.token;
    },
    modifyComment(comment) {
      const id = comment.id;
      const dataComment = { content: this.commentContent };
      axios
        .put(url + "comment/" + id, dataComment, {
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
    deleteComment(comment) {
      const id = comment.id;
      const deleteConfirm = confirm(
        "Attention, votre post sera supprimée. Cette action est irréversible."
      );
      if (deleteConfirm) {
        axios
          .delete(url + "comment/" + id, {
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
    lenghtCheck(length, object, message) {
      if (object.length === length) {
        this.error = "Votre " + message + " est trop long";
      } else {
        this.error = "";
      }
    },
  },
  props: ["comment"],
};
</script>
<style scoped src="../Css/Comment.css">
</style>