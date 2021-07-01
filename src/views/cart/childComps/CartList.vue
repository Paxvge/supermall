<template>
  <div class="cart-list">
    <scroll class="content" :probe-type="3" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :item-info="item"
        :key="index">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '@/components/common/scroll/Scroll'

  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex';

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      // 将页面高度重新进行刷新计算
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 59px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
