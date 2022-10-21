import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'
import axios from 'axios'
import apiConfig, { success } from '../../../../API/configApi'

function ForgotPassword({setShowForgot, showForgot}) {
    const initialValues = {
        email: '',
      }
    
      const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
      })
    
      const onSubmitLogin = async (values, {resetForm}) => {
        // console.log('Form data', values)
        await axios.post(apiConfig.urlConnect + "profile/forgot-password", values)
        success("Send successfully!")
        resetForm()
      }
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmitLogin}
    >
    {formik => {
        console.log(formik)
        return (
        <Form  className="forgot-password-htm">
            <FormikControl
                control='input'
                type='email'
                label='Email'
                name='email'
            />
            
        <div className="group">
            <input id="check" type="checkbox" className="check" defaultChecked/>
            <input id="tab-3" type="radio" name="tab" className="forgot-password"/>
            {/* <label htmlFor="tab-3" className="forgot-password-text" onClick={()=>setShowForgot(!showForgot)}>Forgot Password?</label> */}
        </div>
        <div className="group">
            {!formik.isValid}
            <input type="submit" className={`button ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid} value="Send"/>
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
            <label htmlFor="tab-1" onClick={()=>setShowForgot(!showForgot)}>Login</label>
        </div>
        </Form>
        )
    }}
    </Formik>
  )
}

export default ForgotPassword