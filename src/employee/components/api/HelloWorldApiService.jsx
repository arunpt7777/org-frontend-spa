import {apiClient} from '../api/ApiClient';

export const retrieveHelloWorldApi = () => apiClient.get('/hello-world')
export const retrieveHelloWorldBeanApi = () => apiClient.get('/hello-world-bean')
export const retrieveHelloWorldPathVariableApi = (username, token) => apiClient.get(`/hello-world/path-variable/${username}` 
// , {headers:{Authorization: token}} 
)

export const  executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`, { headers:{Authorization: token} } )
