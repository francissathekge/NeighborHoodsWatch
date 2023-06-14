import { Button, DatePicker, Form, Input, Modal, Select, Space, Upload } from 'antd';
import { InboxOutlined  } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './incident.module.css';

const { Dragger } = Upload;
const { Option } = Select;

function IncidentForm() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null);
  const [incidentType, setIncidentType] = useState("");
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Here you can submit the form data to the server
  };

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const uploadedFile = info.fileList[0].originFileObj;
      setFile(uploadedFile);
    } else {
      setFile(null);
    }
  };

  const showConfirmationModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirmCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields
  };

  return (
    <div className={styles.formContainers}>
    <div className={styles.formContainer}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="file"
          rules={[{ required: true, message: 'Please upload an image' }]}
        >
          <Dragger
            beforeUpload={() => false} // Prevent default upload behavior
            onChange={handleFileChange}
            fileList={file ? [file] : []}
          >
            <p className="ant-upload-drag-icon">
              {/* Add an upload icon */}
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker
            placeholder="Date"
            onChange={(date) => setDate(date)}
            value={date}
          />
        </Form.Item>

        <Form.Item
          name="incidentType"
          rules={[{ required: true, message: 'Please select the incident type' }]}
        >
          <Select placeholder="Incident Type" onChange={(value) => setIncidentType(value)} value={incidentType}>
          <Option value="Accident">Accident</Option>
            <Option value="Fire">Fire</Option>
            <Option value="Murder">Murder</Option>
            <Option value="Missing">Missing</Option>
            <Option value="PropertyDamage">Property damage</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Please enter a comment' }]}
        >
          <Input.TextArea placeholder="Comment" onChange={(e) => setComment(e.target.value)} value={comment} />
        </Form.Item>

        <Form.Item>
        <Space size="middle" direction="horizontal" align="end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={showConfirmationModal}>
            Cancel
          </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleConfirmCancel}
      >
        <p>Are you sure you want to cancel? Your changes will be discarded.</p>
      </Modal>
    </div>
    </div>
  );
}

export default IncidentForm;
