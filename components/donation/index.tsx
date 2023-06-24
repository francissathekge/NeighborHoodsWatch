import { Form, Input, Button, Modal, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './donation.module.css';
import { useDonations } from '../../providers/DonationProvider';
import Pay from '../../pages/pay';

const DonationForm = () => {
  const { createDonation } = useDonations();
  const router = useRouter();
  const [form] = Form.useForm();
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isDonationSubmitted, setIsDonationSubmitted] = useState(false); // New state variable

  const showCancelModal = () => {
    setIsCancelModalVisible(true);
  };

  const handleCancelModalOk = () => {
    setIsCancelModalVisible(false);
    form.resetFields();
    router.push('/homes'); // Replace with the desired URL for the landing page
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalVisible(false);
  };

  const onFinish = (values) => {
    createDonation(values);
    console.log(values);
    setIsDonationSubmitted(true); // Update the state variable
    // router.push('/payment');
  };

  return (
    <div className={styles.formContainers}>
      <div className={styles.formContainer}>
        <Form form={form} name="donationForm" onFinish={onFinish}>
          <Form.Item name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="phoneNumber">
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name="comment">
            <Input.TextArea placeholder="Comment" />
          </Form.Item>
          <Form.Item name="amount" rules={[{ required: true, message: 'Please enter an amount' }]}>
            <Input type="number" step="0.01" min="0" placeholder="Amount" />
          </Form.Item>
          <Form.Item>
            <Space size="middle" direction="horizontal" align="end">
              <Button type="primary" htmlType="submit" disabled={isDonationSubmitted}>
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
        {isDonationSubmitted && <Pay />} {/* Render the <Pay/> component conditionally */}
      </div>
    </div>
  );
};

export default DonationForm;
