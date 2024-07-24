
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent(){
    const {username} = useParams();
    const [message, setMessage] = useState(null);
    const authContext = useAuth()

    function successfulResponse(response){
        console.log(response);
        setMessage(response.data);
    }

    function successfulResponseBean(response){
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error){
        console.log(error);
    }

    return (
    <div className="WelcomeComponent"> 
        <h1>Welcome {username} to your Employee Management App </h1> 
        <div>Manage Your Employees here: <Link to='/employees'>Click Here</Link> </div>
        <div>Manage Your Addresses here: <Link to='/addresses'>Click Here</Link> </div>
        <div>Manage Your Schemes here: <Link to='/schemes'>Click Here</Link> </div>
        <div className='text-info'> {message} </div>
    </div>
    )
}