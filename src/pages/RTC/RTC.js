import React, { useEffect, useRef, useState } from 'react'
import { Peer } from "peerjs";
// import apiConfig from '../../API/configApi';
import './RTC.css'
import socketIO from "../../API/Socket"
import { useSelector } from 'react-redux';

function RTC() {
    const [id, setId] = useState()
    const [userOnline, setUserOnline] = useState([]);
    const peer = useRef()
    const socket = useRef();
    const [isReceive, setIsReceive] = useState(false);
    const online = useSelector(state=>state.loginSlice.online)
    console.log(online);

    useEffect(()=> {
        setUserOnline(online)
    }, [online])
    
    useEffect(() => {
        socket.current = socketIO
        peer.current = new Peer()
        if (isReceive === false) {
            socket.current.on("getUsers", (users) => {
              setUserOnline(users);
              console.log( "22222222222222",users);
            });
        //   socket.current.on("getRTC", (data) => {
           
        //   });
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

    useEffect(()=> {
        peer.current.on('open', ids => {
            setId(ids)
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

    console.log( userOnline);
    console.log(id);

  return (
    <div className='RTC__container'>
        <div className='RTC__share'>
            {/* <h2 style={{color: '#fff'}}>RTC: {id}</h2> */}
            <video id="localStream" width="100%" controls></video>
            {/* <video id="remoteStream" width="900" controls></video> */}
            {/* <form onSubmit={handleCall}>
                <input id="remoteId" type="text" placeholder="Remote ID" />
                <input id="remoteId2" type="text" placeholder="Remote ID" />
                <button id="btnCall" type="submit">Call</button>
            </form> */}
        </div>
        <div className='RTC__message'></div>
    </div>
  )
}

export default RTC