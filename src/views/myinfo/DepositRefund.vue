<template>
    <div class="refund-page">
        <LoadingComponents :loading="loading" :msg="msg">
        </LoadingComponents>
        <ModalComponents :icon="iconName" :title="modalTitle" v-if="upModal">
            <p slot="mes" v-html="msgHtml"></p>
            <div slot="btn">
                <v-btn color="btncolor" x-large @click.prevent="modalConfirm">확인</v-btn>
            </div>
        </ModalComponents>
        <div class="container">
            <h2 class="text-h2">{{ $route.name }}</h2>
            <div class="refund-info">
                <div>
                    <h4 class="text-h4">예치금 잔액</h4>
                    <p><span>{{
                        GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount)
                    }}</span><span>원</span>
                    </p>
                </div>
                <div class="bank d-flex">
                    <h4 class="text-h4">계좌</h4>
                    <p class="font-weight-bold">{{ GET_SESSION_INFO().userInfo.account_info }} {{
                        GET_SESSION_INFO().userInfo.user_name }}</p>
                </div>
            </div>
            <p class="refund-req"><img src="@/assets/images/common/icon-info.svg" alt="">등록되어있는 계좌로 환불됩니다.</p>
            <div>
                <h4 class="text-h4">환불 요청 금액</h4>
                <v-text-field v-model="amount" ref="refAmount" placeholder=" 숫자만 입력해주세요." hide-details="auto" outlined
                    :rules="[rules.inputAmount.maxValue, rules.inputAmount.charValid, rules.inputAmount.firstValue]">
                </v-text-field>
            </div>
            <div>
                <h4 class="text-h4">환불 사유</h4>
                <v-textarea v-model="reason" placeholder="환불 요청 사유를 입력해주세요." outlined no-resize rows="10" auto-grow
                    clearable counter></v-textarea>
            </div>
            <v-btn :disabled="refundDisabled" color="btncolor" x-large block @click="refundConfirm()">환불 요청</v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingComponents from '@/components/LoadingComponents.vue'
import ModalComponents from '@/components/ModalComponents.vue'

export default {
    name: "deposit-refund",
    components: {
        LoadingComponents,
        ModalComponents
    },
    watch: {
    },
    computed: {
        refundDisabled() {
            if ((this.amount == "" || this.amount == null)) {
                if (this.$refs.refAmount == undefined) {
                    return true;
                } else {
                    return true;
                }
            } else {
                if (this.$refs.refAmount.valid == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    mounted() {
    },
    data() {
        return {
            loading: false,
            msg: "환불 요청 중입니다.",
            upModal: false,
            iconName: "",
            modalTitle: "",
            amount: "",
            reason: "",
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
            },
            rules: {
                inputAmount: {
                    charValid: value => /^[0-9]*$/.test(value) || '숫자만 입력하세요.',
                    maxValue: value => value && Number(value) <= Number(this.GET_SESSION_INFO().userInfo.deposit_amount) || '예치금 잔액을 초과하였습니다.',
                    firstValue: value => value && value.charAt(0) != '0' || '0으로 시작할 수 없습니다.'
                },
            },
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
            this.loading = true;
            this.depositRefundRequest.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.depositRefundRequest.req.deposit_refund_request_amount = this.amount;
            this.depositRefundRequest.req.reason = this.reason;

            this.$axios.post(this.$BASE_URL + '/deposit/refundrequest', this.depositRefundRequest.req).then(res => {
                this.loading = false;
                this.depositRefundRequest.res = res.data;
                if (this.depositRefundRequest.res.success != "SUCC") {
                    this.iconName = "icon03"
                    this.modalTitle = "환불요청 실패"
                    this.msgHtml = "관리자에게 문의하세요.";
                    this.upModal = true;
                } else {
                    this.iconName = "icon01"
                    this.modalTitle = "성공"
                    this.msgHtml = "환불요청 되었습니다.";
                    this.upModal = true;
                }
                // this.$swal.fire("성공", "환불 요청이 되었습니다.", "success");
            }).catch(err => {
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        modalConfirm() {
            if (this.depositRefundRequest.res.success == "SUCC") {
                this.$router.push('/myinfo/depositrefundlist');
                this.upModal = false;
            } else {
                this.upModal = false;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';
</style>