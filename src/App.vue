<template>
  <div id="app">
<!--    <keep-alive>-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->

    <!--keep-alive用于保存页面缓存，提高性能-->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

  import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

 const App = {
   name: 'App',
   components: {
     MainTabBar
   },
   methods: {

   }
 }

 export default App

</script>

<style>
  @import "~@/assets/css/base.css";

</style>
