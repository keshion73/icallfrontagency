<template>
    <div class="login-wrap">
        <LoadingComponents :loading="loading" :msg="msg">
        </LoadingComponents>
        <ModalComponents :icon="iconName" :title="modalTitle" v-if="upModal">
            <p slot="mes" v-html="msgHtml"></p>
            <div slot="btn">
                <v-btn color="btncolor" x-large @click.prevent="modalConfirm">확인</v-btn>
            </div>
        </ModalComponents>
        <div class="login-cont">
            <div class="d-flex">
                <div class="loginimg" v-if="!$vuetify.breakpoint.xs">
                    <img src="@/assets/images/page/login/loginimg.png" alt="">
                </div>
                <div class="loginform">
                    <div class="d-flex">
                        <p class="loginlogo"><img src="@/assets/images/icalllogo.svg" alt=""><span>대리점</span></p>
                        <form action="">
                            <v-text-field ref="refUserId" label="ID" placeholder="아이디" outlined v-model="user_id"
                                :rules="[rules.inputUserId.required, rules.inputUserId.length, rules.inputUserId.charValid]"></v-text-field>
                            <v-text-field ref="refUserPassword" label="Password" placeholder="비밀번호" outlined type="password"
                                v-model="user_password"
                                :rules="[rules.inputUserPassword.required, rules.inputUserPassword.length, rules.inputUserPassword.charValid]"></v-text-field>
                            <v-btn color="btncolor" x-large block :disabled="loginDisabled" @click="userLogin()">로그인</v-btn>
                            <!-- <v-btn :disabled="loginDisabled" @click="userLogin()" flat color="primary" x-large block>로그인</v-btn> -->
                            <div class="input-chk">
                                <input type="checkbox" id="login_save" v-model="saveId">
                                <label for="login_save">아이디 저장</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="login-ft" v-if="$vuetify.breakpoint.xs">
                <p>㈜아이콜모바일(선유도지점) 사업자번호 : 226-23-91761 | 통신판매신고 : 2023-서울당산-605호 | 대표이사 : 박준성, 서울특별시 영등포구 양평동5가 양평로22길 21,
                    선유도코오롱디지털타워 605호</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import LoadingComponents from '@/components/LoadingComponents.vue'
import ModalComponents from '../../components/ModalComponents.vue'

export default {
    name: "login",
    components: {
        LoadingComponents,
        ModalComponents
    },
    computed: {
        loginDisabled() {
            if (((this.user_id == "" || this.user_id == null)
                || (this.user_password == "" || this.user_password == null))) {
                if (this.$refs.refUserId == undefined || this.$refs.refUserPassword == undefined) {
                    return true;
                } else {
                    return true;
                }
            } else {
                if (this.$refs.refUserId.valid == false || this.$refs.refUserPassword.valid == false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    },
    mounted() {
        window.addEventListener('keyup', this.keyPress);
        this.user_id = this.getCookie("icallmobile");

        if (this.user_id == "" || this.user_id == null) {
            this.saveId = false;
        } else {
            this.saveId = true;
        }

    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.keyPress);
    },
    data() {
        return {
            upModal: false,
            iconName: "icon03",
            modalTitle: "로그인 실패",
            loading: false,
            msg: "로그인 중입니다.",
            req: { user_id: "", user_password: "" },
            res: {},
            user_id: "",
            user_password: "",
            loginInfo: {
                userInfo: {}
            },
            saveId: false,
            rules: {
                inputUserId: {
                    required: value => !!value || 'ID를 입력하세요.',
                    length: value => !(value && value.length > 20) || 'ID는 20자 이상 입력할 수 없습니다.',
                    charValid: value => /^[a-zA-Z0-9]*$/.test(value) || '영문 및 숫자만 입력 가능합니다.'
                },
                inputUserPassword: {
                    required: value => !!value || '비밀번호를 입력하세요.',
                    length: value => !(value && value.length > 20) || '비밀번호는 20자 이상 입력할 수 없습니다.',
                    charValid: value => !(/[\{\}\[\]\/?.,;:|\)~`\_<>\&\\(\'\"]/g.test(value)) || '입력할 수 없는 문자열입니다. (가능문자 : !^-+@#$%=*)'
                }
            }
        }
    },
    methods: {
        ...mapActions('sessionStore', ["ACT_SESSION_INFO", "ACT_LOGIN_INFO"]),
        keyPress(event) {
            //const swalPopup = document.getElementsByClassName("swal2-confirm");
            // if (this.upModal == false) {
            //     if (event.keyCode === 13) {
            //         if (!this.loginDisabled) {
            //             this.userLogin();
            //         }
            //     }
            // } else {
            //     this.upModal = false;
            // }
            if (event.keyCode === 13) {
                if (this.upModal) {
                    this.upModal = false;
                } else {
                    if (!this.loginDisabled) {
                        this.userLogin();
                    }
                }
            }
        },
        userLogin() {
            this.loading = true;
            this.req = { user_id: this.user_id, user_password: this.user_password }
            this.$axios.post(this.$BASE_URL + '/agencyuserlogin', this.req).then(res => {
                this.loading = false;
                this.loginInfo.userInfo = res.data;
                if (res.data.status == "200") {
                    this.ACT_SESSION_INFO(this.loginInfo);
                    this.ACT_LOGIN_INFO(true);
                    var init_login = this.loginInfo.userInfo.init_login;
                    if (this.saveId) {
                        this.setCookie("icallmobile", this.user_id, 31);
                    } else {
                        this.deleteCookie("icallmobile");
                    }
                    if (init_login == true) {
                        this.$router.push('/init');
                    } else {
                        this.$router.push('/main');
                    }
                } else if (res.data.status == "510") {
                    // this.$swal({
                    //     title: "로그인 실패",
                    //     icon: "warning",
                    //     html: "사용자 정보가 없습니다. 영업담당자에게 문의해주세요.",
                    //     confirmButtonText: "확인",
                    //     customClass: {
                    //         confirmButton: "btn bg-gradient-dark",
                    //     },
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //         return;
                    //     }
                    // });
                    this.msgHtml = "사용자 정보가 없습니다. 영업담당자에게 문의해주세요.";
                    this.upModal = true;
                } else if (res.data.status == "511") {
                    // this.$swal({
                    //     title: "로그인 실패",
                    //     icon: "warning",
                    //     html: "아이디/비밀번호를 확인해주세요. <br>기타 문의는 영업담당자에게 문의주시기 바랍니다",
                    //     confirmButtonText: "확인",
                    //     customClass: {
                    //         confirmButton: "btn bg-gradient-dark",
                    //     },
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //         return;
                    //     }
                    // });
                    this.msgHtml = "아이디/비밀번호를 확인해주세요. <br>기타 문의는 영업담당자에게 문의주시기 바랍니다.";
                    this.upModal = true;
                } else {
                    // this.$swal({
                    //     title: "로그인 실패",
                    //     icon: "warning",
                    //     html: "관리자에게 문의해주세요. <br>기타 문의는 영업담당자에게 문의주시기 바랍니다",
                    //     confirmButtonText: "확인",
                    //     customClass: {
                    //         confirmButton: "btn bg-gradient-dark",
                    //     },
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //         return;
                    //     }
                    // });
                    this.msgHtml = "관리자에게 문의해주세요. <br>기타 문의는 영업담당자에게 문의주시기 바랍니다.";
                    this.upModal = true;
                }
            }).catch(err => {
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        setCookie(cookieName, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var cookieValue = escape(value)
                + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
            document.cookie = cookieName + "=" + cookieValue;
        },
        deleteCookie(cookieName) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() - 1);
            document.cookie = cookieName + "= " + "; expires="
                + expireDate.toGMTString();
        },
        getCookie(cookieName) {
            cookieName = cookieName + '=';
            var cookieData = document.cookie;
            var start = cookieData.indexOf(cookieName);
            var cookieValue = '';
            if (start != -1) { // 쿠키가 존재하면
                start += cookieName.length;
                var end = cookieData.indexOf(';', start);
                if (end == -1) // 쿠키 값의 마지막 위치 인덱스 번호 설정 
                    end = cookieData.length;
                cookieValue = cookieData.substring(start, end);
            }
            return unescape(cookieValue);
        },
        modalConfirm() {
            this.upModal = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/login/login.scss';
</style>