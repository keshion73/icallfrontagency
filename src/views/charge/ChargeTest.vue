<template>
    <div class="charge-page">
        <div class="container">
            <div class="lt">
                <h2 class="text-h2">{{ $route.name }}</h2>
                <v-form v-if="!$vuetify.breakpoint.xs" lazy-validation>
                    <div>
                        <h4 class="text-h4">예치금 잔액</h4>
                        <p class="font-weight-bolder primary--text text-h6">{{ GET_SESSION_INFO().userInfo.deposit_amount
                        }}원</p>
                    </div>
                    <div>
                        <h4 class="text-h4">충전번호</h4>
                        <div class="input-ph">
                            <input type="text" placeholder="휴대폰번호" />
                            <button class="btn btn-blue" @click="search()">확인</button>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-h4">고객정보</h4>
                        <p v-if="getChargeConfirm.res.telco != '' && getChargeConfirm.res.telco != null &&
                            getChargeConfirm.res.rate_nm != '' && getChargeConfirm.res.rate_nm != null">
                            {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}</p>
                        <p v-else-if="getChargeConfirm.res.face_price != '' && getChargeConfirm.res.card_name != ''">
                            {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}</p>
                        <p class="info-mes">예치금 차감액은 10% 차익이 있으며, 궁금한 사항은 아이콜 모바일 본사로 연락주시기 바랍니다.</p>
                    </div>
                    <div>
                        <h4 class="text-h4">충전 잔액</h4>
                        <input type="radio" id="money1" name="radio_money" checked><label for="money1">10,000</label>
                        <input type="radio" id="money2" name="radio_money"><label for="money2">20,000</label>
                        <input type="radio" id="money3" name="radio_money"><label for="money3">30,000</label>
                        <input type="radio" id="money4" name="radio_money"><label for="money4"
                            style="margin-left: 0;">40,000</label>
                        <input type="radio" id="money5" name="radio_money"><label for="money5">50,000</label>
                    </div>
                    <div>
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p class="font-weight-bolder">0</p>
                        <p class="info-mes">예치금 차감액은 10% 차익이 있으며, 궁금한 사항은 아이콜 모바일 본사로 연락주시기 바랍니다.</p>
                    </div>
                    <button class="btn btn-blue">충전</button>
                </v-form>
                <div v-if="$vuetify.breakpoint.xs">
                    <v-form lazy-validation>
                        <div>
                            <h4 class="text-h4">예치금 잔액</h4>
                            <p class="font-weight-bolder primary--text text-h6">{{
                                GET_SESSION_INFO().userInfo.deposit_amount
                            }}원</p>
                        </div>
                        <div>
                            <h4 class="text-h4">폰번호</h4>
                            <div class="input-ph">
                                <input type="text" placeholder="휴대폰번호" />
                                <button class="btn btn-blue" @click="search()">확인</button>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-h4">고객정보</h4>
                            <!--입력전-->
                            <p style="color:#AAB5C9" class="info-mes">폰번호 입력 후 확인을 눌러주세요.</p>
                            <p>LG 선불 스마트 300M</p>
                        </div>
                        <div>
                            <h4 class="text-h4">충전금액</h4>
                            <!--입력전-->
                            <p style="color:#AAB5C9" class="info-mes">일반 요금제는 선택, 선불 요금제는 자동입력됩니다.</p>
                            <!--선불요금제일시-->
                            <p class="font-weight-bolder primary--text text-h6">36,000</p>
                            <!--일반요금제일시-->
                            <div>
                                <input type="radio" id="money1" name="radio_money" checked><label
                                    for="money1">10,000</label>
                                <input type="radio" id="money2" name="radio_money"><label for="money2">20,000</label>
                                <input type="radio" id="money3" name="radio_money"><label for="money3">30,000</label>
                                <input type="radio" id="money4" name="radio_money"><label for="money4"
                                    style="margin-left: 0;">40,000</label>
                                <input type="radio" id="money5" name="radio_money"><label for="money5">50,000</label>
                            </div>
                        </div>
                        <!--입력후-->
                        <div>
                            <div>
                                <h4 class="text-h4">예치금 차감액</h4>
                                <p class="font-weight-bolder">32,400</p>
                                <p class="info-mes">예치금 차감액은 10% 차익이 있으며, 궁금한 사항은 아이콜 모바일 본사로 연락주시기 바랍니다.</p>
                            </div>
                        </div>
                        <!--입력전 disabled-->
                        <button class="btn btn-blue">충전</button>
                    </v-form>
                </div>
            </div>
            <div class="rt">
                <div>
                    <h4 class="text-h4">정액제 수수료율</h4>
                    <div class="fee-list">
                        <div class="list-cate">
                            <p>통신사</p>
                            <p>수수료율</p>
                        </div>
                        <div>
                            <p>텔링크</p>
                            <p>5.0%</p>
                        </div>
                        <div>
                            <p>드림모바일</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>이지</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>큰사람</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>아이즈비전</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>프리티</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>미디어로그</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>마이월드</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>원텔</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>스마텔</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>홈</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>여유텔레콤</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>스노우맨</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>밸류컴</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>에이플러스KT</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>에이플러스LG</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>인스코리아</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>슈가모바일</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>NIZ텔레콤(17000)</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>NIZ텔레콤(25000)</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>NIZ텔레콤(35000)</p>
                            <p>8.0%</p>
                        </div>

                        <div>
                            <p>NIZ텔레콤(45000)</p>
                            <p>8.0%</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="text-h4">종량제 수수료율</h4>
                    <div class="fee-list">
                        <div class="list-cate">
                            <p>통신사</p>
                            <p>수수료율</p>
                        </div>
                        <div>
                            <p>SK/T</p>
                            <p>5.0%</p>
                        </div>
                        <div>
                            <p>KT</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>텔링크</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>모빙</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>아이즈모바일</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>이지</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>스노우맨</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>마이월드</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>홈</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>웰</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>K mobile</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>프리티</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>큰사람</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>블루모바일</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>드림모바일</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>스마텔</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>에이플러스</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>밸류컴</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>슈가모바일</p>
                            <p>8.0%</p>
                        </div>
                        <div>
                            <p>인스모바일</p>
                            <p>8.0%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "charge-test",
    watch: {
    },
    computed: {
    },
    mounted() {
    },
    data() {
        return {
            prepayment: true,
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
                res: {
                    success: "",
                    error: "",
                    error_code: "",
                    charge_type: "",
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
            console.log("?????")
            this.getChargeConfirm.req.phoneNo = this.phoneNumber;
            this.getChargeConfirm.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            // this.$axios.post(this.$BASE_URL + '/smatelchargesearch', this.smatelChargeSearch.req).then(res => {
            this.$axios.post(this.$BASE_URL + '/charge/search', this.getChargeConfirm.req).then(res => {
                this.getChargeConfirm.res = res.data;
                console.log(" 응답 :: ", this.getChargeConfirm.res);
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
            //this.smatelFeeCharge.req.ctn = "36300";
            this.smatelFeeCharge.req.rcg_amt = this.getChargeConfirm.res.rate_amt;
            this.smatelFeeCharge.req.discount_amt = this.getChargeConfirm.res.rate_amt * (this.getChargeConfirm.res.sales_discount_rate / 100);
            this.smatelFeeCharge.req.org_id = "pjsmoon";
            this.smatelFeeCharge.req.rate_nm = this.getChargeConfirm.res.rate_nm;
            this.smatelFeeCharge.req.msg_id = "RCG";
            this.smatelFeeCharge.req.rcg_type = "V";
            this.smatelFeeCharge.req.card_type = this.getChargeConfirm.res.card_type;
            this.smatelFeeCharge.req.current_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount;
            this.smatelFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - (this.smatelFeeCharge.req.rcg_amt - this.smatelFeeCharge.req.discount_amt);

            console.log(" 요청 :: ", this.smatelFeeCharge.req);

            this.$axios.post(this.$BASE_URL + '/smatelfeecharge', this.smatelFeeCharge.req).then(res => {
                this.smatelFeeCharge.res = res.data;
                this.loginInfo.userInfo = this.GET_SESSION_INFO().userInfo;
                this.loginInfo.userInfo.deposit_amount = this.smatelFeeCharge.req.result_deposit;
                this.ACT_SESSION_INFO(this.loginInfo);
                console.log(" 응답 :: ", this.smatelFeeCharge.res);
                this.$swal.fire("성공", "충전 되었습니다.", "success");
                this.$router.push('/charge/history');
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
            console.log("asdfasdf", this.powercallFeeCharge);
            this.$axios.post(this.$BASE_URL + '/powercall/charge', this.powercallFeeCharge.req).then(res => {
                this.powercallFeeCharge.res = res.data;
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