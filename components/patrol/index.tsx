import React from 'react';
import { Form, Select, Input, Button, Modal } from 'antd';
import styles from './patrol.module.css';

const { Option } = Select;
const { confirm } = Modal;

const Patrol = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form submitted:', values);
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
      },
      onCancel() {},
    });
  };

  return (
    <div className={styles.formBackground} >
    <div className={styles.formContainers}>
    <div className={styles.formContainer}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="patrol" label="Patrol" initialValue={1}>
          <Select onChange={handlePatrolChange}>
            <Option value={1}>Daily</Option>
            <Option value={7}>Weekly</Option>
            <Option value={30}>Monthly</Option>
          </Select>
        </Form.Item>
        <Form.Item name="guards" label="Number of Guards" initialValue={300}>
          <Select onChange={handleGuardsChange}>
            <Option value={100}>1 Guard</Option>
            <Option value={300}>3 Guards</Option>
            <Option value={500}>5 Guards</Option>
            <Option value={1000}>10 Guards</Option>
          </Select>
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <Input disabled readOnly />
        </Form.Item>
        <Form.Item name="startTime" label="Start Time">
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item name="endTime" label="End Time">
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
    </div>
  );
};

export default Patrol;
