<template>
  <Loader />
  <Header />
  <UsersContent />
</template>

<script>
import Header from "../components/Header.vue";
import UsersContent from "../components/UsersContent.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Forum",
  components: {
    Loader,
    Header,
    UsersContent,
  },
};
</script>

<style>
body {
  background: #f3f2ef;
  margin: 0;
  padding: 0;
}
</style>
