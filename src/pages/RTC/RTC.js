import React, { useEffect, useRef, useState } from 'react'
import { Peer } from "peerjs";

function RTC() {
    const [id, setId] = useState()
    const peer = useRef()
    const openStream = () => {
        const config = {audio: false, video: true}
        return navigator.mediaDevices.getUserMedia(config)
        // return navigator.mediaDevices.getDisplayMedia({
        //     audio: true,
        //     video: { mediaSource: "screen" }
        // })
    }

    const playStream = (idVideoTag, stream) => {
        const video = document.getElementById(idVideoTag)
        // video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play()
    }

    useEffect(()=> {
        peer.current = new Peer()
        peer.current.on('open', ids => setId(ids))
        peer.current.on("call", call => {
            openStream()
            .then(stream => {
                call.answer(stream)
                playStream("localStream", stream)
                call.on("stream", remoteStream => playStream("remoteStream", remoteStream))
            })
        })
    }, [])

    useEffect(()=> {
        peer.current.on('open', ids => setId(ids))
        peer.current.on("call", call => {
            openStream()
            .then(stream => {
                call.answer(stream)
                playStream("localStream", stream)
                call.on("stream", remoteStream => playStream("remoteStream", remoteStream))
            })
        })
    })

    const handleCall = (e) => {
        e.preventDefault()
        openStream()
        .then(stream => {
            playStream("localStream", stream);
        const call = peer.current.call(e.target[0].value, stream)
        call.on("stream", remoteStream => playStream("remoteStream", remoteStream))
        })
        .catch(err=> {
            console.log(err);
        })
    }


  return (
    <div>
        <h2 style={{color: '#fff', marginTop: '100px'}}>RTC: {id}</h2>
        <video id="localStream" width="900" controls></video>
        <br /><br />
        <video id="remoteStream" width="300" controls></video>
        <br /><br />
        <form onSubmit={handleCall}>
        <input id="remoteId" type="text" placeholder="Remote ID" />
        <button id="btnCall" type="submit">Call</button>
        </form>
    </div>
  )
}

export default RTC