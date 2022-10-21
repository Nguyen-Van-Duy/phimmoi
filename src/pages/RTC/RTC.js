// import React, { useEffect, useRef, useState } from 'react'
// import { Peer } from "peerjs";
// // import apiConfig from '../../API/configApi';
// import './RTC.css'
// import socketIO from "../../API/Socket"
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

// function RTC() {
//     const [idPeer, setIdPeer] = useState()
//     const [userOnline, setUserOnline] = useState([]);
//     const [streams, setStream] = useState();
//     const peer = useRef()
//     const socket = useRef();
//     const [isReceive, setIsReceive] = useState(false);
//     const dataUser = useSelector((state) => state.loginSlice.dataUser);
//     const [isStart, setIsStart] = useState(false)
//     const params = useParams()
//     // const online = useSelector(state=>state.loginSlice.online)
//     // console.log("online", online);

//     // useEffect(()=> {
//     //     setUserOnline(online)
//     // }, [online])

//     useEffect(()=> {
//         if (dataUser && dataUser?._id && idPeer) {
//             socket.current.emit("addGroupRTC", {
//                 idPeer, 
//                 roomId: params.roomId,
//                 userId: dataUser._id,
//                 userName: dataUser.user_name,
//                 avatar: dataUser.avatar
//             })
//             console.log(dataUser);
//         }
//     }, [idPeer, dataUser, params.roomId])

//     // console.log(["1", "2"].every(d=>d === "1"));
    
//     useEffect(() => {
//         socket.current = socketIO
//         peer.current = new Peer()
//         if (isReceive === false) {
//             socket.current.on("getGroupRTC", (data) => {
//                 const group = data.filter(item=>item.roomId === params.roomId)
//                 console.log("userOnline: ", userOnline);
//                 console.log("user Group: ", group);
//                 isStart && openStream()
//                 .then(stream => {
//                     playStream("localStream", streams);
//                     group.forEach(user => {
//                         if(idPeer !== user.idPeer) {
//                             peer.current.call(user.idPeer, streams)
//                         }
//                     });
//                 })

                
//                     console.log(group);
//                     setUserOnline(group);
//                 });
//                 }
//         return () => {
//           // console.log('disconnect!');
//           setIsReceive(true);
//         };
//     }, [isReceive, params.roomId, userOnline, isStart, idPeer]);

//     useEffect(()=> {
//         !isStart && peer.current.on("call", call => {
//             call.answer()
//             call.on("stream", remoteStream => playStream("localStream", remoteStream))
            
//         })
//     }, [idPeer])

//     const openStream = () => {
//         const config = {audio: false, video: true}
//         return navigator.mediaDevices.getUserMedia(config)
//         // return navigator.mediaDevices.getDisplayMedia({
//         //     audio: true,
//         //     video: { mediaSource: "screen" }
//         // })
//     }

//     const playStream = (idVideoTag, stream) => {
//         const video = document.getElementById(idVideoTag)
//         // video.src = window.URL.createObjectURL(stream);
//         video.srcObject = stream;
//         video.play()
//     }

//     useEffect(()=> {
//         peer.current.on('open', ids => {
//             setIdPeer(ids)
//         })
//         peer.current.on("call", call => {
//             call.answer()
//             call.on("stream", remoteStream => playStream("localStream", remoteStream))
//             // openStream1()
//             // .then(stream => {
//             //     call.answer(stream)
//             //     // playStream("localStream", stream
//             //     call.on("stream", remoteStream => playStream("localStream", remoteStream))
//             // })
//         })
//     }, [])

//     // useEffect(()=> {
//     //     if(userOnline && userOnline.length > 1) {
//     //         socket.current.emit("addGroupRTC", idPeer)
//     //         openStream()
//     //         .then(stream => {
//     //             playStream("localStream", stream);
//     //             userOnline.forEach(user => {
//     //                 if(idPeer !== user.idPeer) {
//     //                     peer.current.call(user.idPeer, stream)
//     //                 }
//     //             });
//     //         })
//     //     }
//     // }, [userOnline, idPeer])

//     const handleShareVideo = () => {
//         setIsStart(true)
//         openStream()
//         .then(stream => {
//             setStream(stream)
//             playStream("localStream", stream);
//             userOnline.forEach(user => {
//                 if(idPeer !== user.idPeer) {
//                     peer.current.call(user.idPeer, stream)
//                 }
//             });
//         })
//     }

//     const handleShare = () => {
//         setIsStart(true)
//         navigator.mediaDevices.getDisplayMedia({
//             audio: true,
//             video: { mediaSource: "screen" }
//         })
//         .then(stream => {
//             setStream(stream)
//             playStream("localStream", stream);
//             userOnline.forEach(user => {
//                 if(idPeer !== user.idPeer) {
//                     peer.current.call(user.idPeer, stream)
//                 }
//             });
//         })
//     }

//     // const handleCall = (e) => {
//     //     e.preventDefault()
//     //     socket.current.emit("addGroupRTC", idPeer)
//     //     openStream()
//     //     .then(stream => {
//     //         playStream("localStream", stream);
//     //     const call = peer.current.call(e.target[0].value, stream)
//     //     const call2 = peer.current.call(e.target[1].value, stream)
//     //     // call.on("stream", remoteStream => playStream("remoteStream", remoteStream))
//     //     })
//     // }

//     console.log( "userOnline", userOnline);

