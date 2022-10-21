import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Comment } from 'antd';
import "./MessageComment.css"
import apiConfig from '../../../API/configApi';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ExampleComment = ({ children, comment, handelDeleteData }) => {
  const dataUser = useSelector((state) => state.loginSlice.dataUser);
  const handleShowBoxRep = (userId) => {
  }

  const handleDelete = async (data) => {
    console.log(data);
    if(data.user_id === dataUser._id) {
        const result = await axios.delete(apiConfig.urlConnect + "comment/delete/" + data._id);
       console.log(result);
       handelDeleteData(data)
    }
  }
  return (
    <>
    <Comment
      // actions={[<span key="comment-nested-reply-to" style={{fontWeight: "300", color: "#000"}} onClick={()=> handleShowBoxRep(comment._id)}>Reply to</span>]}
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      author={<a href='#' className='color-name' style={{fontWeight: "700"}}>{comment.user_name}</a>}
      avatar={<Avatar src={apiConfig.urlConnectSocketIO + comment.avatar} alt={comment.user_name} />}
      content={
        <p style={{fontWeight: "400", color: "#000", position: "relative"}}>
          {comment.message}
          {dataUser && (dataUser._id === comment.user_id) && <span className="comment-delete" onClick={()=>handleDelete(comment)}>Delete</span>}
        </p>
      }
    >
      {/* {children} */}
      {comment.reps && comment.reps.length > 0 && comment.reps.map((item)=>{return (<ExampleComment comment={item}/>)})}
    </Comment>
    </>
  );
}

  // const data = [
  //   {
  //       name: "Duy",
  //       comment: "We supply a series of design principles, practical patterns and high quality desig",
  //       rep: [{
  //           name: "Duy",
  //           comment: "We supply a series",
  //           rep: [{
  //               name: "Duy",
  //               comment: "We supply a series",
  //           },
  //           {
  //               name: "Duy",
  //               comment: "We supply a series of design principles",
  //           }]
  //       },
  //       {
  //           name: "Duy",
  //           comment: "We supply a series of design principles",
  //       }]
  //   }
  // ]

export default function MessageComment({comments}) {
  const [listComment, setListCommment] = useState()

  useEffect(() => {
    setListCommment(comments)
  }, [comments])

    // const reps = (data) => {
    //     data.map((item)=>{return (<ExampleComment comment={item}/>)})
    // }

    const handelDeleteData = item => {
      const newData = listComment.filter(itemComment=>itemComment._id !== item._id)
      setListCommment(newData)
    }
  return (
    <div style={{backgroundColor: "#fff", color: "#000", padding: "0 20px"}}>
        {listComment && listComment.length > 0 && listComment.map((item, id)=><div key={id} className="comment-container">
          <ExampleComment comment={item}  handelDeleteData={handelDeleteData} />
          
        </div>)}
        {/* <ExampleComment>
            <ExampleComment>
                <ExampleComment />
                <ExampleComment />
            </ExampleComment>
            <ExampleComment>
                <ExampleComment />
                <ExampleComment />
            </ExampleComment>
            <ExampleComment />
            <ExampleComment />
        </ExampleComment> */}
    </div>
  )
}

