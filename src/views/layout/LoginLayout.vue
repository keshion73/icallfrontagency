<template>
  <v-container fluid class="login-wrap">
    <router-view></router-view>
  </v-container>
</template>
<script>
// import AppBarBlurAuth from "@/components/AppBarBlurAuth";
import { FadeTransition } from "vue2-transitions";

export default {
  name: "page-layout",
  components: {
    // AppBarBlurAuth,
    FadeTransition,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  background: #F8FAFC;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>