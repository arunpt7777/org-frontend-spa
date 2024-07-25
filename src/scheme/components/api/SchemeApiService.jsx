import {apiClient} from './ApiClient';

export const createSchemeApi = (scheme) => apiClient.post(`/schemes`, scheme)
export const retrieveAllSchemesApi = () => apiClient.get(`/schemes`)
export const deleteSchemeApi = (id) => apiClient.delete(`/schemes/${id}`)
export const retrieveSchemeApi = (id) => apiClient.get(`/schemes/${id}`)
export const updateSchemeApi = (id, scheme) => apiClient.put(`schemes/${id}`, scheme)