import { axiosInstance } from './axiosInstance'

export const fetchClient = {
  get: async <T = unknown>(url: string, params?: object): Promise<T> => {
    const res = await axiosInstance.get<T>(url, { params })
    return res.data
  },

  post: async <T = unknown>(url: string, data?: object): Promise<T> => {
    const res = await axiosInstance.post<T>(url, data)
    return res.data
  },
}
