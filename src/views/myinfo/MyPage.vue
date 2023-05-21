<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-2">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h5 class="text-h5 text-sm font-weight-bold ml-5">
                    마이페이지
                </h5>
            </v-col>
        </v-row>
        <v-form ref="modForm" lazy-validation>
            <v-card class="card-shadow border-radius-xl mt-6" id="basic">
                <div class="px-6 pb-6 pt-6">
                    <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">아이디 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refUserId" v-model="modItem.user_id" color="#e91e63" placeholder="" outlined
                                class="font-size-input input-style pt-0 readonlyDisabled" disabled>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">이름 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refUserName" v-model="modItem.user_name" color="#e91e63" placeholder=""
                                class="font-size-input input-style pt-0" outlined
                                :rules="[rules.userName.required, rules.userName.length, rules.userName.charValid]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">이메일 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refUserEmail" v-model="modItem.user_email" color="#e91e63" placeholder=""
                                class="font-size-input input-style pt-0" outlined
                                :rules="[rules.userEmail.required, rules.userEmail.length, rules.userEmail.charValid]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </v-form>
        <v-row class="mt-4">
            <v-col md="8" class="mt-0 pt-0">
            </v-col>
            <v-col md="4" class="my-auto text-end mt-0 pt-0">
                <v-btn :disabled="resetDisable" :elevation="0" color="#4c4c4c"
                    class="font-weight-bold text-white py-4 px-3 my-auto ms-1" small @click="resetMod">
                    초기화
                </v-btn>
                <v-btn :disabled="modDisable" :elevation="0" color="#4c4c4c"
                    class="font-weight-bold text-white py-4 px-3 my-auto ms-1" small @click.prevent="modConfirm">
                    수정
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "my-page",
    watch: {
    },
    computed: {
        resetDisable() {
            return ((this.modItem.user_name == this.getUserInfo.res.user_name
                && this.modItem.user_email == this.getUserInfo.res.user_email)) ? true : false;
        },
        modDisable() {
            if (((this.modItem.user_name == "" || this.modItem.user_name == null)
                || (this.modItem.user_email == "" || this.modItem.user_email == null))) {
                if (this.$refs.refUserName == undefined || this.$refs.refUserEmail == undefined) {
                    return true;
                } else {
                    return true;
                }
            } else {
                if (this.$refs.refUserName.valid == false || this.$refs.refUserEmail.valid == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    mounted() {
        this.getUserInfoAPI();
    },
    data() {
        return {
            modItem: {
                user_name: "",
                user_email: "",
                user_id: ""
            },
            getUserInfo: {
                req: {
                    user_id: ""
                },
                res: {
                    user_id: "",
                    user_name: "",
                    user_email: ""
                }
            },
            updateUserInfo: {
                req: {
                    user_id: "",
                    user_name: "",
                    user_email: ""
                },
                res: {}
            },
            rules: {
                userName: {
                    required: value => !!value || '이름은 필수입니다.',
                    length: value => !(value && value.length > 50) || '이름은 50자 이상 입력할 수 없습니다.',
                    charValid: value => !(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(value)) || '특수문자는 입력할 수 없습니다.'
                },
                userEmail: {
                    required: value => !!value || '이메일은 필수입니다.',
                    length: value => !(value && value.length >= 31) || '30자 이상 입력할 수 없습니다.',
                    charValid: value => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value) || '예 ) icallmobile@icall.com'
                },
            }
        };
    },
    methods: {
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        getUserInfoAPI() {
            this.getUserInfo.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.$axios.post(this.$BASE_URL + '/userinfo/getuserinfo', this.getUserInfo.req).then(res => {
                this.getUserInfo.res = res.data;
                this.modItem.user_id = this.getUserInfo.res.user_id;
                this.modItem.user_name = this.getUserInfo.res.user_name;
                this.modItem.user_email = this.getUserInfo.res.user_email;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        resetMod() {
            this.modItem.user_id = this.getUserInfo.res.user_id;
            this.modItem.user_name = this.getUserInfo.res.user_name;
            this.modItem.user_email = this.getUserInfo.res.user_email;
        },
        modConfirm() {
            this.$swal({
                text: "수정하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "취소",
                confirmButtonText: "수정",
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateUserInfoAPI();
                }
            });
        },
        updateUserInfoAPI() {
            this.updateUserInfo.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.updateUserInfo.req.user_name = this.modItem.user_name;
            this.updateUserInfo.req.user_email = this.modItem.user_email;
            this.$axios.post(this.$BASE_URL + '/userinfo/updateuserinfo', this.updateUserInfo.req).then(res => {
                this.updateUserInfo.res = res.data;
                this.$swal.fire("성공", "내정보가 수정되었습니다.", "success");
                this.getUserInfoAPI();
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
};
</script>
<style lang="css" scoped>
.readonlyDisabled::v-deep .v-input__slot::before {
    border-image: unset !important;
}
</style>
