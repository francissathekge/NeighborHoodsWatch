import { Form, Input, Button, Modal, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './donation.module.css';

const DonationForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const showCancelModal = () => {
    setIsCancelModalVisible(true);
  };

  const handleCancelModalOk = () => {
    setIsCancelModalVisible(false);
    form.resetFields();
    router.push('/'); // Replace with the desired URL for the landing page
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalVisible(false);
  };

  const onFinish = (values) => {
    // Handle form submission and navigate to payment page
    console.log(values); // You can access form values here

    // Replace '/payment' with the actual URL of your payment page
    router.push('/payment');
  };

  return (
    <div className={styles.formContainers}>
    <div className={styles.formContainer}>
    <Form form={form} name="donationForm" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please enter a phone number' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Comment" name="comment">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Please enter an amount' }]}
      >
        <Input type="number" step="0.01" min="0" />
      </Form.Item>
      <Form.Item>
      <Space size="middle" direction="horizontal" align="end">
        <Button type="primary" htmlType="submit">
          Donate
        </Button>
        <Button type="default" onClick={showCancelModal}>
          Cancel
        </Button>
        </Space>
      </Form.Item>
      <Modal
        title="Cancel Donation"
        visible={isCancelModalVisible}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <p>Are you sure you want to cancel the donation? Your entered data will be cleared.</p>
      </Modal>
    </Form>
    </div>
    </div>
  );
};

export default DonationForm;
