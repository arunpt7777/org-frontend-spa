import { useNavigate, useParams } from "react-router-dom"
import { createSchemeApi, retrieveSchemeApi, updateSchemeApi } from "./api/SchemeApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Field, Formik, Form, ErrorMessage } from "formik"
import moment from "moment"

export default function SchemeComponent(){
    const {id} = useParams()
    const authConext = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [validFromDate, setValidFromDate] = useState('')
    const [validToDate, setValidToDate] = useState('')
    const [schemeAmount, setSchemeAmount] = useState('')
    const [schemeType, setschemeType] = useState('')
    
    
    useEffect( () => retrieveSchemes(), [id] )

    function retrieveSchemes() {
        if(id != -1) {
                        retrieveSchemeApi(id)
                        .then(response => {
                            setName(response.data.name)
                            setValidFromDate( moment(response.data.validFromDate, 'DD-MM-YYYY') )
                            setValidToDate(  moment(response.data.validToDate, 'DD-MM-YYYY') )
                            console.log( moment(response.data.validFromDate, 'DD-MM-YYYY'))
                            setSchemeAmount(response.data.schemeAmount)
                            setschemeType(response.data.schemeType)
                        })
                        .catch(error => console.log(error))
                    }
            }

    function onSubmit(values){
        const scheme = {
                        id: values.id,                       
                        name: values.name,
                        validFromDate: values.validFromDate,
                        validToDate: values.validFromDate,
                        schemeAmount: values.schemeAmount,
                        schemeType: values.schemeType
                    }

       if(id == -1) {
        scheme.id = id+1;
        createSchemeApi(scheme)
        .then(response => navigate('/schemes'))
        .catch(error => console.log(error))
       }
       else {
        updateSchemeApi(id, scheme)
        .then(response => navigate('/schemes'))
        .catch(error => console.log(error))
       }
    }

    function validate(values){

        let errors = {
          
        }
        if(values.name.length<1) {errors.firstName = 'Scheme name is mandatory';}
        if(values.validFromDate.length<1) {errors.validFromDate = 'Valid From Date is mandatory';}
        if(values.validToDate.length<1) {errors.validToDate = 'Valid To Date is mandatory';}
        if(values.schemeAmount<0) {errors.schemeAmount = 'Scheme Amount should be greater than zero';}
        if(values.schemeType.length<1) {errors.schemeType = 'Scheme Type is mandatory';}
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Scheme Details</h1>
            <div> 
                <Formik initialValues={ {name, validFromDate, validToDate, schemeAmount, schemeType} } enableReinitialize={true} 
                onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false} >
                    {
                        (props) => (
                        <Form > 
                            <ErrorMessage name="name" component="div" className="alert alert-warning" />
                            <ErrorMessage name="validFromDate" component="div" className="alert alert-warning" />
                            <ErrorMessage name="validToDate" component="div" className="alert alert-warning" />
                            <ErrorMessage name="schemeAmount" component="div" className="alert alert-warning" />
                            <ErrorMessage name="schemeType" component="div" className="alert alert-warning" />
                            
                            <fieldset className="form-group">
                                <label> Scheme Name </label>
                                    <Field type="text" className="form-control" name="name" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Valid From Date: </label>
                                <Field type="text" className="form-control" name="validFromDate" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Valid To Date: </label>
                                <Field type="text" className="form-control" name="validToDate" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Scheme Amount </label>
                                <Field type="text" className="form-control" name="schemeAmount" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label> Scheme Type </label>
                                <Field type="text" className="form-control" name="schemeType" />
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