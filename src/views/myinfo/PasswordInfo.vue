<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-2">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h5 class="text-h5 text-sm font-weight-bold ml-5">
                    비밀번호 변경
                </h5>
            </v-col>
        </v-row>
        <v-form ref="modForm" lazy-validation>
            <v-card class="card-shadow border-radius-xl mt-6" id="basic">
                <div class="px-6 pb-6 pt-6">
                    <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">현재 비밀번호 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refCurrentPwd" v-model="modItem.current_password" color="#e91e63"
                                placeholder="" type="password" class="font-size-input input-style pt-0" outlined
                                :rules="[rules.currentPassword.notEquls]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">새 비밀번호 : </label>
                        <v-col cols="3">
                            <v-text-field ref="reNewPwd" v-model="modItem.new_password" color="#e91e63" placeholder=""
                                type="password" class="font-size-input input-style pt-0" @input="resetConfirmPwd" outlined
                                :rules="[rules.newPassword.required, rules.newPassword.length, rules.newPassword.charValid, rules.newPassword.duplicate]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">비밀번호 확인 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refConfirmPwd" v-model="modItem.confirm_password" color="#e91e63"
                                placeholder="" type="password" class="font-size-input input-style pt-0" outlined
                                :rules="[rules.confirmPassword.required, rules.confirmPassword.length, rules.confirmPassword.charValid, rules.confirmPassword.notEquls]">
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
    name: "password-info",
    watch: {
    },
    computed: {
        modDisable() {
            if (((this.modItem.current_password == "" || this.modItem.current_password == null)
                || (this.modItem.new_password == "" || this.modItem.new_password == null)
                || (this.modItem.confirm_password == "" || this.modItem.confirm_password == null))) {
                if (this.$refs.refCurrentPwd == undefined || this.$refs.reNewPwd == undefined || this.$refs.refConfirmPwd == undefined) {
                    return true;
                } else {
                    return true;
                }
            } else {
                if (this.$refs.refCurrentPwd.valid == false || this.$refs.reNewPwd.valid == false || this.$refs.refConfirmPwd.valid == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    mounted() {
        this.getUserPasswordAPI();
    },
    data() {
        return {
            modItem: {
                current_password: "",
                new_password: "",
                confirm_password: ""
            },
            getUserPassword: {
                req: {
                    user_id: ""
                },
                res: {
                    current_password: ""
                }
            },
            updateUserPassword: {
                req: {
                    user_id: "",
                    new_password: ""
                },
                res: {

                }
            },
            rules: {
                currentPassword: {
                    notEquls: value => value == this.getUserPassword.res.current_password || '현재 비밀번호와 같지 않습니다.'
                },
                newPassword: {
                    required: value => !!value || '새 비밀번호를 입력해주세요.',
                    duplicate: value => !(value == this.getUserPassword.res.current_password) || '기존 비밀번호와 동일합니다.',
                    length: value => !((value && value.length > 20) || (value && value.length < 8)) || '8자이상 20자 이하로 입력해주세요.',
                    charValid: value => !(/[\{\}\[\]\/?.,;:|\)~`\_<>\&\\(\'\"]/g.test(value)) || '입력할 수 없는 문자열입니다. (가능문자 : !^-+@#$%=*)'
                },
                confirmPassword: {
                    required: value => !!value || '비밀번호 확인을 입력해주세요.',
                    length: value => !((value && value.length > 20) || (value && value.length < 8)) || '8자이상 20자 이하로 입력해주세요.',
                    charValid: value => !(/[\{\}\[\]\/?.,;:|\)~`\_<>\&\\(\'\"]/g.test(value)) || '입력할 수 없는 문자열입니다. (가능문자 : !^-+@#$%=*)',
                    notEquls: value => value == this.modItem.new_password || '새 비밀번호와 같지 않습니다.'
                },
            }
        };
    },
    methods: {
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        getUserPasswordAPI() {
            this.getUserPassword.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.$axios.post(this.$BASE_URL + '/userinfo/getuserpassword', this.getUserPassword.req).then(res => {
                this.getUserPassword.res = res.data;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        resetConfirmPwd() {
            this.modItem.confirm_password = "";
        },
        modConfirm() {
            this.$swal({
                text: "비밀번호를 수정하시겠습니까?",
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
                    this.updateUserPasswordAPI();
                }
            });
        },
        updateUserPasswordAPI() {
            this.updateUserPassword.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.updateUserPassword.req.new_password = this.modItem.confirm_password;
            this.$axios.post(this.$BASE_URL + '/userinfo/updateuserpassword', this.updateUserPassword.req).then(res => {
                this.updateUserPassword.res = res.data;
                this.$swal.fire("성공", "비밀번호가 수정되었습니다.", "success");
                this.$refs.modForm.reset();
                this.getUserPasswordAPI();
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
};
</script>
<style></style>