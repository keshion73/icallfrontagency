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
                    <p>USIM요청번호</p>
                    <v-text-field ref="refRefundKey" v-model="searchData.request_key" placeholder="USIM요청번호를 입력하세요."
                        outlined>
                    </v-text-field>
                </div>
                <div class="d-flex">
                    <p>진행상황</p>
                    <v-select ref="refSelectCodeList" v-model="searchData.selectedCode" :items="selectCodeList"
                        item-text="code_name" item-value="code_value" outlined single-line dense
                        :menu-props="{ offsetY: true }">
                    </v-select>
                </div>
                <div>
                    <v-btn color="btncolor" @click="getUsimRequestListAPI()">조회</v-btn>
                </div>
            </div>
        </div>
        <div class="list-table-wrap">
            <div>
                <v-data-table :headers="usimRequestHeaders" :items="usimRequestList" class="table usim_history_table"
                    :page.sync="page" hide-default-footer @page-count="pageCount = $event" :items-per-page="itemsPerPage"
                    mobile-breakpoint="0" single-select>
                    <template #[`item.progress_name`]="{ item }">
                        <span :class="getClass(item.progress_name)">{{ item.progress_name }}</span>
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
    name: "usim-history",
    watch: {
    },
    computed: {

    },
    mounted() {
        this.setStartDate();
        this.getCodeListAPI("RFPC0");
        this.getUsimRequestListAPI();
    },
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            orgInfoKey: "",
            resultReason: "",
            clickStatus: false,
            selectedCodeDisabled: false,
            selectCodeList: [],
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
            usimRequestHeaders: [
                {
                    text: "USIM요청번호",
                    align: "center",
                    cellClass: "font-weight-black ps-2 pe-2",
                    sortable: true,
                    value: "usim_request_info_key",
                    class:
                        "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '10%'
                },
                {
                    text: "SKT",
                    value: "skt_usim_count",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '4%'
                },
                {
                    text: "LGU",
                    value: "lgu_usim_count",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '4%'
                },
                {
                    text: "KT",
                    value: "kt_usim_count",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '4%'
                },
                {
                    text: "사유",
                    value: "reason",
                    align: "left",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '16%'
                },
                {
                    text: "결과 사유",
                    value: "result_reason",
                    align: "left",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '16%'
                },
                {
                    text: "진행상황",
                    value: "progress_name",
                    sortable: true,
                    align: "center",
                    class: "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '7%'
                },
                {
                    text: "요청일",
                    value: "request_date_time",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '11%'
                },

            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 20,
            getUsimRequestList: {
                req: {
                    agency_code: "",
                    start_date: "",
                    end_date: "",
                    request_key: "",
                    progress_code: "",
                },
                res: {
                    usim_request_info_key: "",
                    agency_code: "",
                    skt_usim_count: "",
                    lgu_usim_count: "",
                    kt_usim_count: "",
                    reason: "",
                    result_reason: "",
                    request_date_time: "",
                    agency_name: "",
                    progress_code: "",
                    progress_name: "",
                }
            },
            usimRequestList: [],
            searchData: {
                start_date: "",
                end_date: new Date().toISOString().substr(0, 10),
                request_key: "",
                selectedCode: "",
            },
            getCodeList: {
                req: {
                    code_group: ""
                },
                res: {}
            },
            updateDepositRefundRequest: {
                req: {
                    result_reason: "",
                    progress_code: "",
                    reg_id: "",
                    reg_ip: "",
                    deposit_refund_info_key: "",
                },
                res: {

                }
            },
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
        getUsimRequestListAPI() {
            this.getUsimRequestList.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.getUsimRequestList.req.start_date = this.searchData.start_date.replace(/-/gi, "");
            this.getUsimRequestList.req.end_date = this.searchData.end_date.replace(/-/gi, "");
            this.getUsimRequestList.req.request_key = this.searchData.request_key;
            this.getUsimRequestList.req.progress_code = this.searchData.selectedCode;
            this.$axios.post(this.$BASE_URL + '/agency/usimhistory', this.getUsimRequestList.req).then(res => {
                this.usimRequestList = res.data;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
        getClass(progressCode) {
            if (progressCode = "진행") return 'text-decoration-underline font-weight-black ps-2 pe-2 cursor-td'
            else if (progressCode = "완료") return 'text-decoration-underline font-weight-black text-blue ps-2 pe-2 cursor-td'
            else return 'text-decoration-underline font-weight text-red ps-2 pe-2 cursor-td'
        },
        getCodeListAPI(code) {
            this.getCodeList.req.code_group = code;
            this.$axios.post(this.$BASE_URL + '/common/codelist', this.getCodeList.req).then(res => {
                this.selectCodeList = res.data;
                this.selectCodeList.unshift({ "code_name": "전체", "code_value": "" })
                this.searchData.selectedCode = this.selectCodeList[0].code_value;
            }).catch(err => {
                this.GLOBALFNC.err.commonErr(err)
            })
        },
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';

.cursor-td {
    cursor: pointer;
}
</style>
