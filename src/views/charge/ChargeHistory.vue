<template>
    <v-container fluid class="py-6 pt-0">
        <v-row class="mb-1 mt-6">
            <!-- 헤더명 -->
            <v-col md="12" class="me-auto text-start">
                <h4 class="text-h4 text-sm font-weight-bold ml-5" style="color:#ea5a9f">
                    충전 내역 조회
                </h4>
            </v-col>
        </v-row>
        <v-row>
            <!-- 헤더명 -->
            <v-col md="8" class="me-auto text-start">
                <label class="text-sm font-weight-bold mt-5 ml-5">검색조건</label>
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
                            <label class="text-sm font-weight-bold mt-5">충전번호 : </label>
                            <v-col cols="8">
                                <v-text-field ref="refAgencyName" v-model="searchData.charge_key" color="#e91e63"
                                    placeholder="충전번호" class="font-size-input input-style mt-0 pt-0"
                                    background-color="#f0f2f5">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
                        <v-row class="mt-0">
                            <label class="text-sm font-weight-bold mt-5">전화번호 : </label>
                            <v-col cols="8">
                                <v-text-field ref="refAgencyCode" v-model="searchData.phone_number" color="#e91e63"
                                    placeholder=" -없이 입력해주세요." class="font-size-input input-style mt-0 pt-0"
                                    background-color="#f0f2f5">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1">
                        <v-row class="mt-4">
                            <v-btn :elevation="0" class="font-weight-bold text-white py-4 px-3 my-auto ms-15"
                                color="#ea5a9f" small @click="getChargeHistoryListAPI()">
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
                <v-data-table :headers="chargeHeaders" :items="chargeHistoryList" class="table charge_history_table"
                    :page.sync="page" hide-default-footer @page-count="pageCount = $event" :items-per-page="itemsPerPage"
                    mobile-breakpoint="0" no-data-text="데이터가 없습니다.">
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
                    cellClass: "text-decoration-underline font-weight-black ps-2 pe-2",
                    align: "center",
                    sortable: true,
                    value: "charge_history_num",
                    class:
                        "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '6%'
                },
                {
                    text: "충전번호",
                    align: "center",
                    cellClass: "ps-2 pe-2",
                    sortable: false,
                    value: "charge_history_key",
                    class:
                        "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '14%'
                },
                {
                    text: "전화번호",
                    value: "phone_number",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '10%'
                },
                {
                    text: "요금제",
                    value: "charge_rate_nm",
                    sortable: true,
                    align: "start",
                    class: "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '18%'
                },
                {
                    text: "충전금액",
                    value: "charge_amt",
                    sortable: true,
                    align: "center",
                    class: "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '7%'
                },
                {
                    text: "할인금액",
                    value: "charge_discount_amt",
                    sortable: true,
                    align: "center",
                    class: "text-secondary font-weight-bolder opacity-7 ps-6 pe-2",
                    width: '7%'
                },
                {
                    text: "충전일",
                    value: "charge_date_time",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '11%'
                },
                {
                    text: "충전결과",
                    value: "charge_result_msg",
                    align: "center",
                    sortable: false,
                    class: "text-secondary font-weight-bolder opacity-7",
                    width: '8%'
                },

            ],
            page: 1,
            pageCount: 0,
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
            console.log("???")
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
.v-data-table::v-deep th {
    font-size: 14px !important;
    text-align: center !important;
    border: 1px solid #424242 !important;
    background-color: #2E2E2E !important;
    color: white !important;
}

// .v-data-table::v-deep th {
//     font-size: 14px !important;
//     text-align: center !important;
//     border: 1px solid white !important;
//     background-color: #0B0B3B !important;
//     color: white !important;
// }

.v-data-table::v-deep td {
    font-size: 12px !important;
    border: 1px solid #f0f2f5 !important;
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