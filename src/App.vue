<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

  import MainTabBar from "@/components/content/MainTabBar";

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
