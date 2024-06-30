
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { retrieveHelloWorldApi, retrieveHelloWorldBeanApi, retrieveHelloWorldPathVariableApi } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent(){
    const {username} = useParams();
    const [message, setMessage] = useState(null);
    const authContext = useAuth()

    function callHelloWorldRestApi(){
        
        retrieveHelloWorldApi()
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('cleanup'))

    }

    function callHelloWorldBeanRestApi(){

        retrieveHelloWorldBeanApi()
        .then((response) => successfulResponseBean(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('cleanup'))
    }

    function callHelloWorldPathVariableApi(){

        retrieveHelloWorldPathVariableApi('motta', authContext.token)
        .then((response) => successfulResponseBean(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('cleanup'))
    }

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
        <div> <button className='btn btn-success m-5' onClick={callHelloWorldRestApi} > Call HelloWorld </button> </div>
        <div className='text-info'> {message} </div>
    </div>
    )
}