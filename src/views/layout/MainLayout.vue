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
import ModalComponents from '@/components/ModalComponents.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "page-layout",
    components: {
        Header,
        SubHeader,
        Footer,
        ModalComponents,
    },
    data() {
        return {
            upModal: false,
        };
    },
    methods: {
        ...mapActions('sessionStore', ["ACT_SESSION_INFO", "ACT_LOGIN_INFO"]),
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        logoutConfirm() {
            this.upModal = true;
            // this.$swal({
            //     // title: "?",
            //     text: "로그아웃 하시겠습니까?",
            //     // icon: "warning",
            //     showCancelButton: true,
            //     cancelButtonText: "취소",
            //     confirmButtonText: "로그아웃",
            //     customClass: {
            //         confirmButton: "btn bg-gradient-success",
            //         cancelButton: "btn bg-gradient-danger",
            //     },
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         this.logout();
            //         //this.$swal.fire("성공", "그룹코드가 등록되었습니다.", "success");
            //     }
            // });

        },
        logout() {
            this.$axios.post(this.$BASE_URL + '/userlogout').then(res => {
                window.localStorage.clear();
                this.ACT_SESSION_INFO({});
                this.ACT_LOGIN_INFO(false);
                this.$router.push('/login');
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
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