import { useState } from "react";
import { Form, Input, Button, InputNumber, Alert } from "antd";
import { addUser } from "../util/userRegistration.js";

export default function SignUpForm({ handleLoginClick }) {
  const [user, setUser] = useState({});

  async function handleFormSubmit() {
    if (user["password-error"] != "") return;
    try {
      await addUser(user);
      setUser({ ...user, ["success"]: "Registration is successful" });
    } catch (ex) {
      console.log("Resgistration Failed");
    }
  }

  function handleOnChangeInput(label, value) {
    setUser((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  }

  function validatePassword(value) {
    console.log("Validate Password");
    console.log(value);
    if (user["password"] !== value) {
      setUser((prev) => {
        return {
          ...prev,
          ["password-error"]:
            "Password re-entered does not match with original",
        };
      });
    } else {
      setUser((prev) => {
        return {
          ...prev,
          ["password-error"]: "",
        };
      });
    }
    console.log(user);
  }

  console.log(user);
  function validateUserId(userId) {}

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
        label="First Name:"
        name={"firstname"}
        onChange={(event) =>
          handleOnChangeInput("firstname", event.target.value)
        }
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name:"
        name={"lastname"}
        onChange={(event) =>
          handleOnChangeInput("lastname", event.target.value)
        }
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
        name={["user", "age"]}
        label="Age"
        rules={[
          {
            type: "number",
            min: 18,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Enter User Id"
        name={"userId"}
        onChange={(event) =>
          handleOnChangeInput("username", event.target.value)
        }
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
        onBlur={validateUserId}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        onChange={(event) =>
          handleOnChangeInput("password", event.target.value)
        }
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Re-enter Password"
        name="confirmPassword"
        onBlur={(e) => validatePassword(e.target.value)}
        validateStatus={
          (user["password-error"] === "") | !user["password-error"]
            ? "success"
            : "error"
        }
        help={user["password-error"]}
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
        Submit
      </Button>
      <a
        onClick={handleLoginClick}
        style={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Have you registered?
      </a>
      {user["success"] && <Alert message={user["success"]} type="success" />}
    </Form>
  );
}
