import { useEffect, useState } from "react";
import { deleteSchemeApi, retrieveAllSchemesApi, retrieveAllSchemesForUSernameApi } from "./api/SchemeApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ListOfSchemesComponent(){
    
    const [schemes, setSchemes] = useState([]);   
    const [message, setMessage] = useState(null);   
    const authConext = useAuth();
    const navigate = useNavigate()
    useEffect( () => refreshSchemes(), [] )
    
    function refreshSchemes(){

        retrieveAllSchemesApi()
        .then(response => setSchemes(response.data))
        .catch(error => console.log(error))
    }

    function deleteScheme(id){
        console.log('Deleted Scheme!' + id)
        deleteSchemeApi(id)
        .then( 
            () => {
                setMessage('Deletion of Scheme no. ' + id + ' is complete!') 
                refreshSchemes()  
            } ) 
        .catch(error => console.log(error))
    }
    
    function updateScheme(id){
        navigate(`/schemes/${id}`) 
    }

    function addScheme(){
        navigate(`/schemes/-1`) 
    }

    return (
        <div className="container">
            <h1>List of Schemes: </h1>
           {message && <div className="alert alert-warning">{message}</div>} 
                <div> 
                    <table className='table'>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Name </th>
                                <th> Valid From Date </th>
                                <th> Valid To Date </th>
                                <th> Scheme Amount </th>
                                <th> Scheme Type ID </th>
                                <th> Delete </th>
                                <th> Update </th>
                            </tr>
                        </thead>
                        <tbody>
                            { schemes.map(
                                scheme => (
                                    <tr key={scheme.id}>
                                    <td> {scheme.id} </td>
                                    <td> {scheme.name} </td>
                                    <td> {scheme.validFromDate} </td>
                                    <td> {scheme.validToDate} </td>
                                    <td> {scheme.schemeAmount} </td>
                                    <td> {scheme.schemeType} </td>
                                    <td> <button className="btn btn-warning" onClick={() => deleteScheme(scheme.id)}> Delete </button> </td>
                                    <td> <button className="btn btn-success" onClick={() => updateScheme(scheme.id)}> Update </button> </td>
                                </tr>
                                )
                            )                               
                                
                            }
    
                        </tbody>
                    </table>
                </div> 
                <div> <button className="btn btn-success m-5" onClick={addScheme}> Add New scheme </button></div>
        </div>)
    }