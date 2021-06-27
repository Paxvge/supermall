<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabItemClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed">
    </tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pulling-up="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad1"></home-swiper>
      <!--推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--特色-->
      <feature-view></feature-view>
      <!--精选-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabItemClick="tabClick"
                   ref="tabControl2">
      </tab-control>
      <!--商品列表-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--返回顶部-->
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from  "@/network/home";
  import {debounce} from "@/common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata1();

      // 2.请求商品数据
      this.getHomeGoods1('pop');
      this.getHomeGoods1('new');
      this.getHomeGoods1('sell');
    },
    mounted() {
      // 图片加载完成的事件监听，即监听item中图片加载完成
      // 防抖函数debounce
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll && refresh();
      })
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
    },
    methods: {
      /**
      * 事件监听相关方法
      */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        // 同步两个tabControl
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = Math.abs(position.y) > 1000;

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods1(this.currentType);
      },
      swiperImageLoad1() {
        // 获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
      * 网络请求相关方法
      */
      getHomeMultidata1() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods1(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }

  }
</script>

<style scoped>
  #home {
    /*padding: 44px 0 59px;*/
    padding-bottom: 59px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*z-index: 999;*/
  }

  .content {
    /*height: calc(100% - 59px);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 59px;
    right: 0;
    left: 0;
  }

  .tab-control {
    background-color: #fff;
    position: relative;
    z-index: 99;
  }
</style>
