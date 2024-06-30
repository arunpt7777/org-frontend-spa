import { useEffect, useState } from "react";
import { deleteEmployeeApi, retrieveAllEmployeesApi, retrieveAllEmployeesForUSernameApi } from "./api/EmployeeApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ListOfEmployeesComponent(){
    
    const [employees, setEmployees] = useState([]);   
    const [message, setMessage] = useState(null);   
    const authConext = useAuth();
    const username = authConext.username;
    const navigate = useNavigate()
    useEffect( () => refreshEmployees(), [] )
    
    function refreshEmployees(){

        retrieveAllEmployeesApi(username)
        .then(response => setEmployees(response.data))
        .catch(error => console.log(error))
    }

    function deleteEmployee(id){
        console.log('Deleted Employee!' + id)
        deleteEmployeeApi(username,id)
        .then( 
            () => {
                setMessage('Deletion of Employee no. ' + id + ' is complete!') 
                refreshEmployees()  
            } ) 
        .catch(error => console.log(error))
    }
    
    function updateEmployee(id){
        navigate(`/employees/${id}`) 
    }

    function addEmployee(){
        navigate(`/employees/-1`) 
    }

    return (
    <div className="container">
        <h1>List of Employees: </h1>
       {message && <div className="alert alert-warning">{message}</div>} 
            <div> 
                <table className='table'>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> First name </th>
                            <th> Last name </th>
                            <th> Gender </th>
                            <th> Age </th>
                            <th> Email </th>
                            <th> Delete </th>
                            <th> Update </th>
                        </tr>
                    </thead>
                    <tbody>
                        { employees.map(
                            emp => (
                                <tr key={emp.id}>
                                <td> {emp.id} </td>
                                <td> {emp.firstName} </td>
                                <td> {emp.lastName} </td>
                                <td> {emp.gender} </td>
                                <td> {emp.age} </td>
                                <td> {emp.email} </td>
                                <td> <button className="btn btn-warning" onClick={() => deleteEmployee(emp.id)}> Delete </button> </td>
                                <td> <button className="btn btn-success" onClick={() => updateEmployee(emp.id)}> Update </button> </td>
                            </tr>
                            )
                        )                               
                            
                        }

                    </tbody>
                </table>
            </div> 
            <div> <button className="btn btn-success m-5" onClick={addEmployee}> Add New Employee </button></div>
    </div>)
}