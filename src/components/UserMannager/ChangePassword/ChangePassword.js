import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import FormikControl from '../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import apiConfig, { error, success } from '../../../API/configApi'
import { useSelector } from 'react-redux'

function ChangePassword() {
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [showPass, setShowPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [showReenterPass, setShowReenterPass] = useState(false)
    console.log(dataUser);
    const initialValues = {
        password: '',
        newPassword: '',
        reenterPassword: '',
      }
    
      const validationSchema = Yup.object({
          password: Yup.string().required('Required').min(8),
          newPassword: Yup.string().required('Required').min(8),
          reenterPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
          .required('Required'),
      })
    
      const onSubmitLogin = async (values, {resetForm}) => {
        // console.log('Form data', values)
        try {
            const result = await axios.post(apiConfig.urlConnect + 'account/change-password', {
                email: dataUser.email,
                password: values.password,
                newPassword: values.newPassword
            })
            console.log(result);
            success("Change password successfully!")
        } catch (e) {
            error(e.response.data.message);
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
            <div className='profile'>
        <h2 className='profile_title'>Change Password</h2>
        <Form className="update-profile__form change-password" >
            <div className='change-password'>
                <FormikControl
                    control='input'
                    type={showPass?"text": "password"}
                    label='Password'
                    name='password'
                />
                {formik.values.password !== "" && <i className={showPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={()=>setShowPass(!showPass)}></i>}
            </div>
            <div className='change-password'>
                <FormikControl
                    control='input'
                    type={showNewPass ? "text": "password"}
                    label='New password'
                    name='newPassword'
                />
                {formik.values.newPassword !== "" && <i className={showNewPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={()=>setShowNewPass(!showNewPass)}></i>}
            </div>
            <div className='change-password'>
                <FormikControl
                    control='input'
                    type={showReenterPass ? "text": "password"}
                    label='Reenter password'
                    name='reenterPassword'
                />
                {formik.values.reenterPassword !== "" && <i className={showReenterPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={()=>setShowReenterPass(!showReenterPass)}></i>}
            </div>
        <div className='profile-edit'>
            <button type="submit" className={`button blue ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid}>
            <i className="fa-solid fa-cloud-arrow-up"></i>Update
            </button>
        </div>
        </Form>
        </div>
        )
    }}
    </Formik>
  )
}

export default ChangePassword