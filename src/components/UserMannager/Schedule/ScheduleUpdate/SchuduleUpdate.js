import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import FormikControl from '../../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import apiConfig, { success } from '../../../../API/configApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../../../../store/LoginSlice'
import { DatePicker, Space, TimePicker } from 'antd'
import moment from 'moment'

function ScheduleUpdate({dataDetail, handleShowSchedule, title}) {

    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [selectedFile, setSelectedFile] = useState();
    // const [image, setImage] = useState();
    const dispatch = useDispatch()

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }

    const initialValues = {
    name: dataDetail?.name,
    overview: dataDetail?.overview,
    }

    const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
    };
    // const disabledDateTime = () => ({
    // disabledHours: () => range(0, 24).splice(0, (new Date()).getHours() + 1),
    // disabledMinutes: () => range(0, 60).splice(0, (new Date()).getMinutes() + 1),
    // });

    const handleDateValue = (date, dateString) => {
        console.log(date, dateString);
    }

    const handleChangeImage = (event) => {
        console.log(event);
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
      };

    //   const handleChangeImage2 = (event) => {
    //     // console.log(event.target.files[0], event.target);
    //     setImage(event.target.files[0]);
    //   };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required').min(2),
    })

    const onSubmitLogin = async (values, {resetForm}) => {
    console.log('Form data', values)
        
        const dataRequest = {...values, user_id: dataUser._id}
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        // formData.append('image_movie2', image);
        formData.append('data', JSON.stringify(dataRequest));
        //  formData.append('password', "duy123");
        console.log("formData", formData);

        const result = await axios.post(apiConfig.urlConnect + 'profile/upload', formData)
        // dispatch(setUserId(result.data))
        handleShowSchedule()
        success("Update successful!")
    }

  return (
    <div className='profile'>
        <h2 className='profile_title'>Update Schedule</h2>
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
                label='Name'
                placeholder="Name"
                name='name'
            /> 
            <FormikControl
            control='input'
            type='text'
            label='Time'
            placeholder="Time"
            name='time'
        />
            <div className='group'>
            <label htmlFor="image_movie" className="label">Avatar</label>
                <input className='input' type="file" name="avatar" onChange={handleChangeImage} />
            </div>
            {/* <div className='group'>
            <label htmlFor="image_movie" className="label">Avatar</label>
                <input className='input' type="file" name="image-backdrop" onChange={handleChangeImage2} />
            </div> */}
            <Space direction="vertical" size={12}>
                <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                onChange={handleDateValue}
                // disabledTime={disabledDateTime}
                showTime={{
                    defaultValue: moment('00:00:00', 'HH:mm:ss'),
                }}/>
            </Space>
            <FormikControl
                control='textarea'
                type='textarea'
                label='Overview'
                placeholder='Overview'
                name='overview'
            />
        <div className='profile-edit'>
            <button type="submit" className={`button blue ${!formik.isValid ? "disable-submit" : ""}`} disabled={!formik.isValid}>
                <i className="fa-solid fa-check"></i>Update
            </button>
            <span className="button red" onClick={handleShowSchedule}>
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

export default ScheduleUpdate