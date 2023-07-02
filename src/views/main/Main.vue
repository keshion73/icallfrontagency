<template>
  <div class="main-page">
    <div class="main-img">
      <div class="container">
        <div class="txt">
          <p>대리점 전용 사이트</p>
          <p class="font-weight-bolder">차별화된 서비스를 경험하세요.</p>
        </div>
        <div class="btn d-flex">
          <v-btn @click="openingClick">개통현황 확인하기<span><img src="@/assets/images/common/icon-btnarrow.svg"
                alt=""></span></v-btn>
          <v-btn @click="movePage('/charge/charge')">고객 선불 충전하기<span><img src="@/assets/images/common/icon-btnarrow.svg"
                alt=""></span></v-btn>
          <v-btn @click="movePage('/usim/request')">USIM 충전하기<span><img src="@/assets/images/common/icon-btnarrow.svg"
                alt=""></span></v-btn>

        </div>
      </div>
    </div>
    <div class="main-cont container">
      <v-tabs v-model="tab" height="40px" hideSlider>
        <v-tab>선불 요금제</v-tab>
        <v-tab>후불 요금제</v-tab>
        <!-- <v-tab>개통 정책</v-tab> -->
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :transition="false">
          <div class="table-wrap">
            <p class="table-tit">LGU+</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">요금제명</th>
                    <th>기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 25%;">음성 <span>(Voice)</span> / 문자 <span>(SMS)</span></th>
                    <th style="width: 13%;">데이터 <span>(Data)</span></th>
                    <th style="width: 10%;">초과분</th>
                    <th style="width: 8%;">부가통화</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="best">
                    <td>선불 스마트 300M <span class="best-mark">인기</span></td>
                    <td>36,300</td>
                    <td>기본제공 / 기본제공</td>
                    <td>300M</td>
                    <td>+3MBPS</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 10.3G</td>
                    <td>38,300</td>
                    <td>기본제공 / 기본제공</td>
                    <td>300M + 10G</td>
                    <td>+3MBPS</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 11G (일2G)</td>
                    <td>55,000</td>
                    <td>기본제공 / 기본제공</td>
                    <td>11G + 일 2G</td>
                    <td>+3MBPS</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 일 5G</td>
                    <td>66,000</td>
                    <td>기본제공 / 기본제공</td>
                    <td>일 5G + 5MBPS</td>
                    <td>+5MBPS</td>
                    <td>300</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">VAT 포함</p>
          </div>
          <div class="table-wrap">
            <p class="table-tit">SKT</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">요금제명</th>
                    <th>기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 25%;">음성 <span>(Voice)</span> / 문자 <span>(SMS)</span></th>
                    <th style="width: 13%;">데이터 <span>(Data)</span></th>
                    <th style="width: 10%;">초과분</th>
                    <th style="width: 8%;">부가통화</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="best">
                    <td>band 데이터 안심 300 <span class="best-mark">인기</span></td>
                    <td>36,300</td>
                    <td>기본제공 / 기본제공</td>
                    <td>300M</td>
                    <td>+3MBPS</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>band 데이터 15G +</td>
                    <td>39,000</td>
                    <td>100분 / 2200원 (SMS기준 100건)</td>
                    <td>15G</td>
                    <td>+3MBPS</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>band 데이터 퍼펙트</td>
                    <td>59,900</td>
                    <td>기본제공 / 기본제공</td>
                    <td>11G + 일 2G</td>
                    <td>+3MBPS</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>band 데이터 에센스</td>
                    <td>66,000</td>
                    <td>기본제공 / 기본제공</td>
                    <td>100G</td>
                    <td>+5MBPS</td>
                    <td>300</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">SKT 선불데이터 15G+문자 기본제공량 / VAT 포함<br>
              2,200원 한도내 SMS 22원, MMS 33원, 멀티미디어형 MMS 110/건으로 사용 가능</p>
          </div>
          <div class="table-wrap">
            <p class="table-tit">KT</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">요금제명</th>
                    <th>기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 25%;">음성 <span>(Voice)</span> / 문자 <span>(SMS)</span></th>
                    <th style="width: 13%;">데이터 <span>(Data)</span></th>
                    <th style="width: 10%;">초과분</th>
                    <th style="width: 8%;">부가통화</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="best">
                    <td>선불 스위트 300M <span class="best-mark">인기</span></td>
                    <td>36,300</td>
                    <td>기본제공 / 기본제공</td>
                    <td>300M</td>
                    <td>+3MBPS</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>선불 알뜰 15G+</td>
                    <td>39,300</td>
                    <td>100분 / 100분</td>
                    <td>15G</td>
                    <td>+3MBPS</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>선불 스위트 10G (일2G)</td>
                    <td>54,000</td>
                    <td>기본제공 / 기본제공</td>
                    <td>10G + 일 2G</td>
                    <td>+3MBPS</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>선불 스위트 25G (일2G)</td>
                    <td>99,000</td>
                    <td>기본제공 / 기본제공</td>
                    <td>25G + 일 2G</td>
                    <td>+5MBPS</td>
                    <td>300</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">VAT 포함</p>
          </div>
          <div class="table-wrap">
            <p class="table-tit">SKT - PPS 요금제</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 24%;">요금제명</th>
                    <th style="width: 19%;">기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 25%;">음성 <span>(Voice)</span> / 문자 <span>(SMS)</span></th>
                    <th>데이터 <span>(Data)</span></th>
                    <th style="width: 8%;">일차감</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PPS Premium</td>
                    <td>9,900</td>
                    <td>1.65원 / 22원</td>
                    <td>22.53원 (1M)</td>
                    <td>330원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">VAT 포함</p>
          </div>
        </v-window-item>
        <v-window-item :transition="false">
          <div class="table-wrap">
            <p class="table-tit">LGU+</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 24%;">요금제명</th>
                    <th style="width: 7%;">기본료</th>
                    <th style="width: 7%;">할인금</th>
                    <th style="width: 8%;">최종 기본료</th>
                    <th style="width: 8%;">할인 기간</th>
                    <th style="width: 15%;">데이터</th>
                    <th style="width: 12%;">음성(부가)</th>
                    <th style="width: 7%;">문자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>스마일 플러스 (200분 + 5G)</td>
                    <td>9,900</td>
                    <td>-</td>
                    <td>9,900</td>
                    <td>-</td>
                    <td>5G</td>
                    <td>200분</td>
                    <td>100건</td>
                  </tr>
                  <tr>
                    <td>스마일 플러스 (100분 + 6G)</td>
                    <td>9,900</td>
                    <td>-</td>
                    <td>9,900</td>
                    <td>-</td>
                    <td>6G</td>
                    <td>100분</td>
                    <td>100건</td>
                  </tr>
                  <tr>
                    <td>5G 스마일 플러스 (300분 + 5G)</td>
                    <td>15,000</td>
                    <td>3,300</td>
                    <td>11,700</td>
                    <td>사용기간내</td>
                    <td>5G</td>
                    <td>300분</td>
                    <td>100건</td>
                  </tr>
                  <tr class="best">
                    <td>USIM 안심데이터 11G +</td>
                    <td>19,800</td>
                    <td>1,900</td>
                    <td>17,900</td>
                    <td>사용기간내</td>
                    <td>7G + 1MBPS</td>
                    <td>기본 제공 (300분)</td>
                    <td>기본 제공</td>
                  </tr>
                  <tr class="best">
                    <td>스마일 플러스 (100분 + 6G)</td>
                    <td>28,600</td>
                    <td>1,000</td>
                    <td>27,600</td>
                    <td>사용기간내</td>
                    <td>15G + 3MBPS</td>
                    <td>100분</td>
                    <td>100건</td>
                  </tr>
                  <tr class="best">
                    <td>USIM 안심 데이터 11G +</td>
                    <td>42,500</td>
                    <td>5,000</td>
                    <td>37,500</td>
                    <td>사용기간내</td>
                    <td>11G + 매일 2G + 3MBPS</td>
                    <td>기본 제공 (300분)</td>
                    <td>기본 제공</td>
                  </tr>
                  <tr class="best">
                    <td>USIM 안심데이터 100G +</td>
                    <td>45,100</td>
                    <td>-</td>
                    <td>45,100</td>
                    <td>-</td>
                    <td>100G + 5Mbps</td>
                    <td>기본 제공 (300분)</td>
                    <td>기본 제공</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="table-wrap">
            <p class="table-tit">SK</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 24%;">요금제명</th>
                    <th style="width: 7%;">기본료</th>
                    <th style="width: 7%;">할인금</th>
                    <th style="width: 8%;">최종 기본료</th>
                    <th style="width: 8%;">할인 기간</th>
                    <th style="width: 15%;">데이터</th>
                    <th style="width: 12%;">음성(부가)</th>
                    <th style="width: 7%;">문자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="best">
                    <td>USIM 스마트 11G +</td>
                    <td>38,500</td>
                    <td>2,000</td>
                    <td>36,500</td>
                    <td>사용기간내</td>
                    <td>11G + 매일 2G + 3MBPS</td>
                    <td>기본제공 (300분)</td>
                    <td>기본제공</td>
                  </tr>
                  <tr class="best">
                    <td>USIM 스마트 15G +</td>
                    <td>29,700</td>
                    <td>1,000</td>
                    <td>28,700</td>
                    <td>사용기간내</td>
                    <td>15G + 3MBPS</td>
                    <td>100분</td>
                    <td>100건</td>
                  </tr>
                  <tr class="best">
                    <td>USIM 스마트 7G +</td>
                    <td>19,800</td>
                    <td>1,000</td>
                    <td>18,800</td>
                    <td>사용기간내</td>
                    <td>7G + 1MBPS</td>
                    <td>기본제공 (300분)</td>
                    <td>기본제공</td>
                  </tr>
                  <tr class="best">
                    <td>USIM 데이터충분히 (매일 5G +)</td>
                    <td>45,300</td>
                    <td>1,000</td>
                    <td>44,300</td>
                    <td>사용기간내</td>
                    <td>일 5G + 3MBPS</td>
                    <td>기본제공 (300분)</td>
                    <td>기본제공</td>
                  </tr>
                  <tr>
                    <td>USIM 스마트 (100분 / 10G +)</td>
                    <td>19,800</td>
                    <td>-</td>
                    <td>19,800</td>
                    <td>-</td>
                    <td>10G + 1MBPS</td>
                    <td>100분</td>
                    <td>100건</td>
                  </tr>
                  <tr>
                    <td>USIM 스마트 (200분 / 5G +)</td>
                    <td>15,400</td>
                    <td>-</td>
                    <td>15,400</td>
                    <td>-</td>
                    <td>5G + 1MBPS</td>
                    <td>200분</td>
                    <td>100건</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </v-window-item>
        <v-window-item :transition="false">
          <div class="table-wrap">
            <p class="table-ttit">정액 개통 정책</p>
            <p class="table-tit">LGU+</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">요금제명</th>
                    <th>기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 15%;">초기 충전</th>
                    <th style="width: 15%;">내/외국인</th>
                    <th style="width: 15%;">여권</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="3">선불 스마트 300M</td>
                    <td rowspan="3">36,300</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr class="best">
                    <td style="padding-left: 5px;">2개월</td>
                    <td class="strong">10,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr class="best">
                    <td style="padding-left: 5px;">3개월</td>
                    <td class="strong">-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 10.3G</td>
                    <td>38,300</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 11G (일2G)</td>
                    <td>55,000</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 일5GB</td>
                    <td>66,000</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">1회 충전시</p>
          </div>
          <div class="table-wrap">
            <p class="table-tit">KT</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">요금제명</th>
                    <th>기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 15%;">초기 충전</th>
                    <th style="width: 15%;">내/외국인</th>
                    <th style="width: 15%;">여권</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>선불 스위트 300M</td>
                    <td>36,300</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr>
                    <td>선불 알뜰 15GB+</td>
                    <td>39,300</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr>
                    <td>선불 스위트 10G (일2G)</td>
                    <td>54,000</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr>
                    <td>선불 스마트 25GB (일2G)</td>
                    <td>99,000</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">1회 충전시</p>
          </div>
          <div class="table-wrap">
            <p class="table-tit">SK</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">요금제명</th>
                    <th>기본료 <span>(Rates per Month)</span> </th>
                    <th style="width: 15%;">초기 충전</th>
                    <th style="width: 15%;">내/외국인</th>
                    <th style="width: 15%;">여권</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="2">Band 데이터 안심 300</td>
                    <td rowspan="2">36,300</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr class="best">
                    <td style="padding-left: 5px;">2개월</td>
                    <td class="strong">-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Band 데이터 퍼펙트</td>
                    <td>59,900</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                  <tr>
                    <td>Band 데이터 에센스</td>
                    <td>66,000</td>
                    <td>1개월</td>
                    <td class="strong">40,000</td>
                    <td>20,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-info">1회 충전시</p>
          </div>
          <div class="table-wrap">
            <p class="table-ttit">일반(종량) 개통 정책</p>
            <div class="table-cont">
              <table>
                <thead>
                  <tr>
                    <th style="width: 25%;">구분</th>
                    <th style="width: 15%;">초기 충전</th>
                    <th style="width: 15%;">내/외국인</th>
                    <th style="width: 15%;">여권</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>내국인 / 등록증 / 여권</td>
                    <td>30,000</td>
                    <td>10,000</td>
                    <td>실개통</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="remark">
              <p class="table-tit">수수료 지급 및 이월 조건</p>
              <p>1. 실개통 성립기준(기본료 제외 실 사용금액 3,000원 이상(음성/문자/데이터), 기본료 차감 제외) 미달 시 제외<br>
                2. 정산 기준일은 매월 말일이며, 수수료 지급은 익익월 20일 지급<br>
                3. 정산일 기준 유심 단독 상태 수수료 지급 대상 제외 / 회선 상태 정상을 제외한 모든 상태는 미유지로 간주</p>
              <p class="table-tit">변경 및 해지</p>
              <p style="color:#E51E78"><img src="@/assets/images/common/icon-infored.svg"
                  style="vertical-align: middle;margin-right:6px" />SK/ KT/ LG 모든 요금제는 개통후 93일 부터 변경, 해지 가능</p>
              <p class="table-tit">환수조건</p>
              <p>1. 타사 이중 개통/가개통/ 의도적 실개통 성립/스팸/ 명의도용/불법광고 발생 시 개통월 지급 수수료 환수(초기 충전 포함)<br>
                2. 개통후 93일 이내 해지, MNP등으로 회선 미유지(초기 충전 포함)시 수수료 전액 환수<br>
                3. 3개월내 요금제 변경 시 수수료 환수 (초기 충전 포함)</p>
              <p class="table-tit">개통실 운영시간</p>
              <p>SK/KT/LG 3사 공통 10:00 (일요일 11:00~19:00)</p>
            </div>

          </div>
        </v-window-item>
      </v-window>
      <div class="main-noti" v-if="!$vuetify.breakpoint.xs">
        <div>
          <h4 class="text-h4">공지사항</h4>
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
    </div>
    <div @click="dialog = true" class="btn-noti" v-if="$vuetify.breakpoint.xs">
      <img src="@/assets/images/page/m_main_noti.png" alt="">
    </div>
    <v-dialog v-model="dialog" width="300px">
      <v-card>
        <div class="main-noti">
          <div>
            <div class="d-flex">
              <h4 class="text-h4">공지사항</h4>
              <v-btn @click="dialog = false"><img src="@/assets/images/common/icon-x.svg" alt=""></v-btn>
            </div>
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
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tab: null,
      dialog: false,
    }
  },
  methods: {
    openingClick() {
      alert("준비중입니다");
    },
    movePage(routeName) {
      this.$router.push(routeName);
    }
  }
}
</script>
<style lang="scss" scoped>
.main-img {
  width: 100%;
  height: 325px;
  background: #FFD2E1;

  .container {
    position: relative;
    padding-top: 55px;
    height: 100%;
    background: #FFD2E1 url('~@/assets/images/page/main_img.png') right no-repeat;

    .txt {
      p {
        font-size: 2.4rem;
      }

      p:first-child {
        color: #399FC7;
      }
    }

    .btn {

      .v-btn {
        background: #fff;
        height: 60px;
        border-radius: 30px;
        padding: 0 16px 0 40px;
        font-size: 1.6rem;
        font-weight: 400;
        justify-content: space-between;

        span {
          background: #FAFAFB;
          width: 28px;
          width: 28px;
          border-radius: 100%;
        }
      }
    }
  }
}

