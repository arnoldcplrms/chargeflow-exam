const axios = require('axios').default

module.exports.axiosInstance = axios.create({ baseURL: process.env.BASE_URL })
