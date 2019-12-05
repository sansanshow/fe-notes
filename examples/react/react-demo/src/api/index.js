import http from '../utils/http';

const api = {
  UserLogin(params) {
    // @type 1-普通申请用户  2-客户经理
    const userType = params && +(params.type) === 1 ? '1' : '1';
    const url = userType === '1' ? '/api/v1/login/user' : '/api/v1/login/bank';
    return http.post(url, params, {
      headers: { type: userType },
    }).then(res => res.data);
  },
  // 首页新闻
  getNews(params = {key: 111}) {
    return http.get('/api/v1/home/news', params).then(res => res);
  },
  // 首页获取产品
  getEnableProductList() {
    return http.get('/api/v1/home/product/list').then(res => res);
  },
  getImgVerif(){
    return http.get('/api/v1/home/pic').then(res => res);
  },
  //发送验证码
  SendSms: (params) => {
    return http.post('/api/v1/home/sendSms', params).then(res => res);
  }
}

export default api;