.main-cont {
  position: relative;
  padding: 40px 0;

  .v-tab {
    font-size: 1.3rem;
    border-radius: 100px;
    width: 110px;
    font-weight: 500;

    &--active {
      background: #00648A;
      color: #fff;
      font-weight: 700;

      &::before {
        display: none;
      }
    }

    &:not(.v-tab--active) {
      color: #A0BCC0 !important;
    }

    &::before {
      border-radius: 100px;
    }
  }

  .v-window {
    overflow: hidden;

    .table-wrap {
      .table-ttit {
        font-size: 1.6rem;
        font-weight: 700;
        color: #00648A;
        margin-bottom: 16px;
      }

      .table-tit {
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: 16px;
      }

      .table-info {
        color: #666666;
        margin-top: 8px
      }

      +.table-wrap {
        margin-top: 32px
      }

      .remark {
        .table-tit {
          margin-bottom: 8px;
          color: #399FC7;
          margin-top: 32px
        }
      }
    }

    table {
      width: 100%;
      table-layout: fixed;
      border-spacing: 0;
      border-bottom: solid 1px #A0D1E3;

      th {
        background: rgba(57, 159, 199, 0.1);
        border-top: solid 1px #399FC7;
        border-bottom: solid 1px #399FC7 !important;
        color: #399FC7 !important;
        font-weight: 700;
        text-align: left;

        span {
          font-weight: 400;
          vertical-align: baseline;
        }
      }

      thead {
        tr {
          height: 40px;

          th {
            padding: 0 5px;
          }

          th:first-child {
            padding-left: 20px
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 13px 5px;
            border-top: solid 1px #ECF2F3;
            vertical-align: top;
            min-height: 50px;

            &.strong {
              font-weight: 500;
              color: #E51E78;
            }

            &:first-child {
              padding-left: 20px
            }
          }

          &.best {
            background: rgba(229, 30, 120, 0.1) !important;
          }

          &:first-child {
            td {
              border-top: none
            }
          }
        }

        .best-mark {
          background: #E51E78;
          border-radius: 10px;
          display: inline-block;
          height: 22px;
          line-height: 22px;
          text-align: center;
          width: 44px;
          color: #fff;
          font-size: 1.1rem;
          margin-left: 10px
        }
      }
    }
  }
}

