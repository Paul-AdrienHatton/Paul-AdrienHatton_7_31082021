<template>
  <p v-if="postId === likes.postId" class="popo">{{ likes.isliked }}</p>
</template>
<script>
export default {
  name: "likes",
  data() {
    return {
      token: "",
      userId: "",
      admin: "",
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData() {
      const data = JSON.parse(localStorage.getItem("UserInfo"));
      this.userId = data.userId;
      this.admin = data.admin;
      const userData = JSON.parse(localStorage.getItem("loggedInUser"));
      this.token = userData.token;
    },
  },
  props: ["likes"],
};
</script>
<style scoped>
.popo {
  color: black;
  border: 1px solid black;
}
</style>