import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import apiConfig from '../../../API/configApi'
import { useSelector } from 'react-redux'

function ChangePassword() {
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
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
        const result = await axios.post(apiConfig.urlConnect + 'account/change-password', {
            email: dataUser.email,
            password: values.password,
            newPassword: values.newPassword
        })
        console.log(result);
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
            <FormikControl
                control='input'
                type='password'
                label='Password'
                name='password'
            />
            <FormikControl
                control='input'
                type='password'
                label='New password'
                name='newPassword'
            />
            <FormikControl
                control='input'
                type='password'
                label='Reenter password'
                name='reenterPassword'
            />
        
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