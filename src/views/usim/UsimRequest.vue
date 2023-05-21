<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-6">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h4 class="text-h4 text-sm font-weight-bold ml-5">
                    USIM 요청
                </h4>
            </v-col>
        </v-row>
        <v-row class="align-center d-flex h-100">
            <v-col lg="4" md="7" class="mx-auto">
                <v-card class="card-shadow border-radius-xl py-1">
                    <div class="card-padding text-center mt-n7 shadow-primary border-radius-lg mx-4"
                        style="background-color: #ea5a9f;">
                        <h4 class="text-h4 font-weight-bolder text-white mb-2">
                            USIM 요청
                        </h4>
                        <p class="mb-1 text-white font-weight-light text-sm">
                            USIM Request
                        </p>
                    </div>
                    <div class="card-padding text-center">
                        <v-row>
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    현재 USIM 수량
                                </h4>
                            </v-col>
                            <v-col cols="9">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    SK : 1개
                                </h4>
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    LGU : 1개
                                </h4>
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    KT : 1개
                                </h4>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    요청수량
                                </h4>
                            </v-col>
                            <v-col cols="6">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    SKT :
                                    <v-text-field ref="refSktCnt" placeholder="" v-model="skt_usim_count"
                                        class="font-size-input input-style mt-0 pt-0" outlined
                                        :rules="[rules.inputSktCnt.length, rules.inputSktCnt.charValid]">
                                    </v-text-field>
                                </h4>
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    LGU :
                                    <v-text-field ref="refLguCnt" placeholder="" v-model="lgu_usim_count"
                                        class="font-size-input input-style mt-0 pt-0" outlined
                                        :rules="[rules.inputLguCnt.length, rules.inputLguCnt.charValid]">
                                    </v-text-field>
                                </h4>
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    KT : <v-text-field ref="refKtCnt" placeholder="" v-model="kt_usim_count"
                                        class="font-size-input input-style mt-0 pt-0" outlined
                                        :rules="[rules.inputKtCnt.length, rules.inputKtCnt.charValid]">
                                    </v-text-field>
                                </h4>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="3" class="pt-0">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    사유
                                </h4>
                            </v-col>
                            <v-col cols="9" class="pt-0">
                                <v-textarea v-model="reason" placeholder="USIM 요청 사유를 입력해주세요." background-color="#f0f2f5"
                                    class="font-size-input input-style mt-2 pt-0 ml-6" auto-grow clearable counter>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-btn elevation="0" :ripple="false" height="43"
                            class="text-white font-weight-bold py-2 px-6 me-2 mt-10 mb-0 w-50" color="#5e72e4"
                            style="background-color: #ea5a9f;" @click="requestConfirm">USIM 요청
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "usim-reuquest",
    watch: {
    },
    computed: {
    },
    mounted() {
    },
    data() {
        return {
            rules: {
                inputSktCnt: {
                    length: value => !(value && value.length > 5) || '요청수량을 확인하세요.',
                    charValid: value => /^[0-9]*$/.test(value) || '숫자만 입력하세요.'
                },
                inputLguCnt: {
                    length: value => !(value && value.length > 5) || '요청수량을 확인하세요.',
                    charValid: value => /^[0-9]*$/.test(value) || '숫자만 입력하세요.'
                },
                inputKtCnt: {
                    length: value => !(value && value.length > 5) || '요청수량을 확인하세요.',
                    charValid: value => /^[0-9]*$/.test(value) || '숫자만 입력하세요.'
                },
            },
            reason: "",
            skt_usim_count: "",
            lgu_usim_count: "",
            kt_usim_count: "",
            insertUsimRequest: {
                req: {
                    agency_code: "",
                    maxKey: "",
                    skt_usim_count: "",
                    lgu_usim_count: "",
                    kt_usim_count: "",
                    reason: "",
                    req_id: "",
                    req_ip: "",
                },
                res: {

                }
            },
        };
    },
    methods: {
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),

        requestConfirm() {
            this.$swal({
                text: "USIM 요청을 하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "취소",
                confirmButtonText: "요청",
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    this.insertUsimRequestAPI();
                }
            });
        },
        insertUsimRequestAPI() {
            this.insertUsimRequest.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.insertUsimRequest.req.skt_usim_count = this.skt_usim_count;
            this.insertUsimRequest.req.lgu_usim_count = this.lgu_usim_count;
            this.insertUsimRequest.req.kt_usim_count = this.kt_usim_count;
            this.insertUsimRequest.req.reason = this.reason;
            this.insertUsimRequest.req.req_id = this.GET_SESSION_INFO().userInfo.user_id;
            this.insertUsimRequest.req.req_ip = this.GET_SESSION_INFO().userInfo.user_ip;

            this.$axios.post(this.$BASE_URL + '/agency/usimrequest', this.insertUsimRequest.req).then(res => {
                this.insertUsimRequest.res = res.data;
                this.$swal.fire("성공", "요청 되었습니다.", "success");
                this.$router.push('/usim/history');
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
};
</script>
<style></style>