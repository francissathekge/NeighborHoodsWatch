import React, { useState } from 'react';
import { Form, Select, Input, Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import styles from './patrol.module.css';
import { usePatrols } from '../../providers/PatrolProvider';
import Pay from '../../pages/pays';

const { Option } = Select;
const { confirm } = Modal;

const Patrol = () => {
  const router = useRouter();
  const { createPatrol } = usePatrols();
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable

  const onFinish = (values) => {
    createPatrol(values);
    console.log('Form submitted:', values);
    setIsSubmitted(true); // Update the state variable
  };

  const handlePatrolChange = (value) => {
    const selectedPatrol = parseInt(value);
    form.setFieldsValue({ patrol: selectedPatrol });
    form.setFieldsValue({ amount: selectedPatrol * form.getFieldValue('guards') });
  };

  const handleGuardsChange = (value) => {
    const selectedGuards = parseInt(value);
    form.setFieldsValue({ guards: selectedGuards });
    form.setFieldsValue({ amount: form.getFieldValue('patrol') * selectedGuards });
  };

  const handleCancel = () => {
    confirm({
      title: 'Cancel Confirmation',
      content: 'Are you sure you want to cancel?',
      onOk() {
        form.resetFields();
        router.push('/homes');
      },
      onCancel() {},
     
    });
  
  };

  return (
    <div className={styles.formBackground}>
      <div className={styles.formContainers}>
        <div className={styles.formContainer}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="period">
              <Select onChange={handlePatrolChange} placeholder="Period">
                <Option value={1}>Daily</Option>
                <Option value={7}>Weekly</Option>
                <Option value={30}>Monthly</Option>
              </Select>
            </Form.Item>
            <Form.Item name="noOfGuards">
              <Select onChange={handleGuardsChange} placeholder="Number of Guards">
                <Option value={100}>1 Guard</Option>
                <Option value={300}>3 Guards</Option>
                <Option value={500}>5 Guards</Option>
                <Option value={1000}>10 Guards</Option>
              </Select>
            </Form.Item>
            <Form.Item name="location">
              <Input placeholder="Location" />
            </Form.Item>
            <Form.Item name="amount">
              <Input disabled readOnly placeholder="Amount" />
            </Form.Item>
            <Form.Item name="startTime">
              <Input type="datetime-local" placeholder="Start Time" />
            </Form.Item>
            <Form.Item name="endTime">
              <Input type="datetime-local" placeholder="End Time" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isSubmitted}>
                Submit
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
          {isSubmitted && <Pay />} {/* Render Pay component only if isSubmitted is true */}
        </div>
      </div>
    </div>
  );
};

export default Patrol;
