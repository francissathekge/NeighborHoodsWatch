import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { useUser } from '../../providers/LoginProvider';



const Register = (props: { onFormSwitch: (arg0: string) => void; }) => {
    const [isActive, setIsActive] = useState(false);
    const [userName, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [form] = Form.useForm();
    const { createUser } = useUser();
  
  
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      createUser(values);
    };
  
    return (
      <>
          <Form
          form={form}
          onFinish={onFinish}
          >
            <Form.Item
              name="name"

              rules={[
                {
                  message: 'The input is not valid Name!',
                },
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="surname"

              rules={[
                {
                  message: 'The input is not valid Surname!',
                },
                {
                  required: true,
                  message: 'Please input your Surname!',
                },
              ]}
            >
              <Input placeholder="Surname" onChange={(e) => setSurname(e.target.value)} value={surname} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="userName"

              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={userName} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="emailAddress"

              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder='E-mail@example.com' onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="phoneNumber"

              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                placeholder="+27812345678"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="inputag"
              />
            </Form.Item>
  
            <Form.Item
              name="password"

              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="confirm"

              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
  
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Password" className="inputag" />
            </Form.Item>
  
            <Form.Item>
            <Button type="primary" htmlType="submit">
              {isActive ? 'Submitted' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
        <a href="#"onClick={() => props.onFormSwitch('login')}>
           have an account? Login here.
        </a>
      </>
    );
  };

export default Register;