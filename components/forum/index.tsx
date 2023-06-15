import React, { useState, useEffect } from 'react';
import { Button, List, Form, Input } from 'antd';
import styles from './forum.module.css';
import moment from 'moment';
import axios from 'axios';

const { TextArea } = Input;

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  const loadComments = async () => {
    const response = await axios.get('https://localhost:44311/api/services/app/Forum/GetAll');
    setComments(response.data.result.items); // Assuming the comments are nested within the 'result' property
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleCommentSubmit = async () => {
    try {
      const response =await axios.post('https://localhost:44311/api/services/app/Forum/Create',
      {content:commentContent},
      {headers: {'Content-Type': 'application/json'}}
      );
      const newCommentContenet = response.data.result;
      setCommentContent('');
      console.log("new comment", commentContent);
    }
    catch(error){
      console.log(error)
    }
  };
  
  

  const handleCommentDelete = async (commentId) => {
    await axios.delete(`https://localhost:44311/api/services/app/Forum/Delete/${commentId}`);

    loadComments();
  };

  return (
    <div className={styles.formContainers}>
    <div className={styles.formContainer}>
      <List
        header={`${comments.length} comments`}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              title={comment.personId}
              description={comment.content}
            />
            <div>{moment(comment.creationTime).fromNow()}</div>
            <Button
              type="link"
              onClick={() => handleCommentDelete(comment.id)}
            >
              Delete
            </Button>
          </List.Item>
        )}
      />
      <Form>
        <Form.Item>
          <TextArea
            rows={4}
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={handleCommentSubmit} type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default CommentSection;
