<template>
  <div id="app">
<!--    <h3>App{{$store.state.counter}}</h3>-->
<!--    <button @click="sub">-&#45;&#45;</button>-->
<!--    <button @click="add">+++</button>-->
<!--    <h3>App{{$store.getters.getCounter}}</h3>-->
<!--    <button @click="addCounter(5)">++5</button>-->
<!--    <button @click="addCounter(8)">++8</button>-->
<!--    <button @click="subCounter(5)">&#45;&#45;5</button>-->
<!--    <button @click="addCounterTime(5)">++5(1s)</button>-->
<!--    <button @click="moduleText">text</button>-->
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

  import MainTabBar from "./components/MainTabBar";

 const App = {
   name: 'App',
   components: {
     MainTabBar
   },
   methods: {
     // add() {
     //   this.$store.commit('increment');
     // },
     // sub() {
     //   this.$store.commit('decrement');
     // },
     // addCounter(number) {
     //   this.$store.commit('incrementCounter', number);
     // },
     // subCounter(number) {
     //   this.$store.commit({
     //     type: 'decrementCounter',
     //     num: number
     //   });
     // },
     // addCounterTime() {
     //    this.$store.dispatch('incrementCounterTime').then(() => {
     //      console.log('处理成功！');
     //    }).catch(() => {
     //      console.log('处理失败！');
     //    })
     // },
     // moduleText() {
     //   console.log(this.$store.state.a.name);
     //   console.log(this.$store.state.a.age);
     //   console.log(this.$store.commit('moduleMethod'));
     // }
   }
 }

 export default App

</script>

<style>
  @import "~@/assets/css/base.css";

</style>
