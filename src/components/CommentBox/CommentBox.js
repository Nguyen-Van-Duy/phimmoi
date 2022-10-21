import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import apiConfig from '../../API/configApi';
import MessageComment from './MessageComment/MessageComment';
import avatar from '../../image/avatar.jpeg'
const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={(props) => <Comment {...props} />}
//   />
// );

const Editor = ({ onChange, onSubmit, submitting, value }) => {
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      onSubmit()
    }
  }
  return(
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} onKeyPress={handleKeyPress} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);
}

export default function CommentBox({dataUser, idFilm}) {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  console.log(dataUser);

  const getComment = useCallback(async () => {
    const data = await axios.get(apiConfig.urlConnect + "comment/" + idFilm)
    console.log(data);
    setComments(data.data)
  }, [idFilm])
  
  useEffect(()=> {
    getComment()
  }, [getComment])

  const handleSubmit = async () => {
    if (!value || value.trim() === "") return;
    setSubmitting(true);
    try {
      const data = await axios.post(apiConfig.urlConnect + "comment/add-comment/", {
        movie_id: idFilm,
        user_id: dataUser._id,
        user_name: dataUser.user_name,
        avatar: dataUser.avatar,
        message: value, 
      });
      getComment()
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value.trim());
  };
  return (
    <>
      {/* {comments.length > 0 && <CommentList comments={comments} />} */}
      {dataUser && dataUser._id && <Comment
        avatar={<Avatar src={(apiConfig.urlConnectSocketIO + dataUser.avatar) || avatar} alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />}
      <MessageComment comments={comments} />
    </>
  )
}
