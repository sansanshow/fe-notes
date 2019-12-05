import axios from '../utils/http'

const UserBaseUrl = '/user'

const api = {
    login (params) {
        return axios.post(`${UserBaseUrl}/login`, params).then(res => res.data)
    }
}

export default api
