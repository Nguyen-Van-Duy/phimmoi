import React from 'react'
import BoxModal from '../../BoxModal/BoxModal'
import './UpdateMovie.css';
import UploadMovie from '../UploadMovie/UploadMovie'

function UpdateMovie({setShowModal}) {
  return (
    <div className='update-movie__container'>
        <BoxModal title="Update Movie" closeModal={setShowModal}>
            <div className="trailer-main">
                <UploadMovie />
            </div>
    </BoxModal>
    </div>
  )
}

export default UpdateMovie