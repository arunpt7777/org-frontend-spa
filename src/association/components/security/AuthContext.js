import { createContext, useContext, useState } from "react";
import {executeJwtAuthenticationService} from '../api/AuthenticationApiService';
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false); // used to enable/disable Login/out buttons in
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    

    

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username }}> 
            {children}
        </AuthContext.Provider>
    )

function login (username, password) {
                
        if( username==='motta' && password==='pwd') {
            setAuthenticated(true)
            setUsername(username)
            return true            
    
        } else {
            logout()
            return false
        }

        
}
        function logout() {
            setAuthenticated(false)
            setUsername(null)
        }

 /*
            apiClient.interceptors.request.use( 
                (config) => { 
                                console.log('Intercepting and adding a token')
                                config.headers.Authorization=jwtToken
                                return config
                            } 
            )
*/
        
}