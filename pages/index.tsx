import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, Space, Upload } from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Dragger } = Upload;
const { Option } = Select;

function IncidentButton() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('incidentDate', values.incidentDate);
    formData.append('incidentType', values.incidentType);
    formData.append('rewardAmount', values.rewardAmount);
    formData.append('comment', values.comment);
    console.log('Received values of form: ', values);
    // router.push('/homes');
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

  return (
    <div>
      <Button type="primary" onClick={showConfirmationModal}>
      <UploadOutlined />
      </Button>
      <Modal
        title="Incident Form"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="file"
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Dragger
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={file ? [file] : []}
            >
              <p className="ant-upload-drag-icon">
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
            name="rewardAmount"
            rules={[{ required: true, message: 'Please enter a reward amount' }]}
          >
            <Input type="number" placeholder="Enter reward amount" />
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
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default IncidentButton;
