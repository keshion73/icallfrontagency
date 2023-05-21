


<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-6">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h4 class="text-h4 text-sm font-weight-bold ml-5" style="color:#ea5a9f">
                    예치금 환불 요청
                </h4>
            </v-col>
        </v-row>
        <v-row class="align-center d-flex h-100">
            <v-col lg="4" md="7" class="mx-auto">
                <v-card class="card-shadow border-radius-xl py-1">
                    <div class="card-padding text-center mt-n7 shadow-primary border-radius-lg mx-4"
                        style="background-color: #ea5a9f;">
                        <h4 class="text-h4 font-weight-bolder text-white mb-2">
                            예치금 환불 요청
                        </h4>
                        <p class="mb-1 text-white font-weight-light text-sm">
                            Deposit Refund Request
                        </p>
                    </div>
                    <div class="card-padding text-center">
                        <v-row>
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    계좌 정보
                                </h4>
                            </v-col>
                            <v-col cols="9">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    신한은행 153-151-61351-13 김승현
                                </h4>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    현재 잔액
                                </h4>
                            </v-col>
                            <v-col cols="9">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    {{ GET_SESSION_INFO().userInfo.deposit_amount }}원
                                </h4>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    환불 요청 금액
                                </h4>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="amount" ref="refBusinessNumber" color="#e91e63"
                                    placeholder=" 숫자만 입력해주세요." class="font-size-input input-style mt-2 pt-0 ml-6"
                                    background-color="#f0f2f5">
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-btn :elevation="0" class="font-weight-bold mt-2 text-white py-4 px-3 my-auto" small
                                    color="#ea5a9f">
                                    확 인
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="3" class="pt-0">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    사유
                                </h4>
                            </v-col>
                            <v-col cols="9" class="pt-0">
                                <v-textarea v-model="reason" placeholder="환불 요청 사유를 입력해주세요." background-color="#f0f2f5"
                                    class="font-size-input input-style mt-2 pt-0 ml-6" auto-grow clearable counter>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-btn @click="refundConfirm()" elevation="0" :ripple="false" height="43"
                            class="text-white font-weight-bold py-2 px-6 me-2 mt-10 mb-0 w-50" color="#5e72e4"
                            style="background-color: #ea5a9f;">환불 요청
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
    name: "depositrefund",
    watch: {
    },
    computed: {
    },
    mounted() {
    },
    data() {
        return {
            amount: "",
            reasion: "",
            depositRefundRequest: {
                req: {
                    agency_code: "",
                    deposit_refund_request_amount: "",
                    reason: "",
                },
                res: {
                    telco: "",
                    ctn: "",
                    rate_nm: "",
                    rate_amt: ""
                }
            },
            smatelFeeCharge: {
                req: {
                    agency_code: "",
                    charge_company_code: "",
                    telco: "",
                    order_no: "",
                    ctn: "",
                    discount_amt: "",
                    rate_nm: "",
                    rcg_amt: "",
                    org_id: "",
                    msg_id: "",
                    rcg_type: "",
                    current_deposit: "",
                    result_deposit: "",
                },
                res: {
                    order_no: "",
                    ctn: "",
                    rcg_amt: "",
                    deposit: "",
                    rslt_cd: "",
                    rslt_msg: "",
                }
            }
        };
    },
    methods: {
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        refundConfirm() {
            this.$swal({
                text: "예치금 환불 요청을 하시겠습니까?",
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
                    this.depositRefundRequestAPI();
                }
            });
        },
        depositRefundRequestAPI() {
            this.depositRefundRequest.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.depositRefundRequest.req.deposit_refund_request_amount = this.amount;
            this.depositRefundRequest.req.reason = this.reason;

            console.log(" 요청 :: ", this.depositRefundRequest.req);

            this.$axios.post(this.$BASE_URL + '/deposit/refundrequest', this.depositRefundRequest.req).then(res => {
                this.depositRefundRequest.res = res.data;
                console.log(" 응답 :: ", this.depositRefundRequest.res);
                this.$swal.fire("성공", "환불 요청이 되었습니다.", "success");
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
};
</script>
<style lang="css" scoped></style>