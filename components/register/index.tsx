import React from "react";
import { Form, Input, Button } from "antd";
import { useUser } from "../../providers/LoginProvider";
import styles from "./register.module.css";
import { IAddress } from "../../providers/LoginProvider/context";

const Register = (props) => {
  const [form] = Form.useForm();
  const { createUser } = useUser();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const address:IAddress={
    street:values?.street,
    town: values?.town,
    city: values?.city,
    province: values?.province,
    postalCode:values?.postalCode 
    }
    createUser({...values,address});
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <h1>Register</h1>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input placeholder="Name" className="inputag" />
        </Form.Item>

        <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: "Please input your Surname!",
            },
          ]}
        >
          <Input placeholder="Surname" className="inputag" />
        </Form.Item>

        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Username" className="inputag" />
        </Form.Item>

        <Form.Item
          name="emailAddress"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="E-mail@example.com" className="inputag" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input placeholder="+27812345678" className="inputag" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" className="inputag" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The two passwords that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" className="inputag" />
        </Form.Item>

        <h1>Address</h1>
        <div className={styles.address}>
          <Form.Item
            name="street"
            rules={[
              {
                required: true,
                message: "Please input your street address!",
              },
            ]}
          >
            <Input placeholder="Street" className="inputag" />
          </Form.Item>

          <Form.Item
            name="town"
            rules={[
              {
                required: true,
                message: "Please input your town address!",
              },
            ]}
          >
            <Input placeholder="Town" className="inputag" />
          </Form.Item>

          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city address!",
              },
            ]}
          >
            <Input placeholder="City" className="inputag" />
          </Form.Item>

          <Form.Item
            name="province"
            rules={[
              {
                required: true,
                message: "Please input your province address!",
              },
            ]}
          >
            <Input placeholder="Province" className="inputag" />
          </Form.Item>

          <Form.Item
            name="postalCode"
            rules={[
              {
                required: true,
                message: "Please input your postal code address!",
              },
            ]}
          >
            <Input placeholder="Postal Code" className="inputag" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <a href="#" onClick={() => props.onFormSwitch("login")}>
        Have an account? Login here.
      </a>
    </>
  );
};

export default Register;
