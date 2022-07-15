import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import FormikControl from '../../Form/FormikControl'
import * as Yup from 'yup'
import axios from "axios"
import apiConfig from '../../../API/configApi'
import '../Profile/EditProfile/EditProfile.css'
import { useSelector } from 'react-redux'
// import { setUserId } from '../../../store/LoginSlice'
import { genderMovie } from '../../../API/MoviesApi'

function UploadMovie() {

    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [backdrop, setBackdrop] = useState();
    const [poster, setPoster] = useState();
    const [checkBackdrop, setCheckBackdrop] = useState(null);
    const [checkPoster, setCheckPoster] = useState(null);
    const [valueUrl, setValueUrl] = useState()
    // const urlRef = useRef()

    // const [checkboxGender, setCheckboxGender] = useState([])
    const [typeUrl, setTypeUrl] = useState(null)
    // const dispatch = useDispatch()

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
        // url: "",  
        genres: [], 
        number_of_episodes: "",
        number_of_seasons: "",
        seasons: [],
      }

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
        // url: Yup.string().required('Required'),
        overview: Yup.string().required('Required'),
        genres: Yup.array().required('Required'),

    })

    const onSubmitLogin = async (values, {resetForm}) => {
        if(valueUrl === "") {
            return
        }
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
        if(valueUrl === "") {
            return
        }
        
        const dataRequest = {...values, user_id: dataUser._id, url: valueUrl, user_name: dataUser.user_name, avatar: dataUser.avatar}
        console.log(dataRequest);
        const formData = new FormData();
        formData.append('image_backdrop', backdrop);
        formData.append('image_poster', poster);
        formData.append('data', JSON.stringify(dataRequest));

        const result = await axios.post(apiConfig.urlConnect + 'upload/upload-movie', formData)
        if(result.status === 200) {
            const listItem = document.getElementById('url-video'); 
            const newItem = document.createElement('div');
            const att = document.createAttribute("id");
            att.value = "url-video";
            newItem.setAttributeNode(att);
            newItem.innerHTML = ""
            listItem.parentNode.replaceChild(newItem, listItem);
            setBackdrop(null)
            setPoster(null)
            setValueUrl("")
            resetForm()
        }
        // dispatch(setUserId(result.data))
    }

    const handleCheckUrl = (e) => {
        setValueUrl(e.target.value)
        const listItem = document.getElementById('url-video'); 
        const newItem = document.createElement('div');
        const att = document.createAttribute("id");
            att.value = "url-video";
            newItem.setAttributeNode(att);
        if(typeUrl === "video" && e.target.value !== "" && e.target.value.includes("http")) {
            newItem.innerHTML = `<iframe
            src=${e.target.value}
            frameBorder="0" 
            style="max-width: 560px !important;width: 100%;
            height:315px !important;"
            allowFullScreen="allowfullscreen" 
            title="YouTube video player" ></iframe>`
        } else
        if(typeUrl === "iframe" && e.target.value !== "" && e.target.value.includes("<iframe") && e.target.value.includes("</iframe>")) {
            newItem.innerHTML = e.target.value;
        }  else if(e.target.value !== "") {
            newItem.innerHTML = "<span class='error'>Required</span>";
        }
        listItem.parentNode.replaceChild(newItem, listItem);
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
                // console.log(formik)
                // console.log(formik.values.url_type);
                if(formik.values.url_type && formik.values.url_type !== typeUrl) {
                    setValueUrl("")
                    setTypeUrl(formik.values.url_type)
                    // setValueUrl()
                }
                
                return (
                <Form  className="update-profile__form">
                    <FormikControl
                        control='input'
                        type='text'
                        label='Movie name *'
                        placeholder="Movie name"
                        name='name'
                    />
                    <FormikControl
                        control='textarea'
                        type='textarea'
                        label='Overview *'
                        placeholder='Overview'
                        name='overview'
                    />
                    <FormikControl
                    control='radio'
                    label='Media type *'
                    name='media_type'
                    // onChange={handleChangeMediaType}
                    options={mediaType}
                     />
                     <FormikControl
                    control='radio'
                    label='Url type *'
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
                    {typeUrl && <div className='group'>
                        <label htmlFor="image_movie" className="label">Url movie *</label>
                        <textarea className='input' type="text" name="url" value={valueUrl}  placeholder='Url movie' onChange={handleCheckUrl} />
                        {typeUrl && valueUrl === "" && <span className='error'>Required</span>}
                    </div>}
                    <div id="url-video"></div> 
                    <FormikControl
                        control='checkbox'
                        label='Checkbox genres *'
                        name='genres'
                        options={genderMovie}
                    />
                    
                    <div className='group'>
                        <label htmlFor="image_movie" className="label">Image backdrop *</label>
                        <input className='input' type="file" name="image_backdrop" onChange={handleChangeImageBackdrop} />
                    </div>
                        {checkBackdrop === false && <span className='error'>Required</span>}
                    <div className='group'>
                        <label htmlFor="image_movie" className="label">Image poster *</label>
                        <input className='input' type="file" name="image_poster" onChange={handleChangeImagePoster} />
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