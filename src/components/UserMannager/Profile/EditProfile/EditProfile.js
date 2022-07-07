import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import apiConfig from '../../../../API/configApi'
import './EditProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../../../../store/LoginSlice'

function EditProfile({handleShowEditProfile}) {

    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [selectedFile, setSelectedFile] = useState();
    const [image, setImage] = useState();
    const dispatch = useDispatch()

    const radioOptions = [
        { key: 'male', value: 'male' },
        { key: 'female', value: 'female' }
      ]

    const initialValues = {
        user_name: dataUser.user_name,
        date_of_birth: dataUser.date_of_birth,
        hometown: dataUser.hometown,
        phone: dataUser.phone,
        loves: dataUser.loves,
        hates: dataUser.hates,
        description: dataUser.description,
        gender: dataUser.gender,
      }

      console.log({...initialValues, test: "hi"});

    const handleChangeImage = (event) => {
        console.log(event);
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
      };

      const handleChangeImage2 = (event) => {
        // console.log(event.target.files[0], event.target);
        setImage(event.target.files[0]);
      };
   
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object({
        user_name: Yup.string().required('Required').min(2),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    })

    const onSubmitLogin = async (values, {resetForm}) => {
    console.log('Form data', values)
        
        const dataRequest = {...values, user_id: dataUser._id}
        const formData = new FormData();
        formData.append('image_movie', selectedFile);
        formData.append('image_movie2', image);
        formData.append('data', JSON.stringify(dataRequest));
        //  formData.append('password', "duy123");
        console.log("formData", formData);

        const result = await axios.post(apiConfig.urlConnect + 'profile/upload', formData)
        dispatch(setUserId(result.data))
        handleShowEditProfile()
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
                name='user_name'
            />
            <FormikControl
            control='radio'
            label='Gender'
            name='gender'
            options={radioOptions}
          />
            <div className='group'>
            <label htmlFor="image_movie" className="label">Avatar</label>
                <input className='input' type="file" name="image_movie" onChange={handleChangeImage} />
            </div>
            <div className='group'>
            <label htmlFor="image_movie" className="label">Avatar</label>
                <input className='input' type="file" name="image_movie2" onChange={handleChangeImage2} />
            </div>
            <FormikControl
                control='date'
                type='date'
                label='Date of birth'
                placeholder='Date of birth'
                name='date_of_birth'
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
                <i className="fa-solid fa-check"></i>Update
            </button>
            <span className="button red" onClick={handleShowEditProfile}>
            <i className="fa-solid fa-xmark"></i>Cancel
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