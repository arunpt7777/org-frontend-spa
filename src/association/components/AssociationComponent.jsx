import { useNavigate, useParams } from "react-router-dom"
import { createAssociationApi, retrieveAssociationApi, updateAssociationApi } from "./api/AssociationApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Field, Formik, Form, ErrorMessage } from "formik"
import moment from "moment"

export default function AssociationComponent(){
    const {id} = useParams()
    const authConext = useAuth()
    const navigate = useNavigate()
    const [employeeId, setEmployeeId] = useState('')
    const [schemeId, setSchemeId] = useState('')
    
    useEffect( () => retrieveAssociations(), [id] )

    function retrieveAssociations() {
        if(id != -1) {
                        retrieveAssociationApi(id)
                        .then(response => {
                            setEmployeeId(response.data.employeeId)
                            setSchemeId(response.data.schemeId )
                        })
                        .catch(error => console.log(error))
                    }
            }

    function onSubmit(values){
        const association = {
                        id: values.id,                       
                        employeeId: values.employeeId,
                        schemeId: values.schemeId
                    }

       if(id == -1) {
        association.id = id+1;
        createAssociationApi(association)
        .then(response => navigate('/associations'))
        .catch(error => console.log(error))
       }
       else {
        updateAssociationApi(id, association)
        .then(response => navigate('/associations'))
        .catch(error => console.log(error))
       }
    }

    function validate(values){

        let errors = {
          
        }
        if(values.employeeId.length<1) {errors.employeeId = 'Employee ID is mandatory';}
        if(values.schemeId.length<1) {errors.schemeId = 'Scheme ID is mandatory';}
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Association Details</h1>
            <div> 
                <Formik initialValues={ {employeeId, schemeId} } enableReinitialize={true} 
                onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false} >
                    {
                        (props) => (
                        <Form > 
                            <ErrorMessage name="employeeId" component="div" className="alert alert-warning" />
                            <ErrorMessage name="schemeId" component="div" className="alert alert-warning" />
                            
                            <fieldset className="form-group">
                                <label> Employee ID </label>
                                    <Field type="text" className="form-control" name="employeeId" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Scheme ID </label>
                                    <Field type="text" className="form-control" name="schemeId" />
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