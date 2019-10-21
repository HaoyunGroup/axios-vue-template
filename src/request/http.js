/**
 * 引人 axios && qs 模块
 * qs 用来序列化 post 类型数据
 * 引入自己的路由配置
 */
import axios from "axios";
import QS from "qs";
import router from "../router";
import store from "../store";
import { Toast } from "vant";
import baseUrl from "./baseUrl";

/**
 * loading动画。。。。
 * 请求拦截 打开动画
 * 请求结束 关闭动画
 */
let loading;
const startLoading = () => {
  loading = Toast.loading({
    mask: true,
    message: "加载中..."
  });
};
const endLoading = () => {
  loading.clear();
};

/**
 * 提示函数
 * 禁止点击蒙层，一秒后关闭
 * @param {String} msg 提示消息
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
};

/**
 * 操作函数
 * 跳转到登录页面-携带当前路由参数，登录页面完成后返回当前页面
 * 登录页面成功后调用=》router.push({path:decodeURIComponent(url)});
 */
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

/**
 * 请求失败-处理函数
 * @param {Number} status 错误状态码
 * @param {String} other 其他信息
 */
const errorHandle = (status, other) => {
  switch (status) {
    case 401: // 未登录，跳转到登录页面
      toLogin();
      break;
    case 403:
      tip("登录过期，请重新登录");
      localStorage.removeItem("token");
      store.commit("loginSuccess", null);
      toLogin();
      break;
    case 404:
      tip("请求资源不存在");
      break;
    default:
      tip(other);
  }
};

/**
 * 创建 axios 实例
 */
const instance = axios.create({ timeout: 1000 * 12 });
instance.defaults.baseURL = baseUrl.name;

/**
 * 请求拦截 比如验证是否登录
 * 每次请求，验证本地是否有 token ，
 * true：在请求头加入 token ，方便后台判断登录情况。
 */
instance.interceptors.request.use(
  config => {
    startLoading();
    const token = store.state.token;
    // const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.reject(error)
);

/**
 * 响应拦截 查看服务器返回的登录状态
 * 和后台开发 统一错误代码
 */
instance.interceptors.response.use(
  config => {
    endLoading();
    if (config.status >= 200 && config.status <= 300) {
      return Promise.resolve(config);
    } else {
      return Promise.reject(config);
    }
  },
  error => {
    endLoading();
    const { response } = error;
    if (response) {
      // 在网状态，请求已发出
      errorHandle(response.status, response.data.message);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit("changeNetwork", false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

/**
 * 发送请求
 * @param {Object} options 请求的所有参数
 */
const request = async options => {
  const response = await instance.request(options);
  return response.data;
};

/**
 *
 * @param {String} requestUrl 请求连接
 * @param {Object}} params 附带的参数
 */
const get = (requestUrl, params = {}) => {
  let url = "";
  if (params) {
    url = `${requestUrl}?${QS.stringify(params)}&timeStamp${new Date().getTime()}`;
  }
  const headers = { "Content-Type": "application/x-www-rorm-urlencoded" };
  return request({
    url,
    method: "GET",
    headers
  });
};

const post = (requestUrl, params) => {
  let data = null;
  let headers = { "Content-Type": "application/x-www-form-urlencoded" };
  if (params.formData) {
    data = params.formData;
  } else {
    data = QS.stringify(params);
  }
  return request({
    url: requestUrl,
    method: "POST",
    headers,
    data
  });
};
export { get, post };
