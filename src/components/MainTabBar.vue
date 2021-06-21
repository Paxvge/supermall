<template>
  <h4>子组件{{$store.state.counter}}</h4>
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:item-icon>
        <img src="~@/assets/img/tabbar/home.svg" alt="首页">
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/home_active.svg" alt="首页">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">首页</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <template v-slot:item-icon>
        <img slot="item-icon" src="@/assets/img/tabbar/category.svg" alt="分类">
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/category_active.svg" alt="分类">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">分类</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <img slot="item-icon" src="@/assets/img/tabbar/cart.svg" alt="购物车">
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/cart_active.svg" alt="购物车">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">购物车</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt="我的">
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/profile_active.svg" alt="我的">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">我的</div>
      </template>
    </tab-bar-item>

  </tab-bar>
</template>

<script>

  import TabBar from "@/components/tabbar/TabBar";
  import TabBarItem from "@/components/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>