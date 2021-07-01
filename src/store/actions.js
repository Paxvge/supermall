// actions 可以返回一个Promise
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.先判断是否已经存在此商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {   // 将 oldProduct 进行数量加一
        context.commit('addCounter', oldProduct);
        resolve('商品添加成功！');
      } else {    // 添加新的商品
        payload.count = 1;
        context.commit('addToCart', payload);
        resolve('商品添加成功');
      }
    })
  }
}
