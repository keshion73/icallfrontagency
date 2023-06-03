<template>
  <v-overlay z-index="10000">
    <div class="modal-layer">
      <div>
        <div class="modal-tit">
          <h4 class="text-h4">{{ title }}</h4>
          <v-btn @click="$emit('close')"><img src="@/assets/images/common/icon-x.svg" alt=""></v-btn>
        </div>
        <div class="d-flex modal-mes">
          <img src="@/assets/images/common/icon-modalchk.svg" alt="" v-if="icon=='icon01'">
          <img src="@/assets/images/common/icon-modalcau.svg" alt="" v-if="icon=='icon02'">
          <img src="@/assets/images/common/icon-modalcau02.svg" alt="" v-if="icon=='icon03'">
          <slot name="mes"></slot>
        </div>
      </div>
      <div class="modal-btn">
        <slot name="btn"></slot>
      </div>
    </div>
  </v-overlay>
</template>

<script>
  export default {
    props: {
      title: String,
      icon: String,
    }
  }
</script>

<style lang="scss" scoped>
  .modal-layer {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    width: 360px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    color: #666666;
    padding: 20px 30px;

    >div:not(.modal-btn) {
      width: 100%;
    }

    .modal-tit {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h4 {
        font-size: 1.6rem !important;
        color: #000 !important
      }

      .v-btn {
        padding: 0;
        min-width: auto;
        height: auto;
        background: none;
      }
    }

    .modal-mes {
      display: flex;
      align-items: center;

      img {
        margin-right: 20px;
      }
    }

    .modal-btn {
      >div {
        display: flex;
      }
    }
  }

  ::v-deep {
    .modal-btn {
      .v-btn {
        padding: 0 45px;
        background: #FFFFFF;
        color: #00648A;
        border: 1px solid #00648A;

        +.v-btn {
          margin-left: 12px;
        }
      }
    }
  }
</style>