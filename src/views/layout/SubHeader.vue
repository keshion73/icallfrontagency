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
                    <p><span class="font-weight-bolder">{{ GET_SESSION_INFO().userInfo.deposit_amount }} </span>원</p>
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
                    <p class="font-weight-bold">박준성</p>
                </div>
                <div class="d-flex">
                    <img src="@/assets/images/common/icon-people.svg" alt="">
                    <p class="font-weight-bold">{{ GET_SESSION_INFO().userInfo.user_name }}</p>
                    <button>로그아웃</button>
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

    data() {
        return {
        }
    },
    methods: {
        ...mapActions('sessionStore', ["ACT_SESSION_INFO"]),
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
    },
    watch: {
    },
}
</script>