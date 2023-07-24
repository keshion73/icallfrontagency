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
                    <p>통신사</p>
                    <v-select ref="refTelcoList" v-model="searchData.service_telco" outlined item-text="text"
                        item-value="value" :items="telcoList" :menu-props="{ offsetY: true }" />
                </div>
                <div class="d-flex">
                    <p>전화번호</p>
                    <v-text-field ref="refAgencyCode" v-model="searchData.service_phone_num" placeholder="숫자만 입력해 주세요."
                        outlined>
                    </v-text-field>
                </div>
                <div>
                    <v-btn color="btncolor" @click="getOpeningSituationListAPI()">조회</v-btn>
                </div>
            </div>
        </div>
        <div class="list-table-wrap">
            <div>
                <v-data-table :headers="openingSituationheaders" :items="openingSituationList"
                    :class="$vuetify.breakpoint.xs ? 'mobile-table' : ''" :page.sync="page" hide-default-footer
                    @page-count="pageCount = $event" :items-per-page="itemsPerPage" mobile-breakpoint="0"
                    no-data-text="데이터가 없습니다.">
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
    name: "openingsituation",
    watch: {
    },
    computed: {
    },
    mounted() {
        this.setStartDate();
        this.getOpeningSituationListAPI();
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
            telcoList: [
                { text: "전체", value: "" },
                { text: "SKT", value: "SKT" },
                { text: "LGT", value: "LGT" }
            ],
            openingSituationheaders: [
                {
                    text: '통신사',
                    value: 'service_telco',
                    sortable: false,
                    align: "center",
                    width: '8%'
                },
                {
                    text: '휴대폰 번호',
                    value: 'service_phone_num',
                    sortable: false,
                    align: "center",
                    width: '12%'
                },
                {
                    text: '고객명',
                    value: 'service_name',
                    sortable: false,
                    align: "center",
                    width: '12%'
                },
                {
                    text: '요금제명',
                    value: 'service_rate',
                    sortable: false,
                    align: "center",
                    width: '38%'
                },
                {
                    text: '개통일',
                    value: 'service_open_date',
                    sortable: false,
                    align: "center",
                    width: '10%'
                },
                {
                    text: '회선상태',
                    value: 'service_status',
                    sortable: false,
                    align: "center",
                    width: '10%'
                },
                {
                    text: '해지일',
                    value: 'service_close_date',
                    sortable: false,
                    align: "center",
                    width: '10%'
                }
            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 20,
            totalCnt: 0,
            getOpeningSituationList: {
                req: {
                    start_date: "",
                    end_date: "",
                    agency_code: "",
                    agency_name: "",
                    service_telco: "",
                    service_phone_num: "",
                },
                res: {
                    service_telco: "",
                    telco_service_acct: "",
                    service_name: "",
                    service_phone_num: "",
                    service_usim: "",
                    service_rate: "",
                    service_open_date: "",
                    service_status: "",
                    service_ctz_corp_num_type: "",
                    service_rechg_chk: "",
                    service_rechg_first: "",
                    service_rechg_cnt: "",
                    service_end_dt: "",
                    service_spam_is: "",
                    service_spam_date: "",
                    service_close_date: "",
                },
            },
            openingSituationList: [],
            searchData: {
                start_date: "",
                end_date: new Date().toISOString().substr(0, 10),
                agency_code: "",
                agency_name: "",
                service_telco: "",
                service_phone_num: "",
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
        getOpeningSituationListAPI() {
            this.loading = true;
            this.getOpeningSituationList.req.start_date =
                this.searchData.start_date.replace(/-/gi, "");
            this.getOpeningSituationList.req.end_date =
                this.searchData.end_date.replace(/-/gi, "");
            this.getOpeningSituationList.req.agency_code = this.GET_SESSION_INFO().userInfo.agency_code;
            this.getOpeningSituationList.req.agency_name = this.searchData.agency_name;
            this.getOpeningSituationList.req.service_telco = this.searchData.service_telco;
            this.getOpeningSituationList.req.service_phone_num = this.searchData.service_phone_num;
            this.$axios
                .post(
                    this.$BASE_URL + "/opening/getsituationlist",
                    this.getOpeningSituationList.req
                )
                .then((res) => {
                    this.loading = false;
                    this.openingSituationList = res.data;
                    this.totalCnt = res.data.length;
                })
                .catch((err) => {
                    this.loading = false;
                    this.GLOBALFNC.err.commonErr(err);
                });
        },
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/page/charge/charge.scss';
</style>