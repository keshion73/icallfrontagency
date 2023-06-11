<template>
    <div class="refund-page">
        <ModalComponents :icon="iconName" :title="modalTitle" v-if="upModal" @close="upModal = false">
            <p slot="mes" v-html="msgHtml"></p>
            <div slot="btn" v-if="basicMd">
                <v-btn x-large @click="upModal = false" class="btntxt">취소</v-btn>
                <v-btn color="btncolor" x-large @click.prevent="updateUserInfoAPI">확인</v-btn>
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
                <h4 class="text-h4">대리점 코드</h4>
                <v-text-field v-model="modItem.user_id" ref="refUserId" placeholder="" outlined
                    class="font-size-input input-style pt-0 readonlyDisabled" disabled>
                </v-text-field>
            </div>
            <div>
                <h4 class="text-h4">이름</h4>
                <v-text-field v-model="modItem.user_name" ref="refUserName" placeholder="" outlined
                    class="font-size-input input-style pt-0 readonlyDisabled"
                    :rules="[rules.userName.required, rules.userName.length, rules.userName.charValid]">
                </v-text-field>
            </div>
            <div>
                <h4 class="text-h4">이메일</h4>
                <v-text-field v-model="modItem.user_email" ref="refUserEmail" placeholder="" outlined
                    class="font-size-input input-style pt-0 readonlyDisabled"
                    :rules="[rules.userEmail.required, rules.userEmail.length, rules.userEmail.charValid]">
                </v-text-field>
            </div>
            <v-btn :disabled="modDisable" color="btncolor" x-large block @click.prevent="modConfirm">수정</v-btn>
            <!-- <div>
                <div>
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
                    <v-row class="mt-4">
                        <v-col md="8" class="mt-0 pt-0">
                        </v-col>
                        <v-col md="4" class="my-auto text-end mt-0 pt-0">
                            <v-btn :disabled="resetDisable" :elevation="0" color="#4c4c4c"
                                class="font-weight-bold text-white py-4 px-3 my-auto ms-1" small @click="resetMod">
                                초기화
                            </v-btn>
                            <v-btn :disabled="modDisable" :elevation="0" color="#4c4c4c"
                                class="font-weight-bold text-white py-4 px-3 my-auto ms-1" small
                                @click.prevent="modConfirm">
                                수정
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingComponents from '@/components/LoadingComponents.vue'
import ModalComponents from '@/components/ModalComponents.vue'

export default {
    name: "my-page",
    components: {
        LoadingComponents,
        ModalComponents
    },
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
            loading: false,
            msg: "",
            upModal: false,
            iconName: "",
            modalTitle: "",
            basicMd: true,
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
            this.msg = "사용자 정보 조회 중입니다.";
            this.loading = true;
            this.getUserInfo.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.$axios.post(this.$BASE_URL + '/userinfo/getuserinfo', this.getUserInfo.req).then(res => {
                this.loading = false;
                this.getUserInfo.res = res.data;
                this.modItem.user_id = this.getUserInfo.res.user_id;
                this.modItem.user_name = this.getUserInfo.res.user_name;
                this.modItem.user_email = this.getUserInfo.res.user_email;
            }).catch(err => {
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        resetMod() {
            this.modItem.user_id = this.getUserInfo.res.user_id;
            this.modItem.user_name = this.getUserInfo.res.user_name;
            this.modItem.user_email = this.getUserInfo.res.user_email;
        },
        modConfirm() {
            this.basicMd = true;
            this.iconName = "icon02"
            this.modalTitle = "사용자 정보 수정"
            this.msgHtml = "수장하시겠습니까?";
            this.upModal = true;
            // this.$swal({
            //     text: "수정하시겠습니까?",
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
            //         this.updateUserInfoAPI();
            //     }
            // });
        },
        updateUserInfoAPI() {
            this.upModal = false;
            this.basicMd = false;
            this.loading = true;
            this.updateUserInfo.req.user_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.updateUserInfo.req.user_name = this.modItem.user_name;
            this.updateUserInfo.req.user_email = this.modItem.user_email;
            this.$axios.post(this.$BASE_URL + '/userinfo/updateuserinfo', this.updateUserInfo.req).then(res => {
                this.loading = false;
                this.updateUserInfo.res = res.data;
                if (this.updateUserInfo.res.success != "SUCC") {
                    this.iconName = "icon03"
                    this.modalTitle = "사용자 정보 수정 실패"
                    this.msgHtml = "관리자에게 문의하세요.";
                    this.upModal = true;
                } else {
                    this.iconName = "icon01"
                    this.modalTitle = "성공"
                    this.msgHtml = "수정되었습니다.";
                    this.upModal = true;
                }
                // this.$swal.fire("성공", "내정보가 수정되었습니다.", "success");
                // this.getUserInfoAPI();
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
