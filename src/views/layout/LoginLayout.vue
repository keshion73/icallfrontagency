<template>
  <v-app class="bg-white">
    <!-- <v-container class="position-sticky top-0 z-index-2 py-0">
      <v-row>
        <v-col cols="12" class="py-0">
          <app-bar-blur-auth> </app-bar-blur-auth>
        </v-col>
      </v-row>
    </v-container> -->
    <v-main class="auth-pages">
      <div class="header-auth position-relative border-radius-xl min-vh-100">
        <v-container class="py-0">
          <v-row>
            <v-col cols="6">
              <div class="
                                                                                              position-relative
                                                                                              h-100
                                                                                              ma-5
                                                                                              px-7
                                                                                              border-radius-lg
                                                                                              d-flex
                                                                                              flex-column
                                                                                              justify-content-center
                                                                                            "
                :style="`background-image: url(${require('@/assets/img/login_image_01.png')}); background-size: cover;`">
              </div>
            </v-col>
            <v-col lg="4" md="7" class="d-flex flex-column">
              <fade-transition :duration="200" origin="center top" mode="out-in">
                <!-- your content here -->
                <router-view></router-view>
              </fade-transition>
            </v-col>
          </v-row>
        </v-container>
        <v-row>
          <v-col cols="6"></v-col>
          <v-col cols="6">
            <v-row class="ml-0">
              <label class="font-weight-bold mt-5">* 허가되지 않는 접근은 법적 책임을 질 수
                있습니다.</label>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
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

<!-- <template>
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

<style lang="scss">
  @import '~@/assets/scss/page/login/login.scss';
</style> -->