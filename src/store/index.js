import { createStore } from 'vuex'
// store是统一集中管理项目的部分状态的仓库，并且为响应式的状态

// 模块A
// const moduleA = {
//   state: {
//     name: 'Jack',
//     age: 21
//   },
//   getters: {
//   },
//   mutations: {
//     moduleMethod(state) {
//       console.log('moduleMethod123' + state.name);
//     }
//   },
//   actions: {
//   }
// }

const store = createStore({
  // 初始化状态
  state: {
    // counter: 100
  },
  // 计算属性(获取状态)
  getters: {
    // getCounter(state) {
    //   return state.counter * 2;
    // }
  },
  // 定义同步方法(使用commit调用)(修改状态)
  mutations: {
    // increment(state) {
    //   state.counter++;
    // },
    // decrement(state) {
    //   state.counter--;
    // },
    // incrementCounter(state, num) {
    //   state.counter += num;
    // },
    // decrementCounter(state, payload) {
    //   state.counter -= payload.num;
    // }
  },
  // 定义异步方法(使用dispatch调用)(异步操作)
  actions: {
    // incrementCounterTime(context) {
    //   setTimeout(() => {
    //     context.commit('incrementCounter', 5);
    //   }, 1000)
    // }

    // incrementCounterTime(context) {
    //   return new Promise(((resolve, reject) => {
    //     setTimeout(() => {
    //       context.commit('incrementCounter', 5);
    //     }, 1000)
    //     resolve();
    //     // reject();
    //   }))
    // }
  },
  modules: {
    // a: moduleA
  }
})

export default store
