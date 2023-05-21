<template>
  <v-app-bar :height="60" :elevation="0" @mouseleave="drawer = false">
    <div class="hd-wrap">
      <div class="hd-cont">
        <div class="logo">
          <img src="@/assets/images/icalllogo.svg" alt=""><span>대리점</span>
        </div>
        <div class="gnb" @mouseenter="drawer = true" v-if="!$vuetify.breakpoint.xs">
          <p>가입자 현황</p>
          <p>충전</p>
          <p>게시판</p>
          <p>내정보</p>
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
          <v-list-item v-for="(item, index) in submenu.item" :key="'item' + index">
            {{ item.title }}
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-navigation-drawer v-if="$vuetify.breakpoint.xs" v-model="drawer" absolute width="250px" height="100vh">
      <div class="sub-menu">
        <v-list v-for="(submenu, index) in submenu" :key="'submenu' + index">
          <v-list-item v-for="(item, index) in submenu.item" :key="'item' + index">
            {{ item.title }}
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-app-bar>
</template>
<script>
// import AppBarAuth from "@/components/AppBarAuth";
// import AppBar from "@/components/AppBar.vue";
// import Drawer from "@/components/Drawer.vue";

export default {
  components: {
    // AppBarAuth,
    // AppBar,
    // Drawer
  },
  mounted() { },

  data() {
    return {
      drawer: false,
      allmenu: false,
      togglerActive: false,
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
        item: [{
          title: '충전',
          to: '/',
        },
        {
          title: '충전 내역 조회',
          to: '/'
        }
        ]
      },
      {
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
        item: [{
          title: '마이페이지',
          to: '/',
        },
        {
          title: '비밀번호 변경',
          to: '/'
        },
        {
          title: '예치금 환불요청',
          to: '/'
        },
        {
          title: '예치금 환불요청내역',
          to: '/'
        }
        ]
      },
      ],
    }
  },
  methods: {
    drawerClose() {
      this.togglerActive = !this.togglerActive;
      this.$emit("drawer-toggle", true);
    },
    minifyDrawer() {
      this.togglerActive = !this.togglerActive;
      this.mini = !this.mini;
      const body = document.getElementsByTagName("body")[0];

      if (body.classList.contains("drawer-mini")) {
        body.classList.remove("drawer-mini");
      } else {
        body.classList.add("drawer-mini");
      }
    },
  },
  watch: {
    toggleActive(val) {
      this.togglerActive = val;
    },
  },
}
</script>