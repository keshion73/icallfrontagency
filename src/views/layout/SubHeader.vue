<template>
    <div class="sub-header">
        <ModalComponents @close="upModal = false" v-if="upModal" :icon="'icon02'" :title="'로그아웃'">
            <p slot="mes">정말 로그아웃하시겠습니까?</p>
            <div slot="btn">
                <v-btn x-large @click="upModal = false" class="btntxt">취소</v-btn>
                <v-btn color="btnbg" x-large @click="logout()">확인</v-btn>
            </div>
        </ModalComponents>
        <div class="container d-flex">
            <v-breadcrumbs>
                <v-breadcrumbs-item to="/main" active-class="active-breadcrumb">
                    <img src="@/assets/images/common/icon-home.svg" alt="">
                </v-breadcrumbs-item>
                <li><v-icon color="#399FC7">fa-chevron-right</v-icon></li>
                <v-breadcrumbs-item>
                    {{ $route.meta.groupName }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
            <div class="sub-hd-info d-flex">
                <div class="d-flex">
                    <div class="d-flex">
                        <p class="mark">잔액</p>
                        <p><span class="font-weight-bolder">{{
                            GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount) }} </span>원
                        </p>
                        <!-- <button><img src="@/assets/images/common/icon-re.svg" alt=""
                                style="margin-left: 4px;vertical-align: middle;"></button> -->
                    </div>
                    <button class="logout-btn" v-if="$vuetify.breakpoint.xs">로그아웃</button>
                </div>
                <!-- <div class="d-flex">
                    <p class="mark">잔액</p>
                    <p><span class="font-weight-bolder">{{
                        GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount) }} </span>원</p>
                </div> -->
                <div class="d-flex">
                    <p class="mark">전용계좌</p>
                    <p class="font-weight-bold">{{ GET_SESSION_INFO().userInfo.account_no }}</p>
                    <button><img src="@/assets/images/common/icon-copy.svg" alt=""></button>
                    <p>{{ GET_SESSION_INFO().userInfo.bank_name }}</p>
                </div>
                <div class="d-flex">
                    <p class="mark">USIM</p>
                    <p><span>LG U+</span>0</p>
                    <p><span>SKT</span>0</p>
                    <p><span>KT</span>0</p>
                </div>
                <div class="d-flex">
                    <p class="mark">담당자</p>
                    <p class="font-weight-bold"> {{ GET_SESSION_INFO().userInfo.manager_name }} {{
                        GET_SESSION_INFO().userInfo.phone_number }}</p>
                </div>
                <div class="d-flex">
                    <p class="mark">대리점</p>
                    <p class="font-weight-bold">
                        {{ GET_SESSION_INFO().userInfo.agency_code }} ( {{ GET_SESSION_INFO().userInfo.user_name }} )
                    </p>
                </div>
                <button class="logout-btn" v-if="!$vuetify.breakpoint.xs" @click="logoutConfirm()">로그아웃</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ModalComponents from '@/components/ModalComponents.vue'

export default {
    components: {
        ModalComponents
    },
    mounted() {
    },
    watch: {
    },
    data() {
        return {
            upModal: false,
        }
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
}
</script>