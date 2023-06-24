import { Button, DatePicker, Form, Input, Modal, Select, Space, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './incident.module.css';
import { useIncidents } from '../../providers/IncidentProvider';
import { useRouter } from 'next/router';

const { Dragger } = Upload;
const { Option } = Select;

function IncidentForm() {
  const router = useRouter();
  const { createIncident } = useIncidents();
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('incidentDate', values.incidentDate);
    formData.append('incidentType', values.incidentType);
    formData.append('comment', values.comment);
    createIncident(formData);
    console.log('Received values of form: ', values);
    router.push('/homes');
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
    router.push('/homes');
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
          <Form.Item name="incidentDate">
            <Input type="datetime-local" placeholder="End Time" />
          </Form.Item>

          <Form.Item
            name="incidentType"
            rules={[{ required: true, message: 'Please select the incident type' }]}
          >
            <Select
              placeholder="Incident Type"
              onChange={(value) => form.setFieldsValue({ incidentType: value })}
            >
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
            <Input.TextArea placeholder="Comment" />
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