.main-noti {
  width: 300px;

  >div {
    padding: 18px 30px 30px;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
    border-radius: 4px;
  }

  h4 {
    color: #49A7CB;
    font-size: 1.5rem !important;
  }

  p {
    line-height: 24px !important;
  }
}

@include pc {
  .main-img {
    .btn {
      position: absolute;
      bottom: 40px;

      .v-btn {
        width: 335px;

        +.v-btn {
          margin-left: 24px;
        }
      }
    }
  }

  .main-cont {
    .v-window {
      max-width: 922px;
    }

    .main-noti {
      position: absolute;
      right: 0;
      top: 40px;

      >div {
        position: fixed;

        h4 {
          margin-bottom: 30px;
        }
      }
    }
  }
}

@include mobile {
  .main-img {
    height: auto;

    .container {
      padding: 50px 40px;
      background: #FFD2E1 url('~@/assets/images/page/m_main_img.png') center no-repeat;
      background-size: cover;
    }

    .btn {
      flex-direction: column;
      width: 100%;
      margin-top: 60px;

      .v-btn {
        width: 100%;

        +.v-btn {
          margin-top: 4px;
        }
      }
    }
  }

  .main-cont {
    .table-wrap {
      .table-tit {
        padding: 0 16px;
      }
    }
  }

  .btn-noti {
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    right: 0;
  }

  .main-noti {
    .d-flex {
      justify-content: space-between;
      margin-bottom: 30px;

      .v-btn {
        background: none;
        padding: 0;
        min-width: auto;
        height: auto;
      }
    }
  }
}

::v-deep {
  .v-tabs {
    margin-bottom: 30px;

    .v-slide-group__wrapper {
      display: block;
    }

    .v-slide-group__content {
      width: 336px;
      background: rgba(57, 159, 199, 0.1);
      height: 40px;
      border-radius: 100px;
    }
  }

  .v-data-table {
    table {
      border-bottom: solid 1px #A0D1E3;
    }

    thead th {
      height: 40px !important;
    }

    tbody td {
      height: 50px !important;
    }
  }

  @include mobile {
    .v-slide-group__content {
      margin: 0 auto;
    }

    .table-info {
      padding: 0 16px;
    }

    .table-cont {
      overflow: auto;

      table {
        width: 1000px !important
      }
    }

  }

}
</style>