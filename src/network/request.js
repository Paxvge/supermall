import axios from "axios"

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    method: 'get',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    // console.log(error);
  })

  // 3.发送网络请求
  return instance(config);
}

