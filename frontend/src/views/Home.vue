<template>
  <Signup />
</template>

<script>
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Signup,
    Login,
  },
};
</script>
