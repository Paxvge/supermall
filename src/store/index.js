import { createStore } from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
// store是统一集中管理项目的部分状态的仓库，并且为响应式的状态

const state = {
  cartList: []
}

const store = createStore({
  // 初始化状态
  state,
  // 计算属性(获取状态)
  getters,
  // 定义同步方法(使用commit调用)(修改状态)
  mutations,
  // 定义异步方法(使用dispatch调用)(异步操作)
  actions,
  modules: {
    // a: moduleA
  }
})

export default store
