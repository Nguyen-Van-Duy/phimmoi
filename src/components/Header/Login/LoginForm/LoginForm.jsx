import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setUserId } from '../../../../store/LoginSlice'
// import { useNavigate } from 'react-router-dom'

function LoginForm({setShowForgot, showForgot, handleCloseModal}) {

    const urlConnect = useSelector((state) => state.loginSlice.urlConnect)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
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
    
      const onSubmitLogin = async (values, {resetForm}) => {
        // console.log('Form data', values)
        const result = await axios.post(urlConnect + 'account/login', {
            email: values.email,
            password: values.password
        })
        if(result.data.status === 200) {
            console.log("login :", result);
            localStorage.setItem("token", result.data.token)
            dispatch(setUserId(result.data))
            handleCloseModal()
            // navigate('/messenger')
        } else {
            alert('Tài khoản mật khẩu không chính xác!')
        }
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
        <Form  className="sign-in-htm">
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
        <div className="group">
            <input id="check" type="checkbox" className="check" defaultChecked/>
            <input id="tab-3" type="radio" name="tab" className="forgot-password"/>
            <label htmlFor="tab-3" className="forgot-password-text" onClick={()=>setShowForgot(!showForgot)}>Forgot Password?</label>
        </div>
        <div className="group">
            {!formik.isValid}
            <input type="submit" className={`button ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid} value="Sign In"/>
        </div>
        {/* <div className="group">
            {!formik.isValid}
            <input type="button" className={`button`} onClick={formik.resetForm} value="Reset"/>
        </div> */}
        <div className="hr"></div>
        <div className="foot-lnk">
            <span href="#forgot">Forgot Password?</span>
        </div>
        </Form>
        )
    }}
    </Formik>
  )
}

export default LoginForm