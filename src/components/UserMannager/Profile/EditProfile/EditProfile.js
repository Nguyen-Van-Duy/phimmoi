import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'
// import axios from "axios"
// import apiConfig from '../../../../API/configApi'
import './EditProfile.css'

function EditProfile({handleShowEditProfile}) {

    const [selectedFile, setSelectedFile] = useState();

    const initialValues = {
        fullName: 'Nguyễn Văn Duy',
        date: '2022-07-06',
        hometown: '',
        phone: '',
        loves: '',
        hates: '',
        description: '',
        image: '',
      }

      console.log({...initialValues, test: "hi"});

    const handleChangeImage = (event) => {
        console.log(event.target.files[0], event.target);
        setSelectedFile(event.target.files[0]);
        // setIsFilePicked(true);
      };
   
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Required').min(2),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    })

    const onSubmitLogin = async (values, {resetForm}) => {
    console.log('Form data', values)
        // const result = await axios.post(apiConfig.urlConnect + 'account/login', {
        //     email: values.email,
        //     password: values.password
        // })
        // if(result.data.status === 200) {
        //     // navigate('/messenger')
        // } else {
        // }
        const formData = new FormData();
        console.log(formData);
        formData.append('image_movie', selectedFile);
        formData.append('data', JSON.stringify(values));
        //  formData.append('password', "duy123");
        console.log(formData);

        fetch(
            'http://localhost:8080/api-movie/profile/upload',
            {
            method: 'POST',
            body: formData,
            }
        )
        .then((response) => console.log('222222222222', response))
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

  return (
    <div className='profile'>
        <h2 className='profile_title'>Update Profile</h2>
        <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmitLogin}
    >
    {formik => {
        console.log(formik)
        
        return (
        <Form  className="update-profile__form">
            <FormikControl
                control='input'
                type='text'
                label='Full name'
                placeholder="Full name"
                name='fullName'
            />
            <div className='group'>
            <label htmlFor="image_movie" className="label">Avatar</label>
                <input className='input' type="file" name="image_movie" onChange={handleChangeImage} />
            </div>
            <FormikControl
                control='date'
                type='date'
                label='Date of birth'
                placeholder='Date of birth'
                name='date'
            />
            <FormikControl
                control='input'
                type='text'
                label='Hometown'
                placeholder='Hometown'
                name='hometown'
            />
            <FormikControl
                control='input'
                type='text'
                label='Phone'
                placeholder='Phone'
                name='phone'
            />
            <FormikControl
                control='input'
                type='text'
                label='Loves'
                placeholder='Loves'
                name='loves'
            />
            <FormikControl
                control='input'
                type='text'
                label='Hates'
                placeholder='Hates'
                name='hates'
            />
            <FormikControl
                control='textarea'
                type='textarea'
                label='Description'
                placeholder='Description'
                name='description'
            />
        <div className='profile-edit'>
            <button type="submit" className={`button blue ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid}>
                <i className="fa-solid fa-check"></i>Update profile
            </button>
            <span className="button blue" onClick={handleShowEditProfile}>
                <i className="fa-solid fa-user-pen"></i>Edit profile
            </span>
        </div>
        </Form>
        )
    }}
    </Formik>

        
    </div>
  )
}

export default EditProfile