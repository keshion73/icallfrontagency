<template>
  <v-app-bar :height="60" @mouseleave="drawerout">
    <div class="hd-wrap">
      <div class="hd-cont">
        <div class="logo">
          <img src="@/assets/images/icalllogo.svg" alt=""><span>대리점</span>
        </div>
        <div class="gnb" v-if="!$vuetify.breakpoint.xs" @mouseenter="drawer = true">
          <router-link to="#">가입자 현황</router-link>
          <router-link to="/charge/charge">충전</router-link>
          <router-link to="#">USIM</router-link>
          <router-link to="#">내정보</router-link>
        </div>
        <div :class="[{ 'active': drawer }, 'all-menu']" @click="drawer = !drawer">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <v-navigation-drawer v-if="!$vuetify.breakpoint.xs" v-model="drawer" absolute width="100%" height="auto">
      <div class="sub-menu">
        <v-list v-for="(submenu, index) in submenu" :key="'submenu' + index">
          <!-- <v-list-item v-for="(item, index) in submenu.item" :key="'item' + index" link :to="item.menu_url"> -->
          <v-list-item v-for="(item, index) in submenu.item" :key="'item' + index" link :to="item.to">
            {{ item.title }}
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-navigation-drawer v-if="$vuetify.breakpoint.xs" v-model="drawer" absolute width="250px" height="100vh" hide-overlay
      right>
      <div class="mem-info">
        <SubHeader></SubHeader>
      </div>
      <div class="sub-menu">
        <v-list>
          <v-list-group v-for="(item, i) in submenu" :key="i" :ripple="false">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(subItem, j) in item.item" :key="j" :to="subItem.to">
              <v-list-item-content>
                <v-list-item-title>
                  {{ subItem.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-app-bar>
</template>
<script>
import SubHeader from './SubHeader.vue';
export default {
  components: {
    SubHeader
  },
  mounted() { },

  data() {
    return {
      drawer: false,
      submenu: [{
        title: '가입자 현황',
        item: [{
          title: '개통 정보',
          to: '/',
        },
        {
          title: '개통 현황',
          to: '/'
        }
        ]
      },
      {
        title: '충전',
        item: [{
          title: '충전',
          to: '/charge/charge',
        },
        {
          title: '충전 내역 조회',
          to: '/charge/history'
        }
        ]
      },
      {
        title: 'USIM',
        item: [{
          title: 'USIM 요청',
          to: '/',
        },
        {
          title: 'USIM 요청 내역',
          to: '/'
        }
        ]
      },
      {
        title: '내정보',
        item: [{
          title: '마이페이지',
          to: '/myinfo/mypage',
        },
        {
          title: '비밀번호 변경',
          to: '/myinfo/passwordinfo'
        },
        {
          title: '예치금 환불요청',
          to: '/myinfo/depositrefund'
        },
        {
          title: '예치금 환불요청내역',
          to: '/myinfo/depositrefundlist'
        }
        ]
      },
      ],
    }
  },
  methods: {
    drawerout() {
      if (!this.$vuetify.breakpoint.xs) {
        this.drawer = false;
      }
    },

  },
  watch: {
  },
}
</script>