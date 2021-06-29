<template>
  <swiper class="detail-swiper">
    <swiper-item
      v-for="(item, index) in topImages"
      :key="index"
      :count="topImages.length">
      <img :src="item" alt="详情页轮播图">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  text-align: center;
  height: 50vh;
}
</style>
