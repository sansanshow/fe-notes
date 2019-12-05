/**
 * fetch.js
 * @author kovii
 * @email sansan_show@126.com
 */
import { Toast } from 'antd-mobile';
const http = {
  /**
   * GET
   * @param {*} url 
   * @param {*} params 
   * @param {*} headers 
   */
  defaultConfig: {
    headers: {
      // version: process.env.API_VERSION,
      // deviceId: Cookie.get('fundunDeviceId') || '',
      // deviceToken: Cookie.get('fundunDeviceId') || '',
      // token: Cookie.get('m_token'),
      // m_uid: Cookie.get('m_uid'),
      // uid: Cookie.get('m_uid') || '',
      version: process.env.API_VERSION || 'defver',
      deviceId: 'fundunDeviceId',
      deviceToken: 'fundunDeviceId',
      token: 'm_token',
      m_uid: 'm_uid',
      uid: 'm_uid',
      type: '2',
    }
  },
  get(url, params, headers) {
    const paramsArray = [];
    if(params) {
      Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`))
    }
    if(url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        // body: params,
        headers: Object.assign({}, {
          'content-type': 'application/json'
        }, http.defaultConfig.headers, headers),
      }).then(response => {
        if(response.ok) {
          return response.json();
        } else {
          http.errorHandle(response);
          reject({status: response.status});
        }
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        http.errorHandle(err);
        reject({status: -1});
      });
    });
  },

  /**
   * POST
   * @param {*} url 
   * @param {*} data 
   * @param {*} headers 
   */
  post(url, data, headers) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: Object.assign({}, {
          'content-type': 'application/json'
        }, http.defaultConfig.headers, headers)
      }).then(response => {
        if(response.ok) {
          return response.json();
        } else {
          http.errorHandle(response);
          reject({status: response.status});
        }
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        http.errorHandle(err);
        reject({status: -1});
      });
    });
  },
  errorHandle(response) {
    if (response.status === 401) {
      Toast(response.data.message || 'server error');
    } else if(response.status === 404) {
      Toast('出错啦，您访问的地址不存在');
    } else if (response.data.code === '6302') {
      // clearUserData();
      // base.goLogin();
    } else {
      Toast('system error');
    }

  },
};

export default http;
