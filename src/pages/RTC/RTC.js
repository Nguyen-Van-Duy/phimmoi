import React, { useEffect } from 'react'
import { Peer } from "peerjs";

function RTC() {
    const openStream = () => {
        const config = {audio: false, video: true}
        return navigator.mediaDevices.getUserMedia(config)
    }

    const playStream = (idVideoTag, stream) => {
        const video = document.getElementById(idVideoTag)
        video.src = window.URL.createObjectURL(stream);
        video.play()
    }

    useEffect(()=> {
    
        openStream()
        .then(stream => playStream("localStream", stream))
        .catch(err=> {
            console.log(err);
        })
    }, [])

  return (
    <div>
        <h2>RTC</h2>
        <video id="localStream" width="300" controls></video>
        <br /><br />
        <video id="remoteStream" width="300" controls></video>
        <br /><br />
    </div>
  )
}

export default RTC