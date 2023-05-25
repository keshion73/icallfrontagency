<template>
    <div class="charge-page d-flex">
        <div class="container">
            <div class="lt">
                <h2 class="text-h2">{{ $route.name }}</h2>
                <v-form v-if="!$vuetify.breakpoint.xs">
                    <div>
                        <h4 class="text-h4">예치금 잔액</h4>
                        <p class="font-weight-bolder primary--text text-h6">{{
                            GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount
                            ) }}원</p>
                    </div>
                    <div>
                        <h4 class="text-h4">폰번호</h4>
                        <div class="input-ph">
                            <v-text-field placeholder="휴대폰번호" outlined v-model="phoneNumber" ref="refPhoneNumber"
                                :rules="[rules.inputPhoneNum.length, rules.inputPhoneNum.charValid]" />
                            <v-btn flat color="primary" @click="search()" :disabled="searchDisabled">확인</v-btn>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-h4">고객정보</h4>
                        <!-- <p v-if="getChargeConfirm.res.telco != '' && getChargeConfirm.res.telco != null &&
                            getChargeConfirm.res.rate_nm != '' && getChargeConfirm.res.rate_nm != null">
                            {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                        </p>
                        <p v-else-if="getChargeConfirm.res.face_price != '' && getChargeConfirm.res.card_name != ''">
                            {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}</p>
                        <p v-else style="color:#AAB5C9" class="info-mes">폰 번호 입력
                            후, 확인버튼을 눌러주세요.</p> -->
                        <p v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                            {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                        </p>
                        <p v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                            {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                        </p>
                        <p v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'"
                            class="font-weight-bolder" style="color:#FF0000">
                            타사 입니다.</p>
                        <p
                            v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                            <span class="font-weight-bolder" style="color:#FF0000">타사제품 입니다.</span> <br>
                            {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}
                        </p>
                        <p v-else style="color:#AAB5C9" class="info-mes">폰 번호 입력
                            후, 확인버튼을 눌러주세요.</p>
                    </div>
                    <div>
                        <h4 class="text-h4">충전금액</h4>
                        <p class="font-weight-bolder primary--text text-h6"
                            v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                            {{ GLOBALFNC.expression.commonAmount(getChargeConfirm.res.rate_amt) }} 원
                        </p>
                        <v-radio-group
                            v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'"
                            ref="refAmount" v-model="selectedAmount" @change="sAmountChange()">
                            <v-radio v-for="item in amountList" :key="item.amount_value" :label="item.amount_text"
                                :value="item.amount_value"></v-radio>
                        </v-radio-group>
                        <!-- <h4 v-else-if="getChargeConfirm.res.face_price != '' && getChargeConfirm.res.card_name != ''" -->
                        <p v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'"
                            class="font-weight-bolder primary--text text-h6">
                            {{ GLOBALFNC.expression.commonAmount(getChargeConfirm.res.face_price) }} 원
                        </p>

                        <v-radio-group
                            v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'"
                            ref="refAmount" v-model="selectedAmount" @change="sAmountChange()">
                            <v-radio v-for="item in amountList" :key="item.amount_value" :label="item.amount_text"
                                :value="item.amount_value"></v-radio>
                        </v-radio-group>
                        <p v-else style="color:#AAB5C9" class="info-mes">일반 요금제는 선택, 선불 요금제는 자동입력됩니다.</p>
                    </div>
                    <div v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                            class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (selectedAmount - (selectedAmount * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                            class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                            class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - selectedAmount < 0" class="font-weight-bolder"
                            style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else>
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <v-btn @click="chargeConfirm()" flat color="primary" x-large block :disabled="chargeDisabled">충전</v-btn>
                </v-form>
                <div v-if="$vuetify.breakpoint.xs">
                    <v-form action="">
                        <div>
                            <h4 class="text-h4">예치금 잔액</h4>
                            <p class="font-weight-bolder primary--text text-h6">{{
                                GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount
                                ) }}원</p>
                        </div>
                        <div>
                            <!-- <h4 class="text-h4">폰번호</h4>
                            <div class="input-ph">
                                <v-text-field placeholder="휴대폰번호" outlined hide-details="auto"></v-text-field>
                                <v-btn flat color="primary">확인</v-btn>
                            </div> -->
                            <h4 class="text-h4">폰번호</h4>
                            <div class="input-ph">
                                <v-text-field placeholder="휴대폰번호" outlined v-model="phoneNumber" ref="refPhoneNumber"
                                    :rules="[rules.inputPhoneNum.length, rules.inputPhoneNum.charValid]" />
                                <v-btn flat color="primary" @click="search()" :disabled="searchDisabled">확인</v-btn>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-h4">고객정보</h4>
                            <!--입력전-->
                            <p v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                                {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                            </p>
                            <p v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                                {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                            </p>
                            <p v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'"
                                class="font-weight-bolder" style="color:#FF0000">
                                타사 입니다.</p>
                            <p
                                v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                                <span class="font-weight-bolder" style="color:#FF0000">타사제품 입니다.</span> <br>
                                {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}
                            </p>
                            <p v-else style="color:#AAB5C9" class="info-mes">폰 번호 입력
                                후, 확인버튼을 눌러주세요.</p>
                        </div>
                        <div>
                            <h4 class="text-h4">충전금액</h4>
                            <p class="font-weight-bolder primary--text text-h6"
                                v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                                {{ GLOBALFNC.expression.commonAmount(getChargeConfirm.res.rate_amt) }} 원
                            </p>
                            <v-radio-group
                                v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'"
                                ref="refAmount" v-model="selectedAmount" @change="sAmountChange()">
                                <v-radio v-for="item in amountList" :key="item.amount_value" :label="item.amount_text"
                                    :value="item.amount_value"></v-radio>
                            </v-radio-group>
                            <!-- <h4 v-else-if="getChargeConfirm.res.face_price != '' && getChargeConfirm.res.card_name != ''" -->
                            <p v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'"
                                class="font-weight-bolder primary--text text-h6">
                                {{ GLOBALFNC.expression.commonAmount(getChargeConfirm.res.face_price) }} 원
                            </p>

                            <v-radio-group
                                v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'"
                                ref="refAmount" v-model="selectedAmount" @change="sAmountChange()">
                                <v-radio v-for="item in amountList" :key="item.amount_value" :label="item.amount_text"
                                    :value="item.amount_value"></v-radio>
                            </v-radio-group>
                            <p v-else style="color:#AAB5C9" class="info-mes">일반 요금제는 선택, 선불 요금제는 자동입력됩니다.</p>

                        </div>
                        <!--입력후-->
                        <div>
                            <div
                                v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                                <h4 class="text-h4">예치금 차감액</h4>
                                <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                                    class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                                <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                            </div>
                            <div
                                v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                                <h4 class="text-h4">예치금 차감액</h4>
                                <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (selectedAmount - (selectedAmount * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                                    class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                                <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                            </div>
                            <div
                                v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                                <h4 class="text-h4">예치금 차감액</h4>
                                <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                                    class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                                <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                            </div>
                            <div
                                v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'">
                                <h4 class="text-h4">예치금 차감액</h4>
                                <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - selectedAmount < 0"
                                    class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                                <p v-else class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                            </div>
                            <div v-else>
                                <h4 class="text-h4">예치금 차감액</h4>
                                <p class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                            </div>
                        </div>
                        <v-btn @click="chargeConfirm()" flat color="primary" x-large block
                            :disabled="chargeDisabled">충전</v-btn>
                    </v-form>
                </div>
            </div>
            <div class="rt" v-if="!$vuetify.breakpoint.xs">
                <div>
                    <h4 class="text-h4">종량제 수수료율</h4>
                    <v-data-table :headers="chargeRateInfoGroupListHeader" :items="chargeRateInfoSGroupList"
                        :items-per-page="50" hide-default-footer no-data-text="데이터가 없습니다.">
                        <template #[`item.sales_discount_rate`]="{ item }">
                            <span>
                                {{ item.sales_discount_rate }}%
                            </span>
                        </template>
                    </v-data-table>
                </div>
                <div>
                    <h4 class="text-h4">정액제 수수료율</h4>
                    <v-data-table :headers="chargeRateInfoGroupListHeader" :items="chargeRateInfoVGroupList"
                        :items-per-page="50" hide-default-footer no-data-text="데이터가 없습니다.">
                        <template #[`item.sales_discount_rate`]="{ item }">
                            <span>
                                {{ item.sales_discount_rate }}%
                            </span>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>
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
            // if (this.getChargeConfirm.res.success == "SUCC" && ((this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.face_price - (this.getChargeConfirm.res.face_price * (this.getChargeConfirm.res.sales_discount_rate / 100))) > 0) ||
            //     (this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.rate_amt - (this.getChargeConfirm.res.rate_amt * (this.getChargeConfirm.res.sales_discount_rate / 100))) > 0))) {
            //     return false;
            // } else {
            //     return true;
            // }
            if (this.getChargeConfirm.res.success == "SUCC") {
                if (this.getChargeConfirm.res.charge_type == "SMARTEL") {
                    if (this.getChargeConfirm.res.vs_type == "V") {
                        if (this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.rate_amt - (this.getChargeConfirm.res.rate_amt * (this.getChargeConfirm.res.sales_discount_rate / 100))) >= 0) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if (this.getChargeConfirm.res.vs_type == "S") {
                        // 스마텔 개발 진행 후 적용
                        // if (this.GET_SESSION_INFO().userInfo.deposit_amount - this.selectedAmount >= 0) {
                        //     return false;
                        // } else {
                        //     return true;
                        // }
                        return true;
                    } else {
                        return true;
                    }

                } else if (this.getChargeConfirm.res.charge_type == "POWERCALL") {
                    if (this.getChargeConfirm.res.vs_type == "V") {
                        if (this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.face_price - (this.getChargeConfirm.res.face_price * (this.getChargeConfirm.res.sales_discount_rate / 100))) >= 0) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if (this.getChargeConfirm.res.vs_type == "S") {
                        if (this.GET_SESSION_INFO().userInfo.deposit_amount - this.selectedAmount >= 0) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        },
        searchDisabled() {
            if ((this.phoneNumber == "" || this.phoneNumber == null) || this.$refs.refPhoneNumber.valid == false) {
                return true
            } else {
                return false
            }
        }
    },
    mounted() {
        this.getChargeRateInfoVGroupListAPI("V");
        this.getChargeRateInfoSGroupListAPI("S");
    },
    data() {
        return {
            phoneNumber: "",
            expAgencyCodeArr: ["IC180000", "IC180001", "IC290000", "IC900035"],
            rules: {
                inputPhoneNum: {
                    length: value => value && value.length == 11 || '-를 제외한 휴대폰 번호를 입력해주세요',
                    charValid: value => /^[0-9]*$/.test(value) || '숫자만 입력하세요.'
                },
            },
            amountList: [
                { amount_text: "1만원", amount_value: "10000" },
                { amount_text: "2만원", amount_value: "20000" },
                { amount_text: "3만원", amount_value: "30000" },
                { amount_text: "4만원", amount_value: "40000" },
                { amount_text: "5만원", amount_value: "50000" },
            ],
            chargeRateInfoGroupListHeader: [
                {
                    text: '통신사',
                    value: 'mvno_name',
                    sortable: false,
                    width: '10%'
                },
                {
                    text: '수수료율',
                    value: 'sales_discount_rate',
                    sortable: false,
                    width: '7%',
                    align: 'right',
                }
            ],
            getChargeRateInfoGroupList: {
                req: {
                    rate_type: "",
                    goods_code: ""
                }
            },
            chargeRateInfoVGroupList: [{
                mvno_name: "",
                sales_discount_rate: ""
            }],
            chargeRateInfoSGroupList: [{
                mvno_name: "",
                sales_discount_rate: ""
            }],
            amount: 0,
            selectedAmount: "0",
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
        getChargeRateInfoSGroupListAPI(rate_type) {
            this.getChargeRateInfoGroupList.req.rate_type = rate_type;
            if (this.expAgencyCodeArr.includes(this.GET_SESSION_INFO().userInfo.agency_code)) {
                this.getChargeRateInfoGroupList.req.goods_code = "EXCP1";
            } else {
                this.getChargeRateInfoGroupList.req.goods_code = "BASIC";
            }

            this.$axios.post(this.$BASE_URL + '/charge/rateinfogrouplist', this.getChargeRateInfoGroupList.req).then(res => {
                this.chargeRateInfoSGroupList = res.data
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })

        },
        getChargeRateInfoVGroupListAPI(rate_type) {
            this.getChargeRateInfoGroupList.req.rate_type = rate_type;
            if (this.expAgencyCodeArr.includes(this.GET_SESSION_INFO().userInfo.agency_code)) {
                this.getChargeRateInfoGroupList.req.goods_code = "EXCP1";
            } else {
                this.getChargeRateInfoGroupList.req.goods_code = "BASIC";
            }

            this.$axios.post(this.$BASE_URL + '/charge/rateinfogrouplist', this.getChargeRateInfoGroupList.req).then(res => {
                this.chargeRateInfoVGroupList = res.data;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })

        },
        search() {
            this.getChargeConfirm.req.phoneNo = this.phoneNumber;
            this.getChargeConfirm.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            // this.$axios.post(this.$BASE_URL + '/smatelchargesearch', this.smatelChargeSearch.req).then(res => {
            this.$axios.post(this.$BASE_URL + '/charge/search', this.getChargeConfirm.req).then(res => {
                this.getChargeConfirm.res = res.data;
                if (this.getChargeConfirm.res.success != "SUCC") {
                    this.$swal.fire(this.getChargeConfirm.res.desc, "관리자에게 문의하세요." + this.getChargeConfirm.res.desc, "error");
                    // alert(this.getChargeConfirm.res.error_code + " " + this.getChargeConfirm.res.desc);
                } else {
                    if (this.getChargeConfirm.res.charge_type == 'SMARTEL') {
                        if (this.getChargeConfirm.res.vs_type == "V") {
                            this.amount = Math.round(this.getChargeConfirm.res.rate_amt - (this.getChargeConfirm.res.rate_amt *
                                (this.getChargeConfirm.res.sales_discount_rate / 100)));
                        } else {
                            this.selectedAmount = "10000";
                            this.amount = this.selectedAmount;

                            this.$swal("준비중", "현재 스마텔 종량요금제는 준비중입니다.", "error");
                        }
                    } else {
                        if (this.getChargeConfirm.res.vs_type == "V") {
                            this.amount = Math.round(this.getChargeConfirm.res.face_price - (this.getChargeConfirm.res.face_price *
                                (this.getChargeConfirm.res.sales_discount_rate / 100)));
                        } else {
                            this.selectedAmount = "10000";
                            this.amount = this.selectedAmount;
                        }
                    }
                }
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        sAmountChange(value) {
            this.amount = this.selectedAmount;
        },
        chargeConfirm() {
            if (this.amount < 0) {
                return;
            }
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
            this.smatelFeeCharge.req.discount_amt = Math.round(this.getChargeConfirm.res.rate_amt * (this.getChargeConfirm.res.sales_discount_rate / 100));
            this.smatelFeeCharge.req.org_id = "pjsmoon";
            this.smatelFeeCharge.req.rate_nm = this.getChargeConfirm.res.rate_nm;
            this.smatelFeeCharge.req.msg_id = "RCG";
            this.smatelFeeCharge.req.rcg_type = this.getChargeConfirm.res.vs_type;
            this.smatelFeeCharge.req.card_type = this.getChargeConfirm.res.card_type;
            this.smatelFeeCharge.req.current_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount;
            // this.smatelFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - (this.smatelFeeCharge.req.rcg_amt - this.smatelFeeCharge.req.discount_amt);
            this.smatelFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - this.amount;

            this.$axios.post(this.$BASE_URL + '/smatelfeecharge', this.smatelFeeCharge.req).then(res => {
                this.smatelFeeCharge.res = res.data;
                this.loginInfo.userInfo = this.GET_SESSION_INFO().userInfo;
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
            this.powercallFeeCharge.req.card_type = this.getChargeConfirm.res.card_type;
            this.powercallFeeCharge.req.current_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount;
            this.powercallFeeCharge.req.rcg_type = this.getChargeConfirm.res.vs_type;
            this.loginInfo.userInfo = this.GET_SESSION_INFO().userInfo;
            if (this.getChargeConfirm.res.vs_type == "V") {
                this.powercallFeeCharge.req.phone_no = this.getChargeConfirm.res.phone_no;
                this.powercallFeeCharge.req.rcg_amt = this.getChargeConfirm.res.face_price;
                this.powercallFeeCharge.req.discount_amt = Math.round(this.getChargeConfirm.res.face_price * (this.getChargeConfirm.res.sales_discount_rate / 100));
                this.powercallFeeCharge.req.rate_nm = this.getChargeConfirm.res.card_name;
                this.powercallFeeCharge.req.telco = this.getChargeConfirm.res.mvno_name;
                // this.powercallFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.face_price - this.powercallFeeCharge.req.discount_amt);
                // this.powercallFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - this.amount;
            } else {
                this.powercallFeeCharge.req.phone_no = this.phoneNumber;
                this.powercallFeeCharge.req.rcg_amt = this.amount;
                this.powercallFeeCharge.req.discount_amt = "";
                this.powercallFeeCharge.req.charge_cnt = this.selectedAmount / 10000;
                this.powercallFeeCharge.req.rate_nm = "";
                this.powercallFeeCharge.req.telco = "";
            }

            if (this.getChargeConfirm.res.vs_type == "V") {
                this.$axios.post(this.$BASE_URL + '/powercall/vcharge', this.powercallFeeCharge.req).then(res => {
                    this.powercallFeeCharge.res = res.data;
                    if (this.powercallFeeCharge.res.success == "SUCC") {
                        this.$swal.fire("성공", "충전 되었습니다.", "success");
                        this.loginInfo.userInfo.deposit_amount = this.smatelFeeCharge.req.result_deposit;
                        this.ACT_SESSION_INFO(this.loginInfo);
                        this.$router.push('/charge/history');
                    } else {
                        this.$swal.fire("실패", "충전에 실패하였습니다. 관리자에게 문의하세요.", "error");
                    }
                }).catch(err => {
                    this.GLOBALFNC.err.commonErr(err)
                })
            } else {
                this.$axios.post(this.$BASE_URL + '/powercall/scharge', this.powercallFeeCharge.req).then(res => {
                    this.powercallFeeCharge.res = res.data;
                    if (this.powercallFeeCharge.res.success == "SUCC") {
                        this.$swal.fire("성공", "충전 되었습니다.", "success");
                        this.loginInfo.userInfo.deposit_amount = this.powercallFeeCharge.res.result_amount;
                        this.ACT_SESSION_INFO(this.loginInfo);
                        this.$router.push('/charge/history');
                    } else {
                        this.$swal.fire("실패", "충전에 실패하였습니다. 관리자에게 문의하세요.", "error");
                    }
                }).catch(err => {
                    this.GLOBALFNC.err.commonErr(err)
                })
            }
            // this.$axios.post(this.$BASE_URL + '/powercall/charge', this.powercallFeeCharge.req).then(res => {
            //     this.powercallFeeCharge.res = res.data;
            // }).catch(err => {
            //     this.GLOBALFNC.err.commonErr(err)
            // })
            // this.$axios.post(this.$BASE_URL + '/powercall/scharge', this.powercallFeeCharge.req).then(res => {
            //     this.powercallFeeCharge.res = res.data;
            // }).catch(err => {
            //     this.GLOBALFNC.err.commonErr(err)
            // })
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';

::v-deep {
    .v-data-table {

        th,
        td {
            padding: 0 26px !important;
        }
    }
}
</style>