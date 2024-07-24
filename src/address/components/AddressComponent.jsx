import { useNavigate, useParams } from "react-router-dom"
import { createAddressApi, retrieveAddressApi, updateAddressApi } from "../../address/components/api/AddressApiService.jsx"
import { useAuth } from "../../employee/components/security/AuthContext.js"
import { useEffect, useState } from "react"
import { Field, Formik, Form, ErrorMessage } from "formik"
import moment from "moment"

export default function AddressComponent(){
    const {id} = useParams()
    const authConext = useAuth()
    const navigate = useNavigate()
    const username = authConext.username;
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [addressType, setAddressType] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    
    useEffect( () => retrieveAddress(), [id] )

    function retrieveAddress() {
        if(id != -1) {
                        retrieveAddressApi(username, id)
                        .then(response => {
                            setAddressLine1(response.data.addressLine1)
                            setAddressLine2(response.data.addressLine2)
                            setZipCode(response.data.zipCode)
                            setAddressType(response.data.addressType)
                            setEmployeeId(response.data.employeeId)
                        })
                        .catch(error => console.log(error))
                    }
            }

    function onSubmit(values){
        const address = {
                        id: values.id,                       
                        addressLine1: values.addressLine1,
                        addressLine2: values.addressLine2,
                        zipCode: values.zipCode,
                        addressType: values.addressType,
                        employeeId: values.employeeId
                    }

       if(id == -1) {
        address.id = id+1;
        createAddressApi(username, address)
        .then(response => navigate('/addresses'))
        .catch(error => console.log(error))
       }
       else {
        updateAddressApi(username, id, address)
        .then(response => navigate('/addresses'))
        .catch(error => console.log(error))
       }
    }

    function validate(values){

        let errors = {

        }
        if(values.addressLine1.length<1) {errors.addressLine1 = 'Address Line 1 is mandatory';}
        if(values.addressLine2.length<1) {errors.addressLine2 = 'Address Line 2 is mandatory';}
        if(/^\d+$/.test(zipCode)) {errors.zipCode = 'Zip Code must contain only digits';}
        if(values.addressType.length<1) {errors.addressType = 'Address Type is mandatory';}
        if(values.employeeId.length<1) {errors.employeeId = 'Employee Id is mandatory';}

        return errors
    }

    return (
        <div className="container">
            <h1>Enter Address Details</h1>
            <div> 
                <Formik initialValues={ {addressLine1, addressLine2, zipCode, addressType, employeeId } } enableReinitialize={true} 
                onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false} >
                    {
                        (props) => (
                        <Form > 
                            <ErrorMessage name="addressLine1" component="div" className="alert alert-warning" />
                            <ErrorMessage name="addressLine2" component="div" className="alert alert-warning" />
                            <ErrorMessage name="zipCode" component="div" className="alert alert-warning" />
                            <ErrorMessage name="addressType" component="div" className="alert alert-warning" />
                            <ErrorMessage name="employeeId" component="div" className="alert alert-warning" />
                            
                            <fieldset className="form-group">
                                <label> Address Line1 </label>
                                    <Field type="text" className="form-control" name="addressLine1" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Address Line2 </label>
                                <Field type="text" className="form-control" name="addressLine2" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Zip Code </label>
                                <Field type="text" className="form-control" name="zipCode" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Address Type </label>
                                <Field type="text" className="form-control" name="addressType" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Employee ID </label>
                                <Field type="text" className="form-control" name="employeeId" />
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