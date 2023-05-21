<template>
    <v-card class="bg-transparent">
        <div class="card-padding pb-0 pt-0" height="250">
            <v-img src="@/assets/img/logos/icallmobile_logo.jpg" class="mb-2" contain />
        </div>
        <div class="card-padding pb-4 pt-0">
            <v-text-field ref="refUserId" label="ID" color="#e91e63" outlined dense class="font-size-input input-style py-0"
                v-model="user_id" placeholder="아이디를 입력하세요."
                :rules="[rules.inputUserId.required, rules.inputUserId.length, rules.inputUserId.charValid]"></v-text-field>
            <v-text-field ref="refUserPassword" label="Password" color="#e91e63" outlined dense type="password"
                placeholder="비밀번호를 입력하세요." class="font-size-input input-style py-0" v-model="user_password"
                :rules="[rules.inputUserPassword.required, rules.inputUserPassword.length, rules.inputUserPassword.charValid]"></v-text-field>
            <v-btn :disabled="loginDisabled" elevation="0" :ripple="false" height="43"
                class="font-weight-bold text-uppercase btn-primary py-2 px-6 me-2 mt-7 mb-2 w-100" color="#ea5a9f" small
                @click="userLogin()">로그인</v-btn>
        </div>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
    },
    data() {
        return {
            req: { user_id: "", user_password: "" },
            res: {},
            user_id: "",
            user_password: "",
            loginInfo: {
                userInfo: {}
            },
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
        userLogin() {
            this.req = { user_id: this.user_id, user_password: this.user_password }
            this.$axios.post(this.$BASE_URL + '/agencyuserlogin', this.req).then(res => {
                this.loginInfo.userInfo = res.data;
                if (res.data.status == "200") {
                    this.ACT_SESSION_INFO(this.loginInfo);
                    this.ACT_LOGIN_INFO(true);
                    var init_login = this.loginInfo.userInfo.init_login;
                    if (init_login == true) {
                        this.$router.push('/init');
                    } else {
                        this.$router.push('/charge/charge');
                    }
                } else if (res.data.status == "510") {
                    this.$swal({
                        title: "로그인 실패",
                        // text: "하부 대리점명 : " + this.addItem.agency_name + "<br>하부 대리점 코드를 부여하시겠습니까?",
                        icon: "warning",
                        html: "사용자 정보가 없습니다. 관리자에게 문의해주세요. <br>기타 문의는 xx-xxx-xxxx로 문의주시기 바랍니다",

                        confirmButtonText: "확인",
                        customClass: {
                            confirmButton: "btn bg-gradient-dark",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            return;
                        }
                    });
                } else if (res.data.status == "511") {
                    this.$swal({
                        title: "로그인 실패",
                        // text: "하부 대리점명 : " + this.addItem.agency_name + "<br>하부 대리점 코드를 부여하시겠습니까?",
                        icon: "warning",
                        html: "아이디/비밀번호를 확인해주세요. <br>기타 문의는 xx-xxx-xxxx로 문의주시기 바랍니다",

                        confirmButtonText: "확인",
                        customClass: {
                            confirmButton: "btn bg-gradient-dark",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            return;
                        }
                    });
                } else {
                    this.$swal({
                        title: "로그인 실패",
                        // text: "하부 대리점명 : " + this.addItem.agency_name + "<br>하부 대리점 코드를 부여하시겠습니까?",
                        icon: "warning",
                        html: "관리자에게 문의해주세요. <br>기타 문의는 xx-xxx-xxxx로 문의주시기 바랍니다",

                        confirmButtonText: "확인",
                        customClass: {
                            confirmButton: "btn bg-gradient-dark",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            return;
                        }
                    });
                }
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        apiTest() {
            var req = {
                ORDER_NO: '20220625142345',
                CTN: '01012345678',
                RCG_AMT: '36300',
                ORG_ID: 'SMP0884',
                MSG_ID: 'RCG',
                RCG_TYPE: 'V'
            }
            this.$axios.post(this.$BASE_URL + '/testApi', req).then(res => {
                this.res.data = res;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
}
</script>
<!-- <template>
    <div class="login-cont">
        <div class="d-flex">
            <div class="loginimg" v-if="!$vuetify.breakpoint.xs">
                <img src="@/assets/images/page/login/loginimg.png" alt="">
            </div>
            <div class="loginform">
                <div class="d-flex">
                    <p class="loginlogo"><img src="@/assets/images/icalllogo.svg" alt=""><span>대리점</span></p>
                    <form action="">
                        <input type="text" placeholder="아이디" class="error">
                        <span class="error-mes">유효하지 않습니다.</span>
                        <input type="password" placeholder="비밀번호">
                        <span class="error-mes"></span>
                        <button type="submit" class="btn btn-blue">로그인</button>
                        <div class="input-chk">
                            <input type="checkbox" id="login">
                            <label for="login">아이디 저장</label>
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
</template> -->