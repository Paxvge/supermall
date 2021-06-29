<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad,
          observeDOM: true,
          observeImage: true
        })
        // 2.监听滚动的位置
        if (this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll', position => {
            this.$emit('scroll', position);
          })
        }
        // 3.监听上拉事件
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp');
          })
        }
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      // 上拉加载动作结束,在finishPullUp()方法调用前不会触发下一次的 pullingUp 事件
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      //重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
