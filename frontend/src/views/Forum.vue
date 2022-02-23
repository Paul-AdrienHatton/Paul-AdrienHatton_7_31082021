<template>
  <Loader />
  <Header />
  <usersContent />
</template>

<script>
import Header from "../components/Header.vue";
import usersContent from "../components/usersContent.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Forum",
  components: {
    Header,
    usersContent,
    Loader,
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
