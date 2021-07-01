<template>
  <div class="bottom-bar">
    <!--全选-->
    <div class="check-content">
      <check-button class="check-all"
                    :is-checked="isSelectAll"
                    @click="checkClick">
      </check-button>
      <span>全选</span>
    </div>
    <!--合计-->
    <div class="total-price">合计：{{totalPrice}}</div>
    <!--结算-->
    <div class="calculate" @click="calculationClick">结算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data() {
      return {

      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => item.checked)
          .reduce((previousValue, currentValue) => {
          return previousValue + currentValue.price * currentValue.count;
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked)
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue.count;
        }, 0)
      },
      isSelectAll() {
        if (this.$store.state.cartList.length) {
          return this.$store.state.cartList.every(item => item.checked);
        } else {
          return false;
        }
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全选
          this.$store.state.cartList.forEach(item => item.checked = false);
        } else { //非全选
          this.$store.state.cartList.forEach(item => item.checked = true);
        }
      },
      calculationClick() {
        this.$emit('payment');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #e6e6e6;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 59px;
    right: 0;
    left: 0;
    z-index: 99;
  }

  .check-content {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-all {
    width: 18px;
    height: 18px;
  }

  .total-price {
    flex: 2;
    font-weight: bolder;
    color: #333;
    margin-left: 20px;
  }

  .calculate {
    text-align: center;
    flex: 2;
    margin-left: 20px;
    line-height: 40px;
    background-color: var(--color-high-text);
    color: #fff;
    border-radius: 20px;
  }
</style>
