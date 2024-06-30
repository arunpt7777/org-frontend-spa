import { useNavigate, useParams } from "react-router-dom"
import { createEmployeeApi, retrieveEmployeeApi, updateEmployeeApi } from "./api/EmployeeApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Field, Formik, Form, ErrorMessage } from "formik"
import moment from "moment"

export default function EmployeeComponent(){
    const {id} = useParams()
    const authConext = useAuth()
    const navigate = useNavigate()
    const username = authConext.username;
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    
    useEffect( () => retrieveEmployees(), [id] )

    function retrieveEmployees() {
        if(id != -1) {
                        retrieveEmployeeApi(username, id)
                        .then(response => {
                            setFirstName(response.data.firstName)
                            setLastName(response.data.lastName)
                            setGender(response.data.gender)
                            setAge(response.data.age)
                            setEmail(response.data.email)
                            setPhone(response.data.phone)
                        })
                        .catch(error => console.log(error))
                    }
            }

    function onSubmit(values){
        const employee = {
                        id: values.id,                       
                        firstName: values.firstName,
                        lastName: values.lastName,
                        gender: values.gender,
                        age: values.age,
                        email: values.email,
                        employeeNumber: values.id, 
                        phone: values.phone
                    }

       if(id == -1) {
        employee.id = id+1;
        createEmployeeApi(username, employee)
        .then(response => navigate('/employees'))
        .catch(error => console.log(error))
       }
       else {
        updateEmployeeApi(username, id, employee)
        .then(response => navigate('/employees'))
        .catch(error => console.log(error))
       }
    }

    function validate(values){

        let errors = {
          /*
            firstName: 'Enter a First name',
           lastName: 'Enter a Last name',
           age: 'Enter a valid age (between 18 and 80)',
           email: 'Enter a valid Email'
           */
        }
        if(values.firstName.length<1) {errors.firstName = 'First name is mandatory';}
        if(values.lastName.length<1) {errors.lastName = 'Last name is mandatory';}
       // if(values.gender==='Male' || values.gender==='Female' || values.gender==='Other') {errors.gender = 'Gender should be Male/Female/Other';}
        if(values.age<18 || values.age>80) {errors.age = 'Age should be between 18 and 80 years';}
        if(values.email.length<1) {errors.email = 'Email is mandatory';}
        if(/^\d+$/.test(phone)) {errors.phone = 'Phone number must contain only digits';}

        return errors
    }

    return (
        <div className="container">
            <h1>Enter Employee Details</h1>
            <div> 
                <Formik initialValues={ {firstName, lastName, gender, age, email, phone} } enableReinitialize={true} 
                onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false} >
                    {
                        (props) => (
                        <Form > 
                            <ErrorMessage name="firstName" component="div" className="alert alert-warning" />
                            <ErrorMessage name="lastName" component="div" className="alert alert-warning" />
                            <ErrorMessage name="gender" component="div" className="alert alert-warning" />
                            <ErrorMessage name="age" component="div" className="alert alert-warning" />
                            <ErrorMessage name="email" component="div" className="alert alert-warning" />
                            <ErrorMessage name="phone" component="div" className="alert alert-warning" />
                            
                            <fieldset className="form-group">
                                <label> First Name </label>
                                    <Field type="text" className="form-control" name="firstName" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Last Name</label>
                                <Field type="text" className="form-control" name="lastName" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Gender </label>
                                <Field type="text" className="form-control" name="gender" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Age </label>
                                <Field type="text" className="form-control" name="age" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Email </label>
                                <Field type="text" className="form-control" name="email" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Phone </label>
                                <Field type="text" className="form-control" name="phone" />
                            </fieldset>

                        <div> <button className="btn btn-success m-5" type="submit"> Save </button> </div>
                        </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}