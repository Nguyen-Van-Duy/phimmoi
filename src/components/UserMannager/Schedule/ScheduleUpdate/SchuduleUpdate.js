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
import { genderMovie } from '../../../../API/MoviesApi'

function ScheduleUpdate({dataDetail, handleShowSchedule,handleShowAddScheduleClose, title}) {

    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [selectedFile, setSelectedFile] = useState();
    const [checkDate, setCheckDate] = useState(false);
    const [checkFile, setCheckFile] = useState(false);
    const [valueDate, setValueDate] = useState('');
    // const [image, setImage] = useState();
    const dispatch = useDispatch()

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }

    const listGenres = []
    if(dataDetail) {
        dataDetail.genres.forEach(item=>listGenres.push(item.value))
    }

    const initialValues = {
    name: dataDetail?.name,
    overview: dataDetail?.overview,
    genres: listGenres,
    password: dataDetail?.password,
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
        setValueDate(dateString)
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
        overview: Yup.string().required('Required').min(2),
        genres: Yup.array().required('Required'),
    })

    const onSubmitLogin = async (values, {resetForm}) => {
       
    console.log('Form data', values)
    let arrGenres = []
        values.genres.forEach(item => {
            for(let i = 0; i < genderMovie.length; i++) {
                if(genderMovie[i].value === item) {
                    arrGenres.push(genderMovie[i])
                }
            }
        });
        
        const dataRequest = {...values, user_id: dataUser._id, time: valueDate, genres: arrGenres}
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        // formData.append('image_movie2', image);
        formData.append('data', JSON.stringify(dataRequest));
        //  formData.append('password', "duy123");
        console.log("formData", dataRequest);

        const result = await axios.post(apiConfig.urlConnect + 'upload/add-schedule', formData)
        console.log(result);
        success("Update successful!")
        handleShowAddScheduleClose(null)
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
        // console.log(formik)
        
        return (
        <Form  className="update-profile__form">
            <FormikControl
                control='input'
                type='text'
                label='Name *'
                placeholder="Name"
                name='name'
            /> 
            <div className='group'>
                <label htmlFor="image_movie" className="label">Backdrop *</label>
                <input className='input' type="file" name="avatar" onChange={handleChangeImage} onBlur={()=>setCheckFile(true)} />
                {checkFile === true && !selectedFile && <span className='error'>Required</span>}
            </div>
            <FormikControl
                        control='checkbox'
                        label='Checkbox genres *'
                        name='genres'
                        options={genderMovie}
                    />
            <div className='group'>
            <label htmlFor="image_movie" className="label">Time *</label>
            <Space direction="vertical" size={12}>
                <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                onChange={handleDateValue}
                onBlur={()=>setCheckDate(true)}
                name="date"
                // disabledTime={disabledDateTime}
                showTime={{
                    defaultValue: moment('00:00:00', 'HH:mm:ss'),
                }}/>
            </Space>
            {checkDate === true && valueDate.trim() === '' && <span className='error'>Required</span>}
            </div>
            <FormikControl
                control='textarea'
                type='textarea'
                label='Overview *'
                placeholder='Overview'
                name='overview'
            />
            <FormikControl
                control='input'
                type='text'
                label='Password'
                placeholder="Password"
                name='password'
            /> 
        <div className='profile-edit'>
            <button type="submit" className={`button blue ${!formik.isValid ? "disable-submit" : ""}`} 
            onClick={()=>{ setCheckFile(true); setCheckDate(true); handleShowAddScheduleClose(null)}} disabled={!formik.isValid}>
                <i className="fa-solid fa-check"></i>Update
            </button>
            <span className="button red" onClick={()=>handleShowAddScheduleClose(null)}>
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