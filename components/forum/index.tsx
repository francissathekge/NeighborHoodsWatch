import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useForums } from '../../providers/ForumProvider';
import styles from './forum.module.css';
import moment from 'moment';
import { useRouter } from 'next/router';

const { confirm } = Modal;

const CommentSection = () => {
  const router = useRouter();
  const { getForum, getForums, createForum, deleteForum } = useForums();
  const [form] = Form.useForm();
  const [comments, setComments] = useState([]);
  console.log('Form values:', getForums);
  useEffect(() => {
    getForum();
  }, []);

  const handleSubmit = (values) => {
    createForum(values);
    form.resetFields();
    console.log('Form values:', values);
  };

  const handleDelete = (commentId) => {
    confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this comment?',
      onOk() {
        deleteForum(commentId)
      },
      onCancel() {},
    });
  };

  const item = getForums?.items;

  const handleCancel = () => {
    confirm({
      title: 'Cancel Confirmation',
      content: 'Are you sure you want to cancel? Your entered data will be cleared.',
      onOk() {
        form.resetFields();
        router.push('/homes');
      },
      onCancel() {},
    });
  };

  return (
    <div className={styles.formContainer}>
    <div className={styles.formContainers}>
      <h1>Comment Section</h1>
      <div>
        <List
          header={`${item?.length || 0} Comments`}
          dataSource={item}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta title={'Anonymous tip off'} description={comment.content} />
              <div>{moment(comment.createdTime).fromNow()}</div>
              <Button type="link" onClick={() => handleDelete(comment.id)}><DeleteOutlined /></Button>
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
          <Button type="default" onClick={handleCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default CommentSection;
