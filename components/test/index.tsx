import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List } from 'antd';
import { useForums } from '../../providers/ForumProvider';
import styles from './forum.module.css';
import moment from 'moment';

const CommentSection = () => {
  const { getForum, getForums, createForum } = useForums();
  const [form] = Form.useForm();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getForum();
  }, []);


  

  const handleSubmit = (values) => {
    createForum(values);
    console.log('Form values:', values);
  };

  return (
    <div className={styles.formContainers}>
      <h1>Comment Section</h1>
      <div>
        <List
          header={`${getForums?.items?.length || 0} comments`}
          dataSource={getForums?.items}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                title={comment.personId}
                description={comment.content}
              />
              <div>{moment(comment.creationTime).fromNow()}</div>
              <Button type="link">Delete</Button>
            </List.Item>
          )}
        />
      </div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="content" label="Content">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentSection;