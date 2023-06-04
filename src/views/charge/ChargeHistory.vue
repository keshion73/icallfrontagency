<template>
    <div class="chargehis-page">
        <div class="route-title">
            <div class="container">
                <h2 class="text-h2">{{ $route.name }}</h2>
            </div>
        </div>
        <div class="chargehis-input">
            <div class="container">
                <div class="input-date d-flex">
                    <p>기간</p>
                    <div class="d-flex align-center">
                        <div>
                            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                                :return-value.sync="searchData.start_date" transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="searchData.start_date" v-bind="attrs" outlined
                                        prepend-inner-icon="fa-" readonly v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker @change="s_date_change(searchData.start_date)"
                                    v-model="searchData.start_date" no-title scrollable :max="searchData.end_date"
                                    :weekday-format="getDay" :month-format="getMonth" :title-date-format="getMonth"
                                    :header-date-format="getHeaderTitleMonth">
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <p style="margin:0 5px">~</p>
                        <div>
                            <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                                :return-value.sync="searchData.end_date" transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="searchData.end_date" prepend-inner-icon="fa-" readonly
                                        v-bind="attrs" v-on="on" outlined>
                                    </v-text-field>
                                </template>
                                <v-date-picker @change="e_date_change(searchData.end_date)" v-model="searchData.end_date"
                                    no-title scrollable :min="searchData.start_date" :max="date" :weekday-format="getDay"
                                    :month-format="getMonth" :title-date-format="getMonth"
                                    :header-date-format="getHeaderTitleMonth">
                                </v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <p>충전번호</p>
                    <v-text-field ref="refAgencyName" v-model="searchData.charge_key" outlined placeholder="숫자만 입력해 주세요.">
                    </v-text-field>
                </div>
                <div class="d-flex">
                    <p>전화번호</p>
                    <v-text-field ref="refAgencyCode" v-model="searchData.phone_number" placeholder="숫자만 입력해 주세요." outlined>
                    </v-text-field>
                </div>
                <div>
                    <v-btn color="btncolor" @click="getChargeHistoryListAPI()">조회</v-btn>
                </div>
            </div>
        </div>
        <div class="list-table-wrap">
            <div>
                <v-data-table :headers="chargeHeaders" :items="chargeHistoryList"
                    :class="$vuetify.breakpoint.xs ? 'mobile-table' : ''" :page.sync="page" hide-default-footer
                    @page-count="pageCount = $event" :items-per-page="itemsPerPage" mobile-breakpoint="0"
                    no-data-text="데이터가 없습니다.">
                    <template #[`item.charge_amt`]="{ item }">
                        <span>
                            {{ GLOBALFNC.expression.commonAmount(item.charge_amt) }}
                        </span>
                    </template>
                    <template #[`item.apply_amt`]="{ item }">
                        <span>
                            {{ GLOBALFNC.expression.commonAmount(item.apply_amt) }}
                        </span>
                    </template>
                </v-data-table>
                <v-pagination :total-visible="7" active-color="#399FC7" color="#4c4c4c" v-model="page" :length="pageCount"
                    circle></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: "chargehistory",
    watch: {
    },
    computed: {
    },
    mounted() {
        this.setStartDate();
        this.getChargeHistoryListAPI();
    },
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            getDay(date) {
                const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
                let i = new Date(date).getDay(date);
                return daysOfWeek[i];
            },
            getMonth(date) {
                const monthName = [
                    '1월',
                    '2월',
                    '3월',
                    '4월',
                    '5월',
                    '6월',
                    '7월',
                    '8월',
                    '9월',
                    '10월',
                    '11월',
                    '12월',
                ];

                let i = new Date(date).getMonth(date);
                return monthName[i];
            },
            getHeaderTitleMonth(date) {
                const current = new Date(date);
                const monthName = [
                    '1월',
                    '2월',
                    '3월',
                    '4월',
                    '5월',
                    '6월',
                    '7월',
                    '8월',
                    '9월',
                    '10월',
                    '11월',
                    '12월',
                ];

                let i = current.getMonth(date);
                return current.getFullYear() + '년 ' + monthName[i];
            },
            chargeHeaders: [
                {
                    text: "순번",
                    // align: "start",
                    sortable: true,
                    align: "center",
                    value: "charge_history_num",
                },
                {
                    text: "충전번호",
                    align: "center",
                    sortable: false,
                    value: "charge_history_key",
                },
                {
                    text: "전화번호",
                    value: "phone_number",
                    align: "center",
                    sortable: true,
                },
                {
                    text: "요금제",
                    value: "charge_rate_nm",
                    align: "start",
                },
                {
                    text: "충전금액",
                    value: "charge_amt",
                    sortable: true,
                    align: "right",
                },
                {
                    text: "예치금적용액",
                    value: "apply_amt",
                    sortable: true,
                    align: "right",
                },
                {
                    text: "충전일",
                    value: "charge_date_time",
                    align: "center",
                    sortable: false,
                },
                {
                    text: "충전결과",
                    value: "charge_result_msg",
                    align: "center",
                    sortable: true,
                },

            ],
            page: 1,
            pageCount: 15,
            itemsPerPage: 20,
            getChargeHistoryList: {
                req: {
                    agency_code: "",
                    start_date: "",
                    end_date: "",
                    phone_number: "",
                    amt: "",
                    charge_key: "",
                },
                res: {
                    charge_history_num: "",
                    charge_history_key: "",
                    agency_code: "",
                    phone_number: "",
                    charge_amt: "",
                    charge_rcg_type: "",
                    charge_result_msg: "",
                    charge_date: "",
                }
            },
            chargeHistoryList: [],
            searchData: {
                start_date: "",
                end_date: new Date().toISOString().substr(0, 10),
                phone_number: "",
                charge_key: "",
            }
        };
    },
    methods: {
        ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
        s_date_change(v) {
            this.searchData.start_date = v;
            this.menu1 = false;
            this.$refs.menu1.save(v);
        },
        e_date_change(v) {
            this.searchData.end_date = v;
            this.menu2 = false;
            this.$refs.menu2.save(v);
        },
        setStartDate() {
            var now = new Date();
            this.searchData.start_date = new Date(now.setDate(now.getDate() - 1)).toISOString().substr(0, 10);
        },
        getChargeHistoryListAPI() {
            this.getChargeHistoryList.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.getChargeHistoryList.req.start_date = this.searchData.start_date.replace(/-/gi, "");
            this.getChargeHistoryList.req.end_date = this.searchData.end_date.replace(/-/gi, "");
            this.getChargeHistoryList.req.phone_number = this.searchData.phone_number;
            this.getChargeHistoryList.req.charge_key = this.searchData.charge_key;
            this.$axios.post(this.$BASE_URL + '/charge/historylist', this.getChargeHistoryList.req).then(res => {
                this.chargeHistoryList = res.data;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';
</style>