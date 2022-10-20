import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../API/configApi'
import FormikControl from '../../components/Form/FormikControl'
import * as Yup from 'yup'

export default function ResetPassword() {
    // const [isloading, setisLoading] = useState(true)
    const valueRef = useRef()
    const param = useParams()

    const initialValues = {
        password: '',
        repeat_password: '',
    }
    
        const validationSchema = Yup.object({
            password: Yup.string().required('Required').min(8),
            repeat_password: Yup.string()
              .oneOf([Yup.ref('password'), ''], 'Passwords must match')
              .required('Required'),
        })
    
        const onSubmit = async (values, {resetForm}) => {
        console.log('Form data', values)
        const result = await axios.post(apiConfig.urlConnect + 'profile/reset-password/', {token: param.token, password: values.password.trim()})
        console.log(result);
        resetForm()
        }
  return (
    <div className="content-list">
            <div className="movie-list view-more__container">
                <div className="movie-list__header reset-password-center">
                    <span className="movie-list__title">Reset Password</span>
                </div>
                <div className='schedule_list'>
                <div className="reset-password-send">
                <div className="login-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    >
                    {formik => {
                        console.log(formik)
                        return (
                        <Form  className="forgot-password-htm">
                            <FormikControl
                                control='input'
                                type='password'
                                label='password'
                                name='password'
                            />
                            <FormikControl
                                control='input'
                                type='password'
                                label='password'
                                name='repeat_password'
                            />
                        
                        <div className="group">
                            {!formik.isValid}
                            <input type="submit" className={`button ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid} value="Send"/>
                        </div>
                        </Form>
                        )
                    }}
                    </Formik>
                    </div>
                    </div>
                </div> 
            </div>
        </div>
  )
}
