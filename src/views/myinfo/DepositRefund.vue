<template>
    <div class="refund-page">
        <div class="container">
            <h2 class="text-h2">{{ $route.name }}</h2>
            <div class="card-padding text-center">
                <div>
                    <h4 class="text-h4">계좌 정보</h4>
                    <p class="font-weight-bold" style="font-size: 1.6rem;">{{ GET_SESSION_INFO().userInfo.account_info }} {{
                        GET_SESSION_INFO().userInfo.user_name }}</p>
                </div>
                <div>
                    <h4 class="text-h4">예치금 잔액</h4>
                    <p class="font-weight-bolder primary--text text-h6">{{
                        GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount) }}원</p>
                </div>
                <!-- <v-row>
                    <v-col cols="3">
                        <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                            현재 잔액
                        </h4>
                    </v-col>
                    <v-col cols="9">
                        <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">

                        </h4>
                    </v-col>
                </v-row> -->
                <div>
                    <h4 class="text-h4">환불 요청 금액</h4>
                    <!-- <v-text-field placeholder="숫자만 입력해 주세요." outlined ></v-text-field> -->
                    <v-text-field v-model="amount" ref="refBusinessNumber" placeholder=" 숫자만 입력해주세요." outlined>
                    </v-text-field>
                </div>
                <!-- <v-row>
                    <v-col cols="1">
                        <v-btn :elevation="0" class="font-weight-bold mt-2 text-white py-4 px-3 my-auto" small
                            color="#ea5a9f">
                            확 인
                        </v-btn>
                    </v-col>
                </v-row> -->
                <div>
                    <h4 class="text-h4">환불 사유</h4>
                    <v-textarea v-model="reason" placeholder="환불 요청 사유를 입력해주세요." outlined no-resize rows="10" auto-grow
                        clearable counter></v-textarea>
                </div>
                <v-btn @click="refundConfirm()" text color="primary" x-large block>환불 요청</v-btn>
            </div>
        </div>
    </div>
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

            this.$axios.post(this.$BASE_URL + '/deposit/refundrequest', this.depositRefundRequest.req).then(res => {
                this.depositRefundRequest.res = res.data;
                this.$swal.fire("성공", "환불 요청이 되었습니다.", "success");
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';
</style>