import React, { useEffect, useRef, useState } from 'react'
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import apiConfig from '../../API/configApi';

function RTC() {
    const [id, setId] = useState()
    const peer = useRef()
    const socket = useRef();
    const [isReceive, setIsReceive] = useState(false);


    useEffect(() => {
          socket.current = io(apiConfig.urlConnectSocketIO);
        if (isReceive === false) {
          socket.current.on("getRTC", (data) => {
           
          });

        }
        return () => {
            //disconnect 
          // console.log('disconnect!');
          setIsReceive(true);
        };
    }, [isReceive]);

    const openStream = () => {
        // const config = {audio: false, video: true}
        // return navigator.mediaDevices.getUserMedia(config)
        return navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: { mediaSource: "screen" }
        })
    }

    const playStream = (idVideoTag, stream) => {
        const video = document.getElementById(idVideoTag)
        // video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play()
    }

    peer.current = new Peer()
    useEffect(()=> {
        peer.current.on('open', ids => {
            setId(ids)
            console.log(ids);
        })
        peer.current.on("call", call => {
            call.answer()
            call.on("stream", remoteStream => playStream("localStream", remoteStream))
            // openStream1()
            // .then(stream => {
            //     call.answer(stream)
            //     // playStream("localStream", stream
            //     call.on("stream", remoteStream => playStream("localStream", remoteStream))
            // })
        })
    }, [])

    const handleCall = (e) => {
        e.preventDefault()
        socket.current.emit("sendRTC", id)
        openStream()
        .then(stream => {
            playStream("localStream", stream);
        const call = peer.current.call(e.target[0].value, stream)
        const call2 = peer.current.call(e.target[1].value, stream)
        // call.on("stream", remoteStream => playStream("remoteStream", remoteStream))
        })
    }


  return (
    <div>
        <h2 style={{color: '#fff', marginTop: '100px'}}>RTC: {id}</h2>
        <video id="localStream" width="900" controls></video>
        <br /><br />
        {/* <video id="remoteStream" width="900" controls></video> */}
        <br /><br />
        <form onSubmit={handleCall}>
        <input id="remoteId" type="text" placeholder="Remote ID" />
        <input id="remoteId2" type="text" placeholder="Remote ID" />
        <button id="btnCall" type="submit">Call</button>
        </form>
    </div>
  )
}

export default RTC