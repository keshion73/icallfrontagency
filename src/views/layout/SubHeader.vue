<template>
    <div class="sub-header">
        <div class="container d-flex">
            <v-breadcrumbs>
                <v-breadcrumbs-item to="/dashboard" active-class="active-breadcrumb">
                    <img src="@/assets/images/common/icon-home.svg" alt="">
                </v-breadcrumbs-item>
                <li><v-icon color="#399FC7">fa-chevron-right</v-icon></li>
                <v-breadcrumbs-item>
                    {{ $route.meta.groupName }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
            <div class="sub-hd-info d-flex">
                <div class="d-flex">
                    <p class="mark">잔액</p>
                    <p><span class="font-weight-bolder">{{
                        GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount) }} </span>원</p>
                </div>
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
                    <p class="font-weight-bold"> {{ GET_SESSION_INFO().userInfo.manager_name }}</p>
                </div>
                <div class="d-flex">
                    <div>
                        <img src="@/assets/images/common/icon-people.svg" alt="">
                        <p class="font-weight-bold" style="display: inline-block;">{{ GET_SESSION_INFO().userInfo.user_name
                        }}</p>
                    </div>
                    <button @click="logoutConfirm">로그아웃</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        // Lnb,
        // AppBar
    },
    mounted() {
    },
    watch: {
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions('sessionStore', ["ACT_SESSION_INFO", "ACT_LOGIN_INFO"]),
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        logoutConfirm() {
            this.$swal({
                // title: "?",
                text: "로그아웃 하시겠습니까?",
                // icon: "warning",
                showCancelButton: true,
                cancelButtonText: "취소",
                confirmButtonText: "로그아웃",
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    this.logout();
                    //this.$swal.fire("성공", "그룹코드가 등록되었습니다.", "success");
                }
            });

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