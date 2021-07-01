<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 45px;
    border-radius: 10px;
    background-color: rgba(94, 91, 91, 0.6);
    color: #e6e6e6;
    letter-spacing: 2px;
    text-align: center;
    line-height: 45px;
    transition: all .5s;
  }
</style>
