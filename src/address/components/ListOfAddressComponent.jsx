import { useEffect, useState } from "react";
import { deleteAddressApi, retrieveAllAddressesApi } from "./api/AddressApiService";
import { useAuth } from "../../employee/components/security/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ListOfAddressesComponent(){
    
    const [Addresses, setAddresses] = useState([]);   
    const [message, setMessage] = useState(null);   
    const authConext = useAuth();
    const username = authConext.username;
    const navigate = useNavigate()
    useEffect( () => refreshAddresses(), [] )
    
    function refreshAddresses(){

        retrieveAllAddressesApi(username)
        .then(response => setAddresses(response.data))
        .catch(error => console.log(error))
    }

    function deleteAddress(id){
        console.log('Deleted address!' + id)
        deleteAddressApi(username,id)
        .then( 
            () => {
                setMessage('Deletion of address no. ' + id + ' is complete!') 
                refreshAddresses()  
            } ) 
        .catch(error => console.log(error))
    }
    
    function updateAddress(id){
        navigate(`/addresses/${id}`) 
    }

    function addAddress(){
        navigate(`/addresses/-1`) 
    }

    return (
    <div className="container">
        <h1>List of Addresses: </h1>
       {message && <div className="alert alert-warning">{message}</div>} 
            <div> 
                <table className='table'>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Line 1 </th>
                            <th> Line 2 </th>
                            <th> Zipcode </th>
                            <th> Type </th>
                            <th> Employee ID </th>
                            <th> Delete </th>
                            <th> Update </th>
                        </tr>
                    </thead>
                    <tbody>
                        { Addresses.map(
                            address => (
                                <tr key={address.id}>
                                <td> {address.id} </td>
                                <td> {address.addressLine1} </td>
                                <td> {address.addressLine2} </td>
                                <td> {address.zipCode} </td>
                                <td> {address.addressType} </td>
                                <td> {address.employeeId} </td>
                                <td> <button className="btn btn-warning" onClick={() => deleteAddress(address.id)}> Delete </button> </td>
                                <td> <button className="btn btn-success" onClick={() => updateAddress(address.id)}> Update </button> </td>
                            </tr>
                            )
                        )                               
                            
                        }

                    </tbody>
                </table>
            </div> 
            <div> <button className="btn btn-success m-5" onClick={addAddress}> Add New address </button></div>
    </div>)
}