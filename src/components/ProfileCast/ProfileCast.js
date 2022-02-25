import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import apiConfig from '../../API/configApi';
import { infoCast } from '../../API/MoviesApi';
import { handleShowProfileCast } from '../../store/profileCastSlice';
import BoxModal from '../BoxModal/BoxModal';
import './ProfileCast.css';

const ProfileCast = () => {

    const [dataInfoCast, setDataInfoCast] = useState(null)
    const dispatch = useDispatch()
    const castId = useSelector(state => state.profileCast.castId)

    let gender = ''

    if(dataInfoCast) {
        if(dataInfoCast.gender === 1) {
            gender = 'Female'
        } else if(dataInfoCast.gender === 2) {
            gender = "Male"
        } else {
            gender = "Other"
        }
    }
    
    const toggleShowProfile = () => {
        dispatch(handleShowProfileCast.handleShowProfile())
    }

    useEffect(() => {
        const fetchDataInfoCast = async () => {
            const data = await infoCast(castId)
            console.log(data)
            setDataInfoCast(data)
        }
        fetchDataInfoCast()
    }, [castId])

    return (<>
        <BoxModal title="Profile" closeModal={toggleShowProfile}>
            {dataInfoCast && <div className="profile-cast">
                <div className="cast-info__img">
                    <img src={apiConfig.w500Image(dataInfoCast.profile_path)} alt={dataInfoCast.name} title={dataInfoCast.name} />
                </div>
                <div className="profile-cast__info">
                    <p>Name: <span>{dataInfoCast.name}</span></p>
                    <p>Birthday: <span>{dataInfoCast.birthday}</span></p>
                    <p>Gender: <span>{gender}</span></p>
                    <p>Place of Birth: <span>{dataInfoCast.place_of_birth}</span></p>
                    <p>Also Known As:</p>
                    <p>{dataInfoCast.also_known_as.length > 0 && dataInfoCast.also_known_as.map((item, id) => <span key={id}>{item}, </span>)}</p>
                    <p>Biography:</p>
                    <p><span>{dataInfoCast.biography}</span></p>
                </div>
            </div>}
        </BoxModal>
        </>
    );
};

export default ProfileCast;