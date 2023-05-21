


<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-6">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h4 class="text-h4 text-sm font-weight-bold ml-5" style="color:#ea5a9f">
                    충전
                </h4>
            </v-col>
        </v-row>
        <v-row class="align-center d-flex h-100">
            <v-col lg="4" md="7" class="mx-auto">
                <v-card class="card-shadow border-radius-xl py-1">
                    <div class="card-padding text-center mt-n7 shadow-primary border-radius-lg mx-4"
                        style="background-color: #ea5a9f;">
                        <h4 class="text-h4 font-weight-bolder text-white mb-2">
                            고객 선불 충전
                        </h4>
                        <p class="mb-1 text-white font-weight-light text-sm">
                            Customer Prepaid Recharge
                        </p>
                    </div>
                    <div class="card-padding text-center">
                        <v-row>
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    예치금 잔액
                                </h4>
                            </v-col>
                            <v-col cols="9">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-3" style="color:#ea5a9f">
                                    {{ GET_SESSION_INFO().userInfo.deposit_amount }}원
                                </h4>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: 35px;">
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-3">
                                    충전번호
                                </h4>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="phoneNumber" ref="refBusinessNumber" color="#e91e63"
                                    placeholder=" - 없이 입력해주세요" class="font-size-input input-style mt-2 pt-0 ml-6"
                                    background-color="#f0f2f5">
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-btn :elevation="0" class="font-weight-bold mt-2 text-white py-4 px-3 my-auto" small
                                    color="#ea5a9f" @click="search()">
                                    확 인
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: 35px;">
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left">
                                    고객정보
                                </h4>
                            </v-col>
                            <v-col cols="9">
                                <h4 v-if="getChargeConfirm.res.telco != '' && getChargeConfirm.res.telco != null &&
                                    getChargeConfirm.res.rate_nm != '' && getChargeConfirm.res.rate_nm != null"
                                    class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6"
                                    style="color:#585858">
                                    {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                                </h4>
                                <h4 v-else-if="getChargeConfirm.res.face_price != '' && getChargeConfirm.res.card_name != ''"
                                    class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6 pt-1"
                                    style="color:#585858">
                                    {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}</h4>
                                <h4 v-else class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6 pt-1"
                                    style="font-size: 12px; color:#BDBDBD">폰 번호 입력
                                    후, 확인버튼을 눌러주세요.</h4>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: 35px;">
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-5">
                                    충전금액
                                </h4>
                            </v-col>
                            <v-col cols="9">
                                <!-- <h4 v-if="getChargeConfirm.res.telco != '' && getChargeConfirm.res.telco != null &&
                                    getChargeConfirm.res.rate_nm != '' && getChargeConfirm.res.rate_nm != null && getChargeConfirm.res.rate_amt != ''
                                    && getChargeConfirm.res.rate_amt != '0'" -->
                                <h4 v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'"
                                    class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6 mt-5"
                                    style="color:#585858">
                                    {{ getChargeConfirm.res.rate_amt }} 원
                                </h4>
                                <!-- <v-radio-group
                                    v-else-if="getChargeConfirm.res.telco != '' && getChargeConfirm.res.telco != null &&
                                        getChargeConfirm.res.rate_nm != '' && getChargeConfirm.res.rate_nm != null && getChargeConfirm.res.rate_amt == '0'" -->
                                <v-radio-group
                                    v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'"
                                    ref="refRegion" row class="mt-3 font-weight-bold ml-0">
                                    <v-radio v-for="item in amountList" :key="item.amount_value" :label="item.amount_text"
                                        :value="item.amount_value"></v-radio>
                                </v-radio-group>
                                <!-- <h4 v-else-if="getChargeConfirm.res.face_price != '' && getChargeConfirm.res.card_name != ''" -->
                                <h4 v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'"
                                    class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6 mt-5"
                                    style="color:#585858">
                                    {{ getChargeConfirm.res.face_price }} 원
                                </h4>
                                <h4 v-else class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6 pt-1 mt-5"
                                    style="font-size: 12px; color:#BDBDBD">
                                    일반요금제는 선택지가 나오며, 선불요금제는 자동입력 됩니다.
                                </h4>
                                <!-- <v-text-field ref="refBusinessNumber" color="#e91e63" placeholder=" - 없이 입력해주세요"
                                                                                                                                                                                                                                                                                                                                                    class="font-size-input input-style mt-0 mt-4 pt-0 ml-6" background-color="#f0f2f5">
                                        </v-text-field> -->
                            </v-col>
                            <!-- <v-col cols="1">
                            <v-btn :elevation="0" class="font-weight-bold text-white mt-4 py-4 px-3 my-auto" small
                                            color="#ea5a9f">
                                                                                                                                                                                                                                                                                                            확 인
                                                                                                                                                                                                                                                                                                    </v-btn>
                                                                                                </v-col> -->
                        </v-row>
                        <!-- <v-row v-if="smatelChargeSearch.res.rate_amt == '0' && smatelChargeSearch.res.telco != '번호오류'">
                            <v-col class="align-center">
                                <v-radio-group ref="refRegion" row class="mt-3 font-weight-bold ml-10">
                                    <v-radio v-for="item in amountList" :key="item.amount_value" :label="item.amount_text"
                                        :value="item.amount_value"></v-radio>
                                                                                                                                                                                                                                </v-radio-group>
                                                                                                                                                                                                                            </v-col>
                                                                                                                                                                                                                        </v-row> -->
                        <v-row style="margin-top: 35px;">
                            <v-col cols="3">
                                <h4 class="font-weight-bolder text-capitalize ls-0 align-left mt-5">
                                    예치금 차감액
                                </h4>
                            </v-col>
                            <!-- <v-col cols="9" v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * 0.1)) < 0 -->
                            <!-- <v-col cols="9" v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0
                                && getChargeConfirm.res.charge_type == 'SMARTEL'">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-5" style="color:#FF0000">
                                    예치금이 부족합니다
                                </h4>
                            </v-col>
                            <v-col cols="9" v-else-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.face_price - (getChargeConfirm.res.face_price * (getChargeConfirm.res.sales_discount_rate / 100))) < 0
                                && getChargeConfirm.res.charge_type == 'POWERCALL'">
                                <h4 class="font-weight-bold text-capitalize ls-0 align-left mt-5" style="color:#FF0000">
                                    예치금이 부족합니다
                                </h4>
                            </v-col>
                            <v-col cols="9" v-else>
                                <h4 v-if="getChargeConfirm.res.charge_type == 'POWERCALL'"
                                    class="font-weight-bold text-capitalize ls-0 align-left mt-5" style="color:#FF0000">
                                    {{ getChargeConfirm.res.face_price - (getChargeConfirm.res.face_price *
                                        (getChargeConfirm.res.sales_discount_rate / 100)) }} 원
                                </h4>
                                <h4 v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL'"
                                    class="font-weight-bold text-capitalize ls-0 align-left mt-5" style="color:#FF0000">
                                    {{ getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt *
                                        (getChargeConfirm.res.sales_discount_rate / 100)) }} 0원
                                </h4>
                                <h4 v-else class="font-weight-bold text-capitalize ls-0 align-left mt-5"
                                    style="color:#FF0000">
                                    0원
                                </h4>
                            </v-col> -->
                            <!-- 수정-->

                            <v-col cols="9" v-if="getChargeConfirm.res.charge_type == 'SMARTEL'">
                                <h4 v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                                    class="font-weight-bold text-capitalize ls-0 align-left mt-5" style="color:#FF0000">
                                    예치금이 부족합니다
                                </h4>
                                <h4 v-else class="font-weight-bold text-capitalize ls-0 align-left mt-5"
                                    style="color:#FF0000">
                                    {{ result }} 원
                                </h4>
                            </v-col>
                            <v-col cols="9" v-else>
                                <h4 v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.face_price - (getChargeConfirm.res.face_price * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                                    class="font-weight-bold text-capitalize ls-0 align-left mt-5" style="color:#FF0000">
                                    예치금이 부족합니다
                                </h4>
                                <h4 v-else class="font-weight-bold text-capitalize ls-0 align-left mt-5"
                                    style="color:#FF0000">
                                    {{ result }} 원
                                </h4>
                            </v-col>

                        </v-row>
                        <!-- <v-row style="margin-top: 35px;">
                            <h4 class="font-weight-bold text-capitalize ls-0 align-start d-flex ml-6 pt-1 mt-5"
                                style="font-size: 14px; color:#BDBDBD">
                                예치금 차감액은 10% 차익이 있으며, 궁금한 사항은 아이콜 모바일 본사로 연락주시기 바랍니다.
                            </h4>
                        </v-row> -->
                        <v-btn @click="chargeConfirm()" elevation="0" :ripple="false" height="43"
                            class="text-white font-weight-bold py-2 px-6 me-2 mt-10 mb-0 w-50" color="#5e72e4"
                            style="background-color: #ea5a9f;" :disabled="chargeDisabled">충전
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "charge",
    watch: {
    },
    computed: {
        chargeDisabled() {
            // 하나는 맞을수가 있어서 스마텔, 파워텔 분리 개산해야함
            if (this.getChargeConfirm.res.success == "SUCC" && ((this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.face_price - (this.getChargeConfirm.res.face_price * (this.getChargeConfirm.res.sales_discount_rate / 100))) > 0) ||
                (this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.rate_amt - (this.getChargeConfirm.res.rate_amt * (this.getChargeConfirm.res.sales_discount_rate / 100))) > 0))) {
                return false;
            } else {
                return true;
            }
        }
    },
    mounted() {
    },
    data() {
        return {
            phoneNumber: "",
            amountList: [
                { amount_text: "1만원", amount_value: "10000" },
                { amount_text: "2만원", amount_value: "20000" },
                { amount_text: "3만원", amount_value: "30000" },
                { amount_text: "4만원", amount_value: "40000" },
                { amount_text: "5만원", amount_value: "50000" },
            ],
            getChargeConfirm: {
                req: {
                    agency_code: "",
                    phoneNo: ""
                },
                amount: 0,
                res: {
                    success: "",
                    error: "",
                    error_code: "",
                    charge_type: "",
                    vs_type: "",
                    phone_no: "",
                    desc: "",
                    card_type: "",
                    card_name: "",
                    face_price: "",
                    telecom_code: "",
                    exp_date: "",
                    plan_exp_date: "",
                    data: "",
                    voice: "",
                    sms: "",
                    mvno_code: "",
                    mvno_name: "",
                    link_type: "",
                    telco: "",
                    rate_nm: "",
                    rate_amt: "",
                }
            },
            loginInfo: {
                userInfo: {}
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
                    card_type: "",
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
            powercallFeeCharge: {
                req: {
                    agency_code: "",
                    charge_company_code: "",
                    phone_no: "",
                    card_type: "",
                },
                res: {
                }
            },
        };
    },
    methods: {
        ...mapActions('sessionStore', ["ACT_SESSION_INFO"]),
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        search() {
            this.getChargeConfirm.req.phoneNo = this.phoneNumber;
            this.getChargeConfirm.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            // this.$axios.post(this.$BASE_URL + '/smatelchargesearch', this.smatelChargeSearch.req).then(res => {
            this.$axios.post(this.$BASE_URL + '/charge/search', this.getChargeConfirm.req).then(res => {
                this.getChargeConfirm.res = res.data;
                if (this.getChargeConfirm.res.success != "SUCC") {
                    alert(this.getChargeConfirm.res.error_code + " " + this.getChargeConfirm.res.desc);
                } else {
                    if (this.getChargeConfirm.res.charge_type == 'SMARTEL') {
                        this.result = this.getChargeConfirm.res.rate_amt - (this.getChargeConfirm.res.rate_amt *
                            (this.getChargeConfirm.res.sales_discount_rate / 100))
                    } else {
                        this.result = this.getChargeConfirm.res.face_price - (this.getChargeConfirm.res.face_price *
                            (this.getChargeConfirm.res.sales_discount_rate / 100))
                    }
                }
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        chargeConfirm() {
            this.$swal({
                text: "충전하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "취소",
                confirmButtonText: "충전",
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.getChargeConfirm.res.charge_type == "SMARTEL") {
                        this.feeCharge();
                    }
                    else {
                        this.powercallCharge();
                    }
                }
            });
        },
        feeCharge() {
            this.smatelFeeCharge.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.smatelFeeCharge.req.charge_company_code = "SMARTEL";
            this.smatelFeeCharge.req.telco = this.getChargeConfirm.res.telco;
            this.smatelFeeCharge.req.order_no = "202303201500000";
            this.smatelFeeCharge.req.ctn = this.getChargeConfirm.res.phone_no;
            this.smatelFeeCharge.req.rcg_amt = this.getChargeConfirm.res.rate_amt;
            this.smatelFeeCharge.req.discount_amt = this.getChargeConfirm.res.rate_amt * (this.getChargeConfirm.res.sales_discount_rate / 100);
            this.smatelFeeCharge.req.org_id = "pjsmoon";
            this.smatelFeeCharge.req.rate_nm = this.getChargeConfirm.res.rate_nm;
            this.smatelFeeCharge.req.msg_id = "RCG";
            this.smatelFeeCharge.req.rcg_type = this.getChargeConfirm.res.vs_type;
            this.smatelFeeCharge.req.card_type = this.getChargeConfirm.res.card_type;
            this.smatelFeeCharge.req.current_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount;
            this.smatelFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - (this.smatelFeeCharge.req.rcg_amt - this.smatelFeeCharge.req.discount_amt);

            this.$axios.post(this.$BASE_URL + '/smatelfeecharge', this.smatelFeeCharge.req).then(res => {
                this.smatelFeeCharge.res = res.data;
                this.loginInfo.userInfo = this.GET_SESSION_INFO().userInfo;
                console.log(" 응답 :: ", this.smatelFeeCharge.res);
                if (this.smatelFeeCharge.res.rslt_cd == "0000") {
                    this.$swal.fire("성공", "충전 되었습니다.", "success");
                    this.loginInfo.userInfo.deposit_amount = this.smatelFeeCharge.req.result_deposit;
                    this.ACT_SESSION_INFO(this.loginInfo);
                    this.$router.push('/charge/history');
                } else {
                    this.$swal.fire("실패", "충전에 실패하였습니다. 관리자에게 문의하세요", "error");
                }
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        powercallCharge() {
            this.powercallFeeCharge.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.powercallFeeCharge.req.charge_company_code = "POWERCALL";
            this.powercallFeeCharge.req.phone_no = this.getChargeConfirm.res.phone_no;
            this.powercallFeeCharge.req.card_type = this.getChargeConfirm.res.card_type;
            this.powercallFeeCharge.req.rcg_amt = this.getChargeConfirm.res.face_price;
            this.powercallFeeCharge.req.discount_amt = this.getChargeConfirm.res.face_price * (this.getChargeConfirm.res.sales_discount_rate / 100);
            this.powercallFeeCharge.req.rate_nm = this.getChargeConfirm.res.card_name;
            this.powercallFeeCharge.req.telco = this.getChargeConfirm.res.mvno_name;
            this.powercallFeeCharge.req.rcg_type = "V";
            this.powercallFeeCharge.req.current_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount;
            this.powercallFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.face_price - this.powercallFeeCharge.req.discount_amt);
            this.$axios.post(this.$BASE_URL + '/powercall/charge', this.powercallFeeCharge.req).then(res => {
                this.powercallFeeCharge.res = res.data;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        }
    }
};
</script>
<style lang="css" scoped></style>