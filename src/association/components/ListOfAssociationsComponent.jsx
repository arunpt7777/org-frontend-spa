import { useEffect, useState } from "react";
import { deleteAssociationApi, retrieveAllAssociationsApi, retrieveAssociationByEmployeeIdApi } from "./api/AssociationApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ListOfAssociationsComponent(){
    
    const [associations, setAssociations] = useState([]);   
    const [message, setMessage] = useState(null); 
    const [totalAmountAlert, setTotalAmountAlert] = useState(null);   
    const [totalAmount, setTotalAmount] = useState(null);    
    const authConext = useAuth();
    const navigate = useNavigate()
    useEffect( () => refreshAssociations(), [] )
    
    function refreshAssociations(){

        retrieveAllAssociationsApi()
        .then(response => setAssociations(response.data))
        .catch(error => console.log(error))
    }

    function deleteAssociation(id){
        console.log('Deleted Association!' + id)
        deleteAssociationApi(id)
        .then( 
            () => {
                setMessage('Deletion of Association no. ' + id + ' is complete!') 
                refreshAssociations()  
            } ) 
        .catch(error => console.log(error))
    }
    
    function updateAssociation(id){
        navigate(`/associations/${id}`) 
    }

    function addAssociation(){
        navigate(`/associations/-1`) 
    }

    
    function calculateTotalAmount(employeeId){
        retrieveAssociationByEmployeeIdApi(employeeId)
        .then(response => {
            setTotalAmount(response.data);
            setTotalAmountAlert('Total Amount is ' + totalAmount);
        }  )
        .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>List of Associations: </h1>
           {message && <div className="alert alert-warning">{message}</div>}
           {totalAmountAlert && <div className="alert alert-warning">{totalAmountAlert}</div>}
                <div> 
                    <table className='table'>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Employee ID </th>
                                <th> Scheme ID </th>
                                <th> Update </th>
                                <th> Total Amount </th>
                            </tr>
                        </thead>
                        <tbody>
                            { associations.map(
                                association => (
                                    <tr key={association.id}>
                                    <td> {association.employeeId} </td>
                                    <td> {association.schemeId} </td>
                                    <td> <button className="btn btn-warning" onClick={() => deleteAssociation(association.id)}> Delete </button> </td>
                                    <td> <button className="btn btn-success" onClick={() => updateAssociation(association.id)}> Update </button> </td>
                                    <td> <button className="btn btn-success" onClick={() => calculateTotalAmount(association.employeeId)}> Total Amount </button> </td>
                                </tr>
                                )
                            )                               
                                
                            }
    
                        </tbody>
                    </table>
                </div> 
                <div> <button className="btn btn-success m-5" onClick={addAssociation}> Add New Association </button></div>
        </div>)
    }