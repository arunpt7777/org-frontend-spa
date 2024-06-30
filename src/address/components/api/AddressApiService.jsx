import {apiClient} from './ApiClient';

export const createAddressApi = (username, address) => apiClient.post(`/addresses`, address)
export const retrieveAlladdressesApi = (username) => apiClient.get(`/addresses`)
export const deleteAddressApi = (username, id) => apiClient.delete(`/addresses/${id}`)
export const retrieveAddressApi = (username, id) => apiClient.get(`/addresses/${id}`)
export const updateAddressApi = (username, id, address) => apiClient.put(`addresses/${id}`, address)