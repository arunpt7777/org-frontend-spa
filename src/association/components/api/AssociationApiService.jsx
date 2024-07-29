import {apiClient} from './ApiClient';

export const createAssociationApi = (association) => apiClient.post(`/associations`, association)
export const retrieveAllAssociationsApi = () => apiClient.get(`/associations`)
export const deleteAssociationApi = (id) => apiClient.delete(`/associations/${id}`)
export const retrieveAssociationApi = (id) => apiClient.get(`/associations/${id}`)
export const updateAssociationApi = (id, association) => apiClient.put(`associations/${id}`, association)
export const retrieveAssociationByEmployeeIdApi = (employeeId) => apiClient.get(`/totalamountforemployeeId/${employeeId}`)