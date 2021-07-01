<template>
    <div id="detail" ref="detail">
      <!--导航栏-->
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <!--轮播图-->
        <detail-swiper :top-images="topImages" ref="swiper"></detail-swiper>
        <!--基本信息-->
        <detail-base-info :goods="goods"></detail-base-info>
        <!--商品信息-->
        <detail-shop-info :shop="shop"></detail-shop-info>
        <!--商品详情-->
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <!--商品参数-->
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <!--商品评论-->
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <!--商品推荐-->
        <goods-list :goods="recommends" ref="recommends"></goods-list>
      </scroll>
      <!--底部导航-->
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <!--返回顶部-->
      <back-top @click="backClick" v-show="isShowBackTop"></back-top>
      <!--添加购物车弹窗-->
      <toast :message="message" :show="show"></toast>
    </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Toast from "@/components/common/toast/Toast";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail"
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      Toast,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    // 混入模块
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        positionY: null,
        detailSwiperY: null,
        detailParamY: null,
        detailCommentY: null,
        detailRecommendsY: null,
        message: '',
        show: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.data.result;
        // 1.获取顶部的图片轮播数据
        this.topImages = res.data.result.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论信息
        if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list;
      })
    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    methods: {
      imageLoad() {
        this.newRefresh();
      },
      titleClick(index) {
        let scroll = this.$refs.scroll.scroll;
        switch (index) {
          case 0:
            scroll.scrollToElement('.detail-swiper', 300); //将页面位置快速定位到商品顶部位置
            break
          case 1:
            scroll.scrollToElement('.param-info', 300); //将页面位置快速定位到参数位置
            break
          case 2:
            scroll.scrollToElement('.comment-info', 300); //将页面位置快速定位到评论位置
            break
          case 3:
            scroll.scrollToElement('.goods', 300); //将页面位置快速定位到推荐位置
        }
      },
      // 获取各个模块距离顶部的距离
      getDetailY() {
        if (this.$refs.detail) {
          this.detailSwiperY = this.$refs.swiper.$el.offsetTop;
          this.detailParamY = this.$refs.param.$el.offsetTop;
          this.detailCommentY = this.$refs.comment.$el.offsetTop;
          this.detailRecommendsY = this.$refs.recommends.$el.offsetTop;
        }
      },
      contentScroll(position) {
        // 获取页面滑动距离
        this.positionY = -position.y;

        this.getDetailY();

        if (this.detailSwiperY <= this.positionY && this.detailParamY > this.positionY) {
          this.$refs.navbar && (this.$refs.navbar.currentIndex = 0);
       }
        if (this.detailParamY <= this.positionY && this.detailCommentY > this.positionY) {
          this.$refs.navbar && (this.$refs.navbar.currentIndex = 1);
        }
        if (this.detailCommentY <= this.positionY && this.detailRecommendsY > this.positionY) {
          this.$refs.navbar && (this.$refs.navbar.currentIndex = 2);
        }
        if (this.detailRecommendsY <= this.positionY) {
          this.$refs.navbar && (this.$refs.navbar.currentIndex = 3);
        }

        // 判断BackTop是否显示
        this.isShowBackTop = Math.abs(position.y) > 1000;
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.detailInfo.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里
        this.$store.dispatch('addCart', product).then(res => {
          this.show = true;
          this.message = res;

          setTimeout(() => {
            this.show = false;
            this.message = '';
          }, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    background-color: #fff;
    height: 100vh;
    position: relative;
    z-index: 99;
  }

  .detail-nav {
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .content {
    height: calc(100% - 44px - 53px);
    position: relative;
    top: 44px;
  }
</style>
