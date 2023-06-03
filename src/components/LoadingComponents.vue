<template>
  <v-overlay :value="loading" z-index="10000">
    <div class="loading-layer">
      <img src="@/assets/images/icalllogo.svg" alt="">
      <div class="loader"></div>
      <slot>
        <p> {{ msg }}</p>
      </slot>
    </div>
  </v-overlay>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,  //여러가지 타입 허용
      required: true          //필수로 전달 받아야함
    },
    msg: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      //loading: false
    }
  },
}
</script>

<style lang="scss" scoped>
.loading-layer {
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #666666;
  padding: 0 30px;

  img {
    height: 30px;
  }
}

.loader {
  width: 100%;
  height: 8px;
  border-radius: 8px;
  background:
    linear-gradient(#49A7CB 0 0) left/0% 100% no-repeat #C8E5F0;
  animation: loader 2s infinite steps(10);
  margin: 35px 0 10px;
}

@keyframes loader {
  100% {
    background-size: 110% 100%
  }
}
</style>