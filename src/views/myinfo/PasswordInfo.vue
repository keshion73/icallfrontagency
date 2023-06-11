<template>
    <div class="refund-page">
        <ModalComponents :icon="iconName" :title="modalTitle" v-if="upModal" @close="upModal = false">
            <p slot="mes" v-html="msgHtml"></p>
            <div slot="btn" v-if="basicMd">
                <v-btn x-large @click="upModal = false" class="btntxt">취소</v-btn>
                <v-btn color="btncolor" x-large @click.prevent="updateUserPasswordAPI">확인</v-btn>
            </div>
            <div slot="btn" v-else>
                <v-btn color="btncolor" x-large @click.prevent="modalConfirm">확인</v-btn>
            </div>
        </ModalComponents>
        <LoadingComponents :loading="loading" :msg="msg">
        </LoadingComponents>
        <div class="container">
            <h2 class="text-h2">{{ $route.name }}</h2>
            <div>
                <v-form ref="modForm">
                    <div>
                        <h4 class="text-h4">현재 비밀번호</h4>
                        <v-text-field ref="refCurrentPwd" v-model="modItem.current_password" placeholder="" outlined
                            class="font-size-input input-style pt-0 readonlyDisabled" type="password"
                            :rules="[rules.currentPassword.notEquls]">
                        </v-text-field>
                    </div>
                    <div>
                        <h4 class="text-h4">새 비밀번호</h4>
                        <v-text-field ref="reNewPwd" v-model="modItem.new_password" placeholder="" outlined
                            class="font-size-input input-style pt-0 readonlyDisabled" type="password"
                            @input="resetConfirmPwd"
                            :rules="[rules.newPassword.required, rules.newPassword.length, rules.newPassword.charValid, rules.newPassword.duplicate]">
                        </v-text-field>
                    </div>
                    <div>
                        <h4 class="text-h4">비밀번호 확인</h4>
                        <v-text-field ref="refConfirmPwd" v-model="modItem.confirm_password" placeholder="" outlined
                            class="font-size-input input-style pt-0 readonlyDisabled" type="password"
                            :rules="[rules.confirmPassword.required, rules.confirmPassword.length, rules.confirmPassword.charValid, rules.confirmPassword.notEquls]">
                        </v-text-field>
                    </div>
                    <v-btn :disabled="modDisable" color="btncolor" x-large block @click.prevent="modConfirm">수정</v-btn>
                    <!-- <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">현재 비밀번호 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refCurrentPwd" v-model="modItem.current_password" color="#e91e63"
                                placeholder="" type="password" class="font-size-input input-style pt-0" outlined
                                :rules="[rules.currentPassword.notEquls]">
                            </v-text-field>
                        </v-col>
                    </v-row> -->
                    <!-- <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">새 비밀번호 : </label>
                        <v-col cols="3">
                            <v-text-field ref="reNewPwd" v-model="modItem.new_password" color="#e91e63" placeholder=""
                                type="password" class="font-size-input input-style pt-0" @input="resetConfirmPwd" outlined
                                :rules="[rules.newPassword.required, rules.newPassword.length, rules.newPassword.charValid, rules.newPassword.duplicate]">
                            </v-text-field>
                        </v-col>
                    </v-row> -->
                    <!-- <v-row>
                        <label class="text-sm font-weight-bold mt-5 input-title">비밀번호 확인 : </label>
                        <v-col cols="3">
                            <v-text-field ref="refConfirmPwd" v-model="modItem.confirm_password" color="#e91e63"
                                placeholder="" type="password" class="font-size-input input-style pt-0" outlined
                                :rules="[rules.confirmPassword.required, rules.confirmPassword.length, rules.confirmPassword.charValid, rules.confirmPassword.notEquls]">
                            </v-text-field>
                        </v-col>
                    </v-row> -->
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingComponents from '@/components/LoadingComponents.vue'
import ModalComponents from '@/components/ModalComponents.vue'

export default {
    name: "password-info",
    components: {
        LoadingComponents,
        ModalComponents
    },
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
            loading: false,
            msg: "",
            upModal: false,
            iconName: "",
            modalTitle: "",
            basicMd: true,
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
            this.loading = true;
            this.getUserPassword.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.$axios.post(this.$BASE_URL + '/userinfo/getuserpassword', this.getUserPassword.req).then(res => {
                this.loading = false;
                this.getUserPassword.res = res.data;
            }).catch(err => {
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        resetConfirmPwd() {
            this.modItem.confirm_password = "";
        },
        modConfirm() {
            this.basicMd = true;
            this.iconName = "icon02"
            this.modalTitle = "비밀번호 수정"
            this.msgHtml = "비밀번호를 수정하시겠습니까?";
            this.upModal = true;
            // this.$swal({
            //     text: "비밀번호를 수정하시겠습니까?",
            //     icon: "warning",
            //     showCancelButton: true,
            //     cancelButtonText: "취소",
            //     confirmButtonText: "수정",
            //     customClass: {
            //         confirmButton: "btn bg-gradient-success",
            //         cancelButton: "btn bg-gradient-danger",
            //     },
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         this.updateUserPasswordAPI();
            //     }
            // });
        },
        updateUserPasswordAPI() {
            this.basicMd = false;
            this.upModal = false;
            this.loading = true;
            this.updateUserPassword.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.updateUserPassword.req.new_password = this.modItem.confirm_password;
            this.$axios.post(this.$BASE_URL + '/userinfo/updateuserpassword', this.updateUserPassword.req).then(res => {
                this.updateUserPassword.res = res.data;
                // this.$swal.fire("성공", "비밀번호가 수정되었습니다.", "success");
                this.$refs.modForm.reset();
                this.loading = false;
                if (this.updateUserPassword.res.success != "SUCC") {
                    this.iconName = "icon03"
                    this.modalTitle = "비밀번호 수정 실패"
                    this.msgHtml = "관리자에게 문의하세요.";
                } else {
                    this.getUserPasswordAPI();
                    this.iconName = "icon01"
                    this.modalTitle = "성공"
                    this.msgHtml = "수정되었습니다.";
                }
                this.upModal = true;
            }).catch(err => {
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        modalConfirm() {
            this.upModal = false;
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';
</style>
