import React, { useEffect, useRef, useState } from 'react'
import { Peer } from "peerjs";
// import apiConfig from '../../API/configApi';
import './RTC.css'
import socketIO from "../../API/Socket"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function RTC() {
    const [idPeer, setIdPeer] = useState()
    const [userOnline, setUserOnline] = useState([]);
    const peer = useRef()
    const socket = useRef();
    const [isReceive, setIsReceive] = useState(false);
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [isStart, setIsStart] = useState(false)
    const params = useParams()
    // const online = useSelector(state=>state.loginSlice.online)
    // console.log("online", online);

    // useEffect(()=> {
    //     setUserOnline(online)
    // }, [online])

    useEffect(()=> {
        if (dataUser && dataUser?._id && idPeer) {
            socket.current.emit("addGroupRTC", {
                idPeer, 
                roomId: params.roomId,
                userId: dataUser._id,
                userName: dataUser.user_name,
                avatar: dataUser.avatar
            })
            console.log(dataUser);
        }
    }, [idPeer, dataUser, params.roomId])

    // console.log(["1", "2"].every(d=>d === "1"));
    
    useEffect(() => {
        socket.current = socketIO
        peer.current = new Peer()
        if (isReceive === false) {
            socket.current.on("getGroupRTC", (data) => {
                const group = data.filter(item=>item.roomId === params.roomId)
                console.log("userOnline: ", userOnline);
                console.log("user Group: ", group);
                isStart && openStream()
                .then(stream => {
                    playStream("localStream", stream);
                    group.forEach(user => {
                        if(idPeer !== user.idPeer) {
                            peer.current.call(user.idPeer, stream)
                        }
                    });
                })

                !isStart && peer.current.on("call", call => {
                    call.answer()
                    call.on("stream", remoteStream => playStream("localStream", remoteStream))
                    
                })
                    console.log(group);
                    setUserOnline(group);
                });
                }
        return () => {
          // console.log('disconnect!');
          setIsReceive(true);
        };
    }, [isReceive, params.roomId, userOnline, isStart, idPeer]);

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
            setIdPeer(ids)
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

    // useEffect(()=> {
    //     if(userOnline && userOnline.length > 1) {
    //         socket.current.emit("addGroupRTC", idPeer)
    //         openStream()
    //         .then(stream => {
    //             playStream("localStream", stream);
    //             userOnline.forEach(user => {
    //                 if(idPeer !== user.idPeer) {
    //                     peer.current.call(user.idPeer, stream)
    //                 }
    //             });
    //         })
    //     }
    // }, [userOnline, idPeer])

    const handleShareVideo = () => {
        setIsStart(true)
        openStream()
        .then(stream => {
            playStream("localStream", stream);
            userOnline.forEach(user => {
                if(idPeer !== user.idPeer) {
                    peer.current.call(user.idPeer, stream)
                }
            });
        })
    }

    // const handleCall = (e) => {
    //     e.preventDefault()
    //     socket.current.emit("addGroupRTC", idPeer)
    //     openStream()
    //     .then(stream => {
    //         playStream("localStream", stream);
    //     const call = peer.current.call(e.target[0].value, stream)
    //     const call2 = peer.current.call(e.target[1].value, stream)
    //     // call.on("stream", remoteStream => playStream("remoteStream", remoteStream))
    //     })
    // }

    console.log( "userOnline", userOnline);

  return (
    <div className='RTC__container'>
        <div className='RTC__share'>
            <h2 style={{color: '#fff'}}>RTC: {idPeer}</h2>
            <video id="localStream" width="100%" controls></video>
            {/* <video id="remoteStream" width="900" controls></video> */}
            {/* <form onSubmit={handleCall}>
                <input id="remoteId" type="text" placeholder="Remote ID" />
                <input id="remoteId2" type="text" placeholder="Remote ID" />
                <button id="btnCall" type="submit">Call</button>
            </form> */}
            <span className='button green' onClick={handleShareVideo}>Start</span>
        </div>
        <div className='RTC__message'></div>
    </div>
  )
}

export default RTC