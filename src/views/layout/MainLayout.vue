<template>
    <v-app>
        <Header></Header>
        <SubHeader v-if="!$vuetify.breakpoint.xs"></SubHeader>
        <v-container fluid class="main-wrap">
            <router-view></router-view>
        </v-container>
        <Footer></Footer>
    </v-app>
</template>
<script>
import Header from './Header.vue';
import SubHeader from './SubHeader.vue';
import Footer from './Footer.vue';
// import AppBarBlurAuth from "@/components/AppBarBlurAuth";
import { FadeTransition } from "vue2-transitions";

export default {
    name: "page-layout",
    components: {
        Header,
        SubHeader,
        Footer
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
main::v-deep {
    .v-main__wrap {
        min-height: 100%;
        padding-bottom: 40px;
    }
}
</style>