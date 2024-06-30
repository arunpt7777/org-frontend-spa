import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function LoginComponent(){
    const [username, setUsername] = useState('motta')
    const [password, setPassword] = useState('pwd')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth();
 
    function handleUsernameChange(event) {
     setUsername(event.target.value);
    }
 
    function handlePasswordChange(event) {
     setPassword(event.target.value);
    }
 
     function handleSubmit(){
     if( authContext.login(username, password)) {
         navigate(`/welcome/${username}`)
     } else {
         setShowErrorMessage(true)
     }
    }
 
     return (
     <div className="Login"> <h1>Time to Login</h1>
     {showErrorMessage && <div className='errorMessage'>Authetication Failed. Please check your credentials. </div>}
         <div className="LoginForm">
             <div>
                 <label>Username </label>
                 <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
             </div>
             <div>
                 <label>Password </label>
                 <input type="password" name="password" value={password} onChange={handlePasswordChange} />
             </div>
             <div>
                 <button type="button" name="Login" onClick={handleSubmit}>Login</button>
             </div>
 
         </div>
     </div>
 )
 }
 