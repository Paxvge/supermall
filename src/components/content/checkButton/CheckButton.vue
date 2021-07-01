<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~@/assets/img/cart/tick.svg" alt="选中按钮">
  </div>
</template>

<script>
  export default {
    name: "checkButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 1px solid #777;
  }

  .check {
    background-color: var(--color-tint);
    border: 1px solid transparent;
  }
</style>
