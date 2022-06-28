import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'

function ForgotPassword({setShowForgot, showForgot}) {
    const initialValues = {
        email: '',
        password: ''
      }
    
      const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
          password: Yup.string().required('Required').min(8)
      })
    
      const onSubmitLogin = (values, {resetForm}) => {
        console.log('Form data', values)
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
                name='password'
            />
        <div className="group">
            <input id="check" type="checkbox" className="check" defaultChecked/>
            <input id="tab-3" type="radio" name="tab" className="forgot-password"/>
            <label htmlFor="tab-3" className="forgot-password-text" onClick={()=>setShowForgot(!showForgot)}>Forgot Password?</label>
        </div>
        <div className="group">
            {!formik.isValid}
            <input type="submit" className={`button ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid} value="Sign In"/>
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