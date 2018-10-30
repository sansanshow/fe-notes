var prefix = 'user/'
const user = {
  login: {
    name: '登录',
    url: prefix + 'login/',
    method: 'post'
  },
  loginOut: {
    name: '登出',
    url: prefix + 'loginout/$id',
    method: 'post'
  },
}
export default user;