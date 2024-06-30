import {apiClient} from './ApiClient';

export const createEmployeeApi = (username, employee) => apiClient.post(`/employees`, employee)
export const retrieveAllEmployeesApi = (username) => apiClient.get(`/employees`)
export const deleteEmployeeApi = (username, id) => apiClient.delete(`/employees/${id}`)
export const retrieveEmployeeApi = (username, id) => apiClient.get(`/employees/${id}`)
export const updateEmployeeApi = (username, id, employee) => apiClient.put(`employees/${id}`, employee)