<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(100, 100, 100, .15);
    background-color: #fff;
    letter-spacing: 2px;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