//   return (
//     <div className='RTC__container'>
//         <div className='RTC__share'>
//             <h2 style={{color: '#fff'}}>RTC: {idPeer}</h2>
//             <video id="localStream" width="100%" controls></video>
//             {/* <video id="remoteStream" width="900" controls></video> */}
//             {/* <form onSubmit={handleCall}>
//                 <input id="remoteId" type="text" placeholder="Remote ID" />
//                 <input id="remoteId2" type="text" placeholder="Remote ID" />
//                 <button id="btnCall" type="submit">Call</button>
//             </form> */}
//             <span className='button green' onClick={handleShareVideo}>Start</span>
//             <span className='button green' onClick={handleShare}>Share</span>
//         </div>
//         <div className='RTC__message'></div>
//     </div>
//   )
// }

// export default RTC

import React, { useEffect, useRef, useState } from 'react'
import { Peer } from "peerjs";
// import apiConfig from '../../API/configApi';
import './RTC.css'
import socketIO from "../../API/Socket"
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiConfig, { success } from '../../API/configApi';

function RTC() {
    const [idPeer, setIdPeer] = useState()
    const [userOnline, setUserOnline] = useState([]);
    const [streams, setStream] = useState();
    const peer = useRef()
    const socket = useRef();
    const [isReceive, setIsReceive] = useState(false);
    const [isStart, setIsStart] = useState(false)
    const [dataMovie, setDataMovie] = useState()
    const [id, setId] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    // const online = useSelector(state=>state.loginSlice.online)
    // console.log("online", online);
console.log(params);
    // useEffect(()=> {
    //     setUserOnline(online)
    // }, [online])

    useEffect(()=>{
        const fetchDataSearch = async () => {
            const data = await axios.get(apiConfig.urlConnect + "upload/schedule-detail/" + params.roomId)
            console.log(data);
            if(data.status === 200) {
                setDataMovie(data.data[0])
                setId(data.data[0]?.user_id)
            }
            // setTotalResults(data.total_results)
            // setTotalPage(data.total_pages)
            // setDataSchedule(data.data)
        }
        if(params.type === "schedule") {
            fetchDataSearch()
        }
    }, [])

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
                    playStream("localStream", streams);
                    group.forEach(user => {
                        if(idPeer !== user.idPeer) {
                            peer.current.call(user.idPeer, streams)
                        }
                    });
                })
                setUserOnline(group);
                });
                }
        return () => {
          // console.log('disconnect!');
          setIsReceive(true);
        };
    }, [isReceive, params.roomId, userOnline, isStart, idPeer]);

    useEffect(()=> {
        !isStart && peer.current.on("call", call => {
            call.answer()
            call.on("stream", remoteStream => playStream("localStream", remoteStream))
            
        })
    }, [idPeer])

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

    // const handleDate = (time) => {
    //     const date = new Date(time)
    //     const day = time.slice(0, 10)
    //     const h = date.getHours()
    //     const m = date.getMinutes()
    //     const s = date.getSeconds()
    //     return day + ' ' + h + ":" + m + ":" + s
    // }

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
            setStream(stream)
            playStream("localStream", stream);
            userOnline.forEach(user => {
                if(idPeer !== user.idPeer) {
                    peer.current.call(user.idPeer, stream)
                }
            });
        })
    }

    const handleShare = () => {
        setIsStart(true)
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: { mediaSource: "screen" }
        })
        .then(stream => {
            setStream(stream)
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

    const handleCloseShare = () => {
        navigate("/scshedule")
    }

    const handleDeleteSchedule = async () => {
        try {
            const result = await axios.delete(apiConfig.urlConnect + "upload/delete-schedule/" + dataMovie._id)
            success("Delete successful!")
        } catch (err) {

        }
    }

  return (
    <div style={{position: 'relative'}}>
        <div className='RTC__container' style={{ backgroundImage: dataUser && dataMovie &&( `url(${apiConfig.urlConnectSocketIO + dataMovie.image})` || "") }}>
        <div className='RTC__share'>
            {/* <h2 style={{color: '#fff'}}>RTC: {idPeer}</h2> */}
            <video id="localStream" width="100%" controls></video>
            {/* <video id="remoteStream" width="900" controls></video> */}
            {/* <form onSubmit={handleCall}>
                <input id="remoteId" type="text" placeholder="Remote ID" />
                <input id="remoteId2" type="text" placeholder="Remote ID" />
                <button id="btnCall" type="submit">Call</button>
            </form> */}
            <div className="RTC__button">
                {/* <span className='button green' onClick={handleShareVideo}>Camera</span> */}
            {(((dataUser && (id === dataUser?._id))) || (params.type === 'friend')) && <span className='button green' onClick={handleShare}>Share</span>}
            {(((dataUser && (id === dataUser?._id))) || (params.type === 'friend')) && <span className='button green' onClick={handleDeleteSchedule}>End</span>}
            <span className='button red' onClick={handleCloseShare}>Close</span>
            </div>
            {dataMovie && (params.type === 'schedule') && <div>
                <h2>{dataMovie.name}</h2>
                <div style={{color: "#fff"}}>{dataMovie.time}</div>
                <span style={{color: "#fff"}}>{dataMovie.overview}</span>
            </div>}
        </div>
        {/* <div className='RTC__message'></div> */}
    </div>
    </div>
  )
}

export default RTC