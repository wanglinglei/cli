import axios from "axios";

const baseConfig = {
  baseUrl: "",
  timeOut: 10000,
  headers: {},
};

const instance = axios.create(baseConfig);

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * @description: get 请求
 * @param {string} url
 * @param {object} param
 * @return {*}
 */
export function get(url: string, param: object = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        method: "get",
        data: { ...param },
      })
      .then((res) => {
        resolve([undefined, res]);
      })
      .catch((err) => {
        reject(err, undefined);
      });
  });
}

/**
 * @description: post 请求
 * @param {string} url
 * @param {object} param
 * @return {*}
 */
export function post(url: string, param: object = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, {
        method: "post",
        data: { ...param },
      })
      .then((res) => {
        resolve([undefined, res]);
      })
      .catch((err) => {
        reject(err, undefined);
      });
  });
}
