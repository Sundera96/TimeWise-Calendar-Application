import { Form, Input, Button } from "antd";
import { userLogin } from "../util/userRegistration.js";
import React, { useContext } from "react";
import { EventsContext } from "../store/events-view-context.jsx";
export default function LoginForm({ handleSignUpClick }) {
  const eventsContext = useContext(EventsContext);
  async function handleFormSubmit(values) {
    try {
      const tokenObj = await userLogin(values);
      console.log("token string?");
      eventsContext.setToken(tokenObj["token"]);
    } catch (ex) {}
  }

  return (
    <Form
      onFinish={handleFormSubmit}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label="Enter User Id"
        name={"username"}
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Login
      </Button>

      <a
        onClick={handleSignUpClick}
        style={{ textDecoration: "underline", cursor: "pointer" }}
      >
        register now!
      </a>
    </Form>
  );
}
