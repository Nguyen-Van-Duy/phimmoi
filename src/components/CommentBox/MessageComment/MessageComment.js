import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Comment } from 'antd';
import "./MessageComment.css"

const ExampleComment = ({ children, comment }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      author={<a href='#' className='color-name'>{comment.name}</a>}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        <p>
          {comment.comment}
        </p>
      }
    >
      {/* {children} */}
      {comment.rep && comment.rep.length > 0 && comment.rep.map((item)=>{return (<ExampleComment comment={item}/>)})}
    </Comment>
  );

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

export default function MessageComment() {

    const reps = (data) => {
        data.map((item)=>{return (<ExampleComment comment={item}/>)})
    }
  return (
    <div style={{backgroundColor: "#fff", color: "#000", padding: "0 20px"}}>
        {data.map((item, id)=><ExampleComment comment={item} key={id} />)}
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

