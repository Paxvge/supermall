<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>

  #tab-bar {
  display: flex;
  /*justify-content: space-around;*/
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  box-shadow: 0 -3px 15px rgba(100, 100, 100, .15);
  }

</style>
