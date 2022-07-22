import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import { useSelector } from 'react-redux'
import { error, success } from '../../../../API/configApi'

function RegisterForm({setShowForgot, showForgot}) {
    const urlConnect = useSelector((state) => state.loginSlice.urlConnect)
    const initialValues = {
        email: '',
        user_name: '',
        password: '',
        repeat_password: '',
      }
    
      const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
        user_name: Yup.string().required('Required').min(2),
        password: Yup.string().required('Required').min(8),
        repeat_password: Yup.string()
          .oneOf([Yup.ref('password'), ''], 'Passwords must match')
          .required('Required'),
      })
    
      const onSubmitLogin = async (values, {resetForm}) => {
        // console.log('Form data', values)
            try {
                const result = await axios.post(urlConnect + 'account/create-account', {
                    user_name: values.user_name.trim(),
                    email: values.email.trim(),
                    password: values.password.trim()
                })
                console.log(result);
                if(result.data.status === 409) {
                    error(result.data.message)
                } else {
                    console.log(result);
                    success("Sign Up Success!")
                }
                resetForm()
            } catch(e) {
                error(e.response.data.message);
            } 
      }
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmitLogin}
    >
    {formik => {
        // console.log(formik)
        return (
        <Form  className="sign-up-htm">
            <FormikControl
                control='input'
                type='email'
                label='Email'
                name='email'
            />
            <FormikControl
                control='input'
                type='text'
                label='USER NAME'
                name='user_name'
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
                name='repeat_password'
            />
        <div className="group">
            {!formik.isValid}
            <input type="submit" className={`button ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid} value="Sign Up"/>
        </div>
        {/* <div className="hr"></div>
        <div className="foot-lnk">
            <label htmlFor="tab-1">Already Member?</label>
        </div> */}
        </Form>
        )
    }}
    </Formik>
  )
}

export default RegisterForm