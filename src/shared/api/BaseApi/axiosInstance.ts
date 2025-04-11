import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://status.neuralgeneration.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
