import Axios from 'axios'
export default Axios.create({
    baseUrl: process.env.baseUrl || 'http://localhost:3000/'
})
