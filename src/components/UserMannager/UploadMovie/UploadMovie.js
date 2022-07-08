import React, { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import FormikControl from '../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import apiConfig from '../../../API/configApi'
import '../Profile/EditProfile/EditProfile.css'
import { useDispatch, useSelector } from 'react-redux'
// import { setUserId } from '../../../store/LoginSlice'
import { genderMovie } from '../../../API/MoviesApi'

function UploadMovie() {

    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [backdrop, setBackdrop] = useState();
    const [poster, setPoster] = useState();
    const [checkBackdrop, setCheckBackdrop] = useState(null);
    const [checkPoster, setCheckPoster] = useState(null);
    const [checkTypeUrl, setCheckTypeUrl] = useState();
    const urlRef = useRef()

    // const [checkboxGender, setCheckboxGender] = useState([])
    // const [typeMedia, setTypeMedia] = useState(null)
    const dispatch = useDispatch()

    const mediaType = [
        { key: 'Movie', value: 'movie' },
        { key: 'Tv', value: 'tv' }
      ]
    const urlType = [
        { key: 'Iframe', value: 'iframe' },
        { key: 'Video', value: 'video' }
    ]

    const initialValues = {
        // user_id: "",
        // user_name: "",
        // status: "",
        overview: "",
        release_date: "", 
        // backdrop_path: "",
        // poster_path: "",
        name: "",
        // vote_average: "",
        runtime: "", 
        // vote_count: "", 
        country: "", 
        director: "", 
        media_type: "", 
        url_type: "",
        url: "",  
        genres: [], 
        number_of_episodes: "",
        number_of_seasons: "",
        seasons: [],
      }

      console.log(initialValues.url_type);

    const handleChangeImageBackdrop = (event) => {
        setBackdrop(event.target.files[0]);
        setCheckBackdrop(true)
      };

      const handleChangeImagePoster = (event) => {
        setPoster(event.target.files[0]);
        setCheckPoster(true)
      };
   
    const validationSchema = Yup.object({
        name: Yup.string().required('Required').min(2),
        media_type: Yup.string().required('Required'),
        url_type: Yup.string().required('Required'),
        url: Yup.string().required('Required'),
        overview: Yup.string().required('Required'),
        genres: Yup.array().required('Required'),

    })

    const onSubmitLogin = async (values, {resetForm}) => {
        console.log('Form data', values)
        if(checkPoster === true && checkBackdrop !== true) {
            setCheckBackdrop(false)
            return
        } else if(checkBackdrop === true && checkPoster !== true) {
            setCheckPoster(false)
            return
        } else if(checkPoster !== true && checkBackdrop !== true) {
            setCheckPoster(false)
            setCheckBackdrop(false)
            return
        } 
        
        const dataRequest = {...values, user_id: dataUser._id}
        const formData = new FormData();
        formData.append('image_backdrop', backdrop);
        formData.append('image_poster', poster);
        formData.append('data', JSON.stringify(dataRequest));
        //  formData.append('password', "duy123");

        const result = await axios.post(apiConfig.urlConnect + 'upload/upload-movie', formData)
        // dispatch(setUserId(result.data))
    }

    // useEffect(()=> {
    //     const getGender = async () => {
    //         const dataGender = await genreMovies("movie")
    //         console.log(dataGender);
    //         setCheckboxGender(dataGender)
    //     }
    //     getGender()
    // }, [])

    // const handleChangeMediaType = e =>{
    //     console.log(e.target.value);
    // }
    const handleCheckUrl = () => {
        console.log(urlRef.current.value);
        if(urlRef.current.value.includes("<iframe")) {
            setCheckTypeUrl("iframe")
            // const listItem = document.getElementById("test");
            // let newItem = document.createElement('div');
            // let text = document.createTextNode(urlRef.current.value)
            // newItem.appendChild(text)
            // listItem.appendChild(newItem)
            return
        }
        if(urlRef.current.value.includes("http")) {
            setCheckTypeUrl("video")
        }
    }

    
  return (
    <div className='profile'>
        <h2 className='profile_title'>Update Movie</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitLogin}
            >
            {formik => {
                console.log(formik)
                console.log(formik.values.url);
                if(formik.values.url !== "") {
                    handleCheckUrl(formik.values.url)
                }
                // if(formik.values.media_type !== typeMedia) {
                //     console.log("set");
                    // setTypeMedia(formik.values.media_type)
                // }
                
                return (
                <Form  className="update-profile__form">
                    <FormikControl
                        control='input'
                        type='text'
                        label='Movie name'
                        placeholder="Movie name"
                        name='name'
                    />
                    <FormikControl
                    control='radio'
                    label='Media type'
                    name='media_type'
                    // onChange={handleChangeMediaType}
                    options={mediaType}
                     />
                     <FormikControl
                    control='radio'
                    label='Url type'
                    name='url_type'
                    options={urlType}
                     />
                     {/* <FormikControl
                        control='input'
                        type='text'
                        label='Url movie'
                        placeholder='Url movie'
                        name='url'
                    /> */}
                    <div className='group'>
                        <label htmlFor="image_movie" className="label">Url movie</label>
                        <input className='input' ref={urlRef}  type="text" name="url"  placeholder='Url movie' />
                        {checkBackdrop === false && <span className='error'>Required</span>}
                    </div>
                    <span className='button green' onClick={handleCheckUrl}>Check</span>
                    {checkTypeUrl === "iframe" && urlRef.current.value }
                    <FormikControl
                        control='checkbox'
                        label='Checkbox genres'
                        name='genres'
                        options={genderMovie}
                    />
                    
                    <div className='group'>
                        <label htmlFor="image_movie" className="label">Image backdrop</label>
                        <input className='input' type="file" name="image_backdrop" onChange={handleChangeImageBackdrop} />
                        {checkBackdrop === false && <span className='error'>Required</span>}
                    </div>
                    <div className='group'>
                        <label htmlFor="image_movie" className="label">Image poster</label>
                        <input className='input' type="file" name="image_Poster" onChange={handleChangeImagePoster} />
                        {checkPoster === false && <span className='error'>Required</span>}
                    </div>
                    
                    <FormikControl
                        control='date'
                        type='date'
                        label='Release date'
                        placeholder='Release date'
                        name='release_date'
                    />
                    <FormikControl
                        control='input'
                        type='number'
                        label='Run time'
                        placeholder='Run time'
                        name='runtime'
                    />
                    <FormikControl
                        control='input'
                        type='text'
                        label='Country'
                        placeholder='Country'
                        name='country'
                    />
                    <FormikControl
                        control='input'
                        type='text'
                        label='Director'
                        placeholder='Director'
                        name='director'
                    />
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
                    <button className="button red" type='reset'>
                    <i className="fa-solid fa-xmark"></i>Cancel
                    </button>
                </div>
                </Form>
                )
            }}
        </Formik>
    </div>
  )
}

export default UploadMovie