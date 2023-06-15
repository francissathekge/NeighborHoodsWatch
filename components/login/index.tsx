import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Register from '../../components/register';
import { useUser } from '../../providers/LoginProvider';
import { ILogin } from '../../providers/LoginProvider/context';
import styles from './login.module.css';


const Login = () => {
  const [registerMode, setRegisterMode] = useState<boolean>(false);
  const [name, setName] = useState("");
  const { loginUser } = useUser();

  const handleSubmit = (values:ILogin) => {
   
    console.log('Received values of form: ', values);
    
    if(loginUser){
      loginUser (values);
      localStorage.setItem('name', values.userNameOrEmailAddress)
    }
 
  };

  return (
    <div className={styles.pageheader}>
      <div className={styles.logo}>
      {/* <img
                        className="movie-image"
                        src="pictures/1.png"
                        alt="logo"
                      /> */}
      </div>
      {!registerMode && (
        <div className={styles.loginbox} >
          <h2 className={styles.bendtext}>Login</h2>
          <Form onFinish={handleSubmit} className={styles.loginform}>
            <Form.Item
              name="userNameOrEmailAddress"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className={styles.loginformforgot} href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.loginformbutton}>
                Log in
              </Button>
              <br /><br />
              <div className={styles.reg}>
              <a href="#" onClick={() => setRegisterMode(true)}>
                Register now!
              </a></div>
            </Form.Item>
          </Form>
        </div>
      )}
      {registerMode && (
        <div className={styles.registerbox}>
          <h2 className="bend-text">Register</h2>
          <Register onFormSwitch={() => setRegisterMode(false)} />
        </div>
      )}
    </div>
  );
};

export default Login;
