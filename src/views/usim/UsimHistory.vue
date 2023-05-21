<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-6">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h4 class="text-h4 text-sm font-weight-bold ml-5" style="color:#ea5a9f">
                    USIM 요청 내역
                </h4>
            </v-col>
        </v-row>
        <v-card class="card-shadow border-radius-xl mt-1 mb-6" id="basic">
            <div class="px-6 pb-6 pt-0">
                <v-row class="mt-0">
                    <v-col cols="4">
                        <v-row class="mt-0">
                            <label class="text-sm font-weight-bold mt-5">기 간 : </label>
                            <v-col cols="3" class="mt-0">
                                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                                    :return-value.sync="searchData.start_date" transition="scale-transition" offset-y
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="searchData.start_date" prepend-icon="mdi-calendar" readonly
                                            v-bind="attrs" v-on="on" class="mt-0 pt-0 ml-0"></v-text-field>
                                    </template>
                                    <v-date-picker @change="s_date_change(searchData.start_date)"
                                        v-model="searchData.start_date" no-title scrollable color="gray"
                                        :max="searchData.end_date" :weekday-format="getDay" :month-format="getMonth"
                                        :title-date-format="getMonth" :header-date-format="getHeaderTitleMonth">
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <label class="text-sm text-body mt-5 ml-4">~</label>
                            <v-col cols="3" class="mt-0">
                                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                                    :return-value.sync="searchData.end_date" transition="scale-transition" offset-y
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="searchData.end_date" prepend-icon="mdi-calendar" readonly
                                            v-bind="attrs" v-on="on" class="mt-0 pt-0 ml-0"></v-text-field>
                                    </template>
                                    <v-date-picker @change="e_date_change(searchData.end_date)"
                                        v-model="searchData.end_date" no-title scrollable color="gray"
                                        :min="searchData.start_date" :max="date" :weekday-format="getDay"
                                        :month-format="getMonth" :title-date-format="getMonth"
                                        :header-date-format="getHeaderTitleMonth">
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="mt-0">
                            <label class="text-sm font-weight-bold mt-5">USIM요청번호 : </label>
                            <v-col cols="8">
                                <v-text-field ref="refRefundKey" v-model="searchData.request_key" color="#e91e63"
                                    placeholder="USIM요청번호" class="font-size-input input-style mt-0 pt-0" outlined
                                    background-color="#f0f2f5">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="mt-0">
                            <label class="text-sm font-weight-bold mt-5">진행상황 : </label>
                            <v-col cols="8">
                                <v-select ref="refSelectCodeList" v-model="searchData.selectedCode" :items="selectCodeList"
                                    item-text="code_name" item-value="code_value" label="1" color="#e91e63" outlined
                                    background-color="#f0f2f5" class="font-size-input input-style pt-0 mt-0" single-line>
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1">
                        <v-row class="mt-4">
                            <v-btn :elevation="0"
                                class="font-weight-bold text-white py-4 px-3 my-auto ms-15 bg-gradient-info" small
                                @click="getDepositRefundRequestListAPI()">
                                조 회
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-card>
        <v-card class="card-shadow">
            <!-- 데이터 테이블 -->
            <v-card-text class="px-0 py-0">
                <v-data-table :headers="usimRequestHeaders" :items="usimRequestList" class="table usim_history_table"
                    :page.sync="page" hide-default-footer @page-count="pageCount = $event" :items-per-page="itemsPerPage"
                    mobile-breakpoint="0" single-select>
                    <template #[`item.progress_name`]="{ item }">
                        <span :class="getClass(item.progress_name)">{{ item.progress_name }}</span>
                    </template>
                </v-data-table>
            </v-card-text>
            <!-- 데이터 테이블 하단영역 -->
            <v-card-actions class="card-padding">
                <v-row>
                    <v-col cols="6" lg="3" class="d-flex align-center">
                    </v-col>
                    <v-col cols="6" class="ml-auto d-flex justify-end">
                        <v-pagination prev-icon="fa fa-angle-left" next-icon="fa fa-angle-right" class="pagination"
                            color="#4c4c4c" v-model="page" :length="pageCount" circle></v-pagination>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-container>
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
.readonlyDisabled::v-deep .v-input__slot::before {
    border-image: unset !important;
}

.v-data-table::v-deep th {
    font-size: 14px !important;
    text-align: center !important;
    border: 1px solid #424242 !important;
    background-color: #2E2E2E !important;
    color: white !important;
}

.v-data-table::v-deep td {
    font-size: 12px !important;
    border: 1px solid #f0f2f5 !important;
}

.cursor-td {
    cursor: pointer;
}

.v-menu__content::v-deep {
    .v-date-picker-table.v-date-picker-table--date {
        thead tr th {
            &:nth-child(1) {
                color: #ec0400 !important;
            }

            &:nth-child(7) {
                color: #0004de !important;
            }
        }

        tbody tr td {
            &:nth-child(1) {
                .v-btn__content {
                    color: #ec0400;
                }

                .v-btn--active {
                    .v-btn__content {
                        color: #ffffff;
                    }
                }

                .v-btn--disabled {
                    .v-btn__content {
                        opacity: 0.3;
                    }
                }
            }

            &:nth-child(7) {
                .v-btn__content {
                    color: #0004de;
                }

                .v-btn.v-btn--active {
                    .v-btn__content {
                        color: #ffffff;
                    }
                }

                .v-btn--disabled {
                    .v-btn__content {
                        opacity: 0.3;
                    }
                }
            }

        }

        .v-btn--active {
            // 선택한 날짜
            background: darkgray !important;
        }

        .v-date-picker-table__current {

            // 오늘 날짜
            &.v-btn--outlined {
                color: grey;
            }
        }
    }

    .v-date-picker-table.v-date-picker-table--month {
        .v-btn.v-btn--active {
            color: black;
        }
    }
}
</style>