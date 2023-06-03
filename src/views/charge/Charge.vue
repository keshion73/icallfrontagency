<template>
    <div class="charge-page">
        <LoadingComponents :loading="loading" :msg="msg">
        </LoadingComponents>
        <ModalComponents :icon="iconName" :title="modalTitle" v-if="upModal">
            <p slot="mes" v-html="msgHtml"></p>
            <div slot="btn">
                <v-btn color="btncolor" x-large @click.prevent="modalConfirm">확인</v-btn>
            </div>
        </ModalComponents>
        <div class="charge-cont">
            <div class="container noti-cont" v-if="!$vuetify.breakpoint.xs">
                <div class="charge-noti">
                    <h4 class="text-h4">충전시 유의사항</h4>
                    <p>
                        타사 충전 문의 : 02.811.3729<br>운영시간 : 오전 10시 - 오후 9시<br><br>
                        전용계좌 2만원부터 입금가능<br>(입금시 1분 소요, 재 로그인 필수)<br>
                        회사에따라 충전 시간이 다를 수 있습니다.<br><br>
                        모빙 정액요금제 충전 불가<br>
                        일반요금제 충전 취소 불가<br><br>
                        충전 취소는 상황에따라 불가 할 수 있으며, <br>
                        취소 시 시간이 다소 걸릴수 있습니다.
                    </p>
                </div>
            </div>
            <h2 class="text-h2">{{ $route.name }}</h2>
            <v-form v-if="!$vuetify.breakpoint.xs">
                <div class="charge-info">
                    <h4 class="text-h4">예치금 잔액</h4>
                    <p><span>{{
                        GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount
                        ) }}</span><span>원</span></p>
                </div>
                <!-- <div>
                        <h4 class="text-h4">예치금 잔액</h4>
                        <p class="font-weight-bolder primary--text text-h6">{{
                            GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount
                            ) }}원</p>
                    </div> -->
                <div>
                    <h4 class="text-h4">폰번호</h4>
                    <div class="input-ph">
                        <v-text-field placeholder="휴대폰번호" outlined v-model="phoneNumber" ref="refPhoneNumber"
                            :rules="[rules.inputPhoneNum.length, rules.inputPhoneNum.charValid]" />
                        <v-btn color="primary" @click="search()" :disabled="searchDisabled">확인</v-btn>
                        <!-- <v-btn flat color="primary" @click="search()" :disabled="searchDisabled">확인</v-btn> -->
                    </div>
                </div>
                <div class="charge-bg">
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
                        <div class="d-flex">
                            <!-- <span v-if="getChargeConfirm.res.charge_type == 'SMARTEL'"
                                class="mark">스마텔</span> -->
                            <p v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                                <span class="mark">스마텔</span>
                                {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                            </p>
                            <p
                                v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                                <span class="mark">스마텔</span>
                                {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                            </p>
                            <p
                                v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'">
                                <span class="mark mark-oth"><img src="@/assets/images/common/icon-infored.svg" alt="">타사
                                    상품</span>
                            </p>
                            <p
                                v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                                {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}
                                <span class="mark mark-oth"><img src="@/assets/images/common/icon-infored.svg" alt="">타사
                                    상품</span>
                            </p>
                            <p v-else style="color:#AAB5C9" class="info-mes">폰 번호 입력
                                후, 확인버튼을 눌러주세요.</p>
                            <!-- <span v-if="getChargeConfirm.res.charge_type == 'POWERCALL'" class="mark mark-oth"><img
                                    src="@/assets/images/common/icon-infored.svg" alt="">타사 상품</span> -->
                        </div>
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
                        <p v-else class="font-weight-bolder" style="font-size: 2rem;color:#666">{{
                            GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (selectedAmount - (selectedAmount * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                            class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder" style="font-size: 2rem;color:#666">{{
                            GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - (getChargeConfirm.res.rate_amt - (getChargeConfirm.res.rate_amt * (getChargeConfirm.res.sales_discount_rate / 100))) < 0"
                            class="font-weight-bolder" style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder" style="font-size: 2rem;color:#666">{{
                            GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'">
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p v-if="GET_SESSION_INFO().userInfo.deposit_amount - selectedAmount < 0" class="font-weight-bolder"
                            style="color:#FF0000">예치금이 부족합니다.</p>
                        <p v-else class="font-weight-bolder" style="font-size: 2rem;color:#666">{{
                            GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <div v-else>
                        <h4 class="text-h4">예치금 차감액</h4>
                        <p class="font-weight-bolder">{{ GLOBALFNC.expression.commonAmount(amount) }} 원</p>
                    </div>
                    <v-btn @click="chargeConfirm()" color="btncolor" x-large block :disabled="chargeDisabled">충전</v-btn>
                    <!-- <v-btn @click="chargeConfirm()" flat color="primary" x-large block
                            :disabled="chargeDisabled">충전</v-btn> -->
                </div>
            </v-form>
            <div v-if="$vuetify.breakpoint.xs">
                <v-form action="">
                    <div class="charge-info">
                        <h4 class="text-h4">예치금 잔액</h4>
                        <p><span>{{
                            GLOBALFNC.expression.commonAmount(GET_SESSION_INFO().userInfo.deposit_amount
                            ) }}</span><span>원</span></p>
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
                            <v-btn color="primary" @click="search()" :disabled="searchDisabled">확인</v-btn>
                            <!-- <v-btn flat color="primary" @click="search()" :disabled="searchDisabled">확인</v-btn> -->
                        </div>
                    </div>
                    <div class="charge-bg">
                        <div>
                            <h4 class="text-h4">고객정보</h4>
                            <div class="d-flex">
                                <!--입력전-->
                                <p
                                    v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
                                    <span class="mark">스마텔</span>
                                    {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                                </p>
                                <p
                                    v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'S'">
                                    <span class="mark">스마텔</span>
                                    {{ getChargeConfirm.res.telco }} {{ getChargeConfirm.res.rate_nm }}
                                </p>
                                <p v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'S'"
                                    class="font-weight-bolder" style="color:#FF0000">
                                    <span class="mark mark-oth"><img src="@/assets/images/common/icon-infored.svg" alt="">타사
                                        상품</span>
                                </p>
                                <p
                                    v-else-if="getChargeConfirm.res.charge_type == 'POWERCALL' && getChargeConfirm.res.vs_type == 'V'">
                                    <span class="font-weight-bolder" style="color:#FF0000"><span class="mark mark-oth"><img
                                                src="@/assets/images/common/icon-infored.svg" alt="">타사 상품</span></span>
                                    <br>
                                    {{ getChargeConfirm.res.card_name }} {{ getChargeConfirm.res.data }}
                                </p>
                                <p v-else style="color:#AAB5C9" class="info-mes">폰 번호 입력
                                    후, 확인버튼을 눌러주세요.</p>
                            </div>
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
                        <div v-if="getChargeConfirm.res.charge_type == 'SMARTEL' && getChargeConfirm.res.vs_type == 'V'">
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
                        <v-btn @click="chargeConfirm()" color="btncolor" x-large block :disabled="chargeDisabled">충전</v-btn>
                        <!-- <v-btn @click="chargeConfirm()" flat color="primary" x-large block
                            :disabled="chargeDisabled">충전</v-btn> -->
                        <div class="container noti-cont">
                            <div class="charge-noti">
                                <h4 class="text-h4">충전시 유의사항</h4>
                                <p>
                                    타사 충전 문의 : 02.811.3729<br>운영시간 : 오전 10시 - 오후 8시<br><br>
                                    전용계좌 2만원부터 입금가능<br>(입금시 1분 소요, 재 로그인 필수)<br>
                                    회사에따라 충전 시간이 다를 수 있습니다.<br><br>
                                    모빙 정액요금제 충전 불가<br>
                                    일반요금제 충전 취소 불가<br><br>
                                    충전 취소는 상황에따라 불가 할 수 있으며, <br>
                                    취소 시 시간이 다소 걸릴수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </v-form>
            </div>
            <div @click="dialog = true" class="btn-sales">
                <img src="@/assets/images/page/charge/btn-sales.png" alt="">
            </div>
            <v-dialog v-model="dialog" width="360px">
                <v-card>
                    <div class="d-flex">
                        <h4 class="text-h2">수수료율</h4>
                        <v-btn @click="dialog = false"><img src="@/assets/images/common/icon-x.svg" alt=""></v-btn>
                    </div>
                    <v-tabs v-model="tab" height="40px" hideSlider>
                        <v-tab>정액제</v-tab>
                        <v-tab>종량제</v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item :transition="false">
                            <div>
                                <v-data-table :headers="chargeRateInfoGroupListHeader" :items="chargeRateInfoSGroupList"
                                    disable-pagination hide-default-footer no-data-text="데이터가 없습니다." mobile-breakpoint="0">
                                    <template #[`item.sales_discount_rate`]="{ item }">
                                        <span>
                                            {{ item.sales_discount_rate }}%
                                        </span>
                                    </template>
                                </v-data-table>
                                <!-- <v-data-table :headers="headers" :items="arr1" hide-default-footer no-data-text="데이터가 없습니다."
                  disable-pagination>
                  <template #[`item.sales_discount_rate`]="{ item }">
                    <span>
                      {{ item.sales_discount_rate }}%
                    </span>
                  </template>
                </v-data-table> -->
                            </div>
                        </v-window-item>
                        <v-window-item :transition="false">
                            <div>
                                <!-- <v-data-table :headers="headers" :items="arr2" hide-default-footer no-data-text="데이터가 없습니다."
                  disable-pagination>
                  <template #[`item.sales_discount_rate`]="{ item }">
                    <span>
                      {{ item.sales_discount_rate }}%
                    </span>
                  </template>
                </v-data-table> -->
                                <v-data-table :headers="chargeRateInfoGroupListHeader" :items="chargeRateInfoVGroupList"
                                    disable-pagination hide-default-footer no-data-text="데이터가 없습니다." mobile-breakpoint="0">
                                    <template #[`item.sales_discount_rate`]="{ item }">
                                        <span>
                                            {{ item.sales_discount_rate }}%
                                        </span>
                                    </template>
                                </v-data-table>
                            </div>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-dialog>
        </div>

        <!-- <div class="rt" v-if="!$vuetify.breakpoint.xs">
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
            </div> -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingComponents from '@/components/LoadingComponents.vue'
import ModalComponents from '../../components/ModalComponents.vue'

export default {
    name: "charge",
    components: {
        LoadingComponents,
        ModalComponents
    },
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
            tab: null,
            dialog: false,
            loading: false,
            msg: "",
            upModal: false,
            iconName: "",
            modalTitle: "",
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
            this.loading = true;
            this.msg = "가입자 조회중 입니다."
            this.getChargeConfirm.req.phoneNo = this.phoneNumber;
            this.getChargeConfirm.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            // this.$axios.post(this.$BASE_URL + '/smatelchargesearch', this.smatelChargeSearch.req).then(res => {
            this.$axios.post(this.$BASE_URL + '/charge/search', this.getChargeConfirm.req).then(res => {
                this.loading = false;
                this.getChargeConfirm.res = res.data;
                if (this.getChargeConfirm.res.success != "SUCC") {

                    //this.$swal.fire(this.getChargeConfirm.res.desc, "관리자에게 문의하세요." + this.getChargeConfirm.res.desc, "error");
                    // alert(this.getChargeConfirm.res.error_code + " " + this.getChargeConfirm.res.desc);
                    this.iconName = "icon03"
                    this.modalTitle = "가입자 조회 실패"
                    this.msgHtml = "관리자에게 문의하세요. <br>" + this.getChargeConfirm.res.desc;
                    this.upModal = true;
                } else {
                    if (this.getChargeConfirm.res.charge_type == 'SMARTEL') {
                        if (this.getChargeConfirm.res.vs_type == "V") {
                            this.amount = Math.round(this.getChargeConfirm.res.rate_amt - (this.getChargeConfirm.res.rate_amt *
                                (this.getChargeConfirm.res.sales_discount_rate / 100)));
                        } else {
                            this.selectedAmount = "10000";
                            this.amount = this.selectedAmount;
                            this.iconName = "icon02"
                            this.modalTitle = "스마텔 종량제"
                            this.msgHtml = "현재 스마텔 종량요금제는 준비중입니다.";
                            this.upModal = true;

                            //this.$swal("준비중", "현재 스마텔 종량요금제는 준비중입니다.", "error");
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
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        sAmountChange() {
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
            this.loading = true;
            this.msg = "충전 진행중 입니다."
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
                this.loading = false;
                this.smatelFeeCharge.res = res.data;
                this.loginInfo.userInfo = this.GET_SESSION_INFO().userInfo;
                if (this.smatelFeeCharge.res.rslt_cd == "0000") {
                    this.loginInfo.userInfo.deposit_amount = this.smatelFeeCharge.req.result_deposit;
                    this.ACT_SESSION_INFO(this.loginInfo);
                    this.iconName = "icon01"
                    this.modalTitle = "성공"
                    this.msgHtml = "충전 되었습니다.";
                    this.upModal = true;
                    // this.$swal.fire("성공", "충전 되었습니다.", "success");
                    // this.loginInfo.userInfo.deposit_amount = this.smatelFeeCharge.req.result_deposit;
                    // this.ACT_SESSION_INFO(this.loginInfo);
                    // this.$router.push('/charge/history');
                } else {
                    this.iconName = "icon03"
                    this.modalTitle = "실패"
                    this.msgHtml = "충전에 실패하였습니다.<br> 관리자에게 문의하세요.";
                    this.upModal = true;
                    //this.$swal.fire("실패", "충전에 실패하였습니다. 관리자에게 문의하세요", "error");
                }
            }).catch(err => {
                this.loading = false;
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        powercallCharge() {
            this.loading = true;
            this.msg = "타사 충전 진행중 입니다."
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
                this.powercallFeeCharge.req.result_deposit = this.GET_SESSION_INFO().userInfo.deposit_amount - (this.getChargeConfirm.res.face_price - this.powercallFeeCharge.req.discount_amt);
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
                    this.loading = false;
                    this.powercallFeeCharge.res = res.data;
                    if (this.powercallFeeCharge.res.success == "SUCC") {
                        this.loginInfo.userInfo.deposit_amount = this.powercallFeeCharge.req.result_deposit;
                        this.ACT_SESSION_INFO(this.loginInfo);
                        this.iconName = "icon01"
                        this.modalTitle = "성공"
                        this.msgHtml = "충전 되었습니다.";
                        this.upModal = true;
                        // this.$swal.fire("성공", "충전 되었습니다.", "success");
                        // this.loginInfo.userInfo.deposit_amount = this.powercallFeeCharge.req.result_deposit;
                        // this.ACT_SESSION_INFO(this.loginInfo);
                        // this.$router.push('/charge/history');
                    } else {
                        this.iconName = "icon03"
                        this.modalTitle = "실패"
                        this.msgHtml = "충전에 실패하였습니다.<br> 관리자에게 문의하세요.";
                        this.upModal = true;
                        // this.$swal.fire("실패", "충전에 실패하였습니다. 관리자에게 문의하세요.", "error");
                    }
                }).catch(err => {
                    this.loading = false;
                    this.GLOBALFNC.err.commonErr(err)
                })
            } else {
                this.$axios.post(this.$BASE_URL + '/powercall/scharge', this.powercallFeeCharge.req).then(res => {
                    this.loading = false;
                    this.powercallFeeCharge.res = res.data;
                    if (this.powercallFeeCharge.res.success == "SUCC") {
                        this.loginInfo.userInfo.deposit_amount = this.powercallFeeCharge.res.result_amount;
                        this.ACT_SESSION_INFO(this.loginInfo);
                        this.iconName = "icon01"
                        this.modalTitle = "성공"
                        this.msgHtml = "충전 되었습니다.";
                        this.upModal = true;
                        // this.$swal.fire("성공", "충전 되었습니다.", "success");
                        // this.loginInfo.userInfo.deposit_amount = this.powercallFeeCharge.res.result_amount;
                        // this.ACT_SESSION_INFO(this.loginInfo);
                        // this.$router.push('/charge/history');
                    } else {
                        this.iconName = "icon03"
                        this.modalTitle = "실패"
                        this.msgHtml = "충전에 실패하였습니다.<br> 관리자에게 문의하세요.";
                        this.upModal = true;
                        // this.$swal.fire("실패", "충전에 실패하였습니다. 관리자에게 문의하세요.", "error");
                    }
                }).catch(err => {
                    this.loading = false;
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
        },
        modalConfirm() {
            if (this.modalTitle == "성공") {
                this.$router.push('/charge/history');
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

::v-deep {
    .v-data-table {
        height: 560px;
        overflow: hidden auto;
        scrollbar-width: thin;
        scrollbar-color: #00648A #ffffff;

        .v-data-table__wrapper {
            width: 90%;
            overflow: hidden;
        }

        th,
        td {
            height: 32px !important;
            padding: 0 26px !important;
            font-size: 1.2rem !important;
        }

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #00648A;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }

    .v-dialog {
        overflow: hidden;
        box-shadow: none;

        .v-card {
            border-radius: 12px;
            padding: 16px 0 16px 30px;

            >.d-flex {
                justify-content: space-between;
                padding-right: 30px;

                .v-btn {
                    background: none;
                    padding: 0;
                    min-width: auto
                }
            }

            .v-tabs {
                margin: 16px 0;
            }

            .v-tab {
                font-size: 1.4rem;
                border-radius: 100px;
                width: 105px;

                &--active {
                    background: #00648A;
                    color: #fff;

                    &::before {
                        display: none;
                    }
                }

                &:not(.v-tab--active) {
                    color: #000 !important
                }

                &::before {
                    border-radius: 100px;
                }
            }

            .v-window {
                overflow: visible;
            }

        }
    }
}
</style>