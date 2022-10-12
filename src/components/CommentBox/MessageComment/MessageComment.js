import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Comment } from 'antd';
import "./MessageComment.css"
import apiConfig from '../../../API/configApi';

const ExampleComment = ({ children, comment }) => {
  const handleShowBoxRep = (userId) => {

  }
  return (
    <>
    <Comment
      actions={[<span key="comment-nested-reply-to" style={{fontWeight: "300", color: "#000"}} onClick={()=> handleShowBoxRep(comment._id)}>Reply to</span>]}
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      author={<a href='#' className='color-name' style={{fontWeight: "700"}}>{comment.user_name}</a>}
      avatar={<Avatar src={apiConfig.urlConnectSocketIO + comment.avatar} alt={comment.user_name} />}
      content={
        <p style={{fontWeight: "400", color: "#000"}}>
          {comment.message}
        </p>
      }
    >
      {/* {children} */}
      {comment.reps && comment.reps.length > 0 && comment.reps.map((item)=>{return (<ExampleComment comment={item}/>)})}
    </Comment>
    </>
  );
}

  const data = [
    {
        name: "Duy",
        comment: "We supply a series of design principles, practical patterns and high quality desig",
        rep: [{
            name: "Duy",
            comment: "We supply a series",
            rep: [{
                name: "Duy",
                comment: "We supply a series",
            },
            {
                name: "Duy",
                comment: "We supply a series of design principles",
            }]
        },
        {
            name: "Duy",
            comment: "We supply a series of design principles",
        }]
    }
  ]

export default function MessageComment({comments}) {
  console.log(comments);

    const reps = (data) => {
        data.map((item)=>{return (<ExampleComment comment={item}/>)})
    }
  return (
    <div style={{backgroundColor: "#fff", color: "#000", padding: "0 20px"}}>
        {comments.map((item, id)=><ExampleComment comment={item} key={id} />)}
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

