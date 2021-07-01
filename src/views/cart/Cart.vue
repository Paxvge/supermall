<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="cart-nav">
      <template v-slot:center>购物车({{ length }})</template>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
    <cart-bottom-bar @payment="paymentResult"></cart-bottom-bar>
    <!--添加结算弹窗-->
    <toast :message="message" :show="show" ></toast>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import Toast from "@/components/common/toast/Toast";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import  {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      Toast,
      NavBar,
      CartList,
      CartBottomBar
    },
    data() {
      return {
        message: '',
        show: false
      }
    },
    computed: {
      // 方式一
      // ...mapGetters(['cartLength']),
      // 方式二
      ...mapGetters({
        length: 'cartLength'
      })
    },
    methods: {
      isChoose(result) {
        this.message = result;
        this.show = true;

        setTimeout(() => {
          this.message = '';
          this.show = false;
        }, 1000)
      },
      paymentResult() {
        let isChoose = this.$store.state.cartList.some(item => item.checked);

        if (isChoose) {
          this.isChoose('结算成功！');
        } else {
          this.isChoose('请选择结算商品');
        }

      }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
    position: relative;
    z-index: 99;
  }
</style>
