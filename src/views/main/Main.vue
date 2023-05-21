<template>
  <v-container fluid class="py-6">
  </v-container>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    // Footer
    // Footer,
  },
  computed: {
  },
  mounted() {
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      req: {},
      res: {},
      session: {},
      img: "",
      products: [
        {
          product: "김현진 팀장",
          orders: "2,412",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg",
          value: "45,014,030원",
          ads: "9.500",
          refunds: 1,
        },
        {
          product: "황인범 팀장",
          orders: "1,821",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-mug.jpg",
          value: "6,331,000원",
          ads: "4.200",
          refunds: 5,
        },
        {
          product: "이춘향 팀장",
          orders: "2,421",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-chair.jpg",
          value: "7,993,500원",
          ads: "9.430",
          refunds: 2,
        },
        {
          product: "최준 실장",
          orders: "1,850",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/bang-sound.jpg",
          value: "5,100,000원",
          ads: "7.364",
          refunds: 4,
        },
        {
          product: "김승현 사원",
          orders: "921",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/photo-tools.jpg",
          value: "2,000,000원",
          ads: "1.531",
          refunds: 8,
        },
      ],
    }
  },
  methods: {
    ...mapGetters('sessionStore', ['GET_SESSION_INFO']),
    selectFile(file) {
      // this.img = this.$refs.image.files;
      this.img = file;
      var test = this.GET_SESSION_INFO().userInfo.user_id;
    },
    submit() {
      var frm = new FormData();
      frm.append("img", this.img);
      frm.append("upload_user_id", this.GET_SESSION_INFO().userInfo.user_id);
      //     const headers = { 
      //       "Content-Type": "multipart/form-data"
      // };

      this.$axios.post(this.$BASE_URL + '/upload', frm, {
        "Content-Type": "multipart/form-data"
      }).then(res => {
        this.res.data = res.data;
      }).catch(err => {
        console.log(err)
      })

    },
    // fileUpload() {
    //   console.log("오냐?");
    //   var frm = new FormData();
    //   var photoFile = document.getElementById("photo");
    //   frm.append("photo", photoFile.files[0]);
    //   console.log("FORMDATA :: ", frm);

    // },
    //...mapGetters(['GET_SESSION']),
    // load() {
    //   // this.$axios.get('http://localhost:8080/test', function (req, res) {
    //   //   res.header("Access-Control-Allow-Origin", "*");
    //   //   res.send('Hello World');
    //   // })

    //   // const xhr = new XMLHttpRequest();
    //   // const url = 'http://localhost:8080/test';
    //   // xhr.open('GET', url);
    //   // xhr.onload = function () {
    //   //   let p = document.getElementById('result');
    //   //   p.textContent = 'complete';
    //   // };
    //   // xhr.send();

    //   console.log("this.$store :: ", this.$store.getters.GET_SESSION);
    //   console.log("this.session :: ", this.GET_SESSION);
    //   this.session = this.GET_SESSION();
    //   console.log("SESSION :: ", this.session);

    //   console.log(location.origin);
    //   console.log("tqetqetqet", this.$BASE_URL)
    //   this.$axios.get(this.$BASE_URL + '/test').then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    postTest() {
      this.req = { 'name': 'tatat', 'job': 'aageeed' }
      this.$axios.post(this.$BASE_URL + '/postTest', this.req).then(res => {
        this.res.data = res.data;
      }).catch(err => {
        console.log(err)
      })
    },


    login() {
      this.req = { user_id: 'admin', user_password: 'qwer1234' }
      this.$axios.post(this.$BASE_URL + '/login', this.req).then(res => {
        this.res.data = res.data;
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <!-- <style scoped>
  h1, h2 {
 font-weight: normal;
  }
  ul {
 list-style-type: none;
 padding: 0;
  }
  li {
 display: inline-block;
 margin: 0 10px;
  }
  a {
 color: #42b983;
  }
  </style>
-->