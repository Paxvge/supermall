import {debounce} from "./utils";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {

  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },

  mounted() {
    // 图片加载完成的事件监听，即监听item中图片加载完成
    // 防抖函数debounce
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      this.newRefresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}
