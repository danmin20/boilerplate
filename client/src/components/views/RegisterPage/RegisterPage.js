import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { Form, Input, Button, Typography } from "antd";
import Icon from "@ant-design/icons";

const { Title } = Typography;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmHandler = (e) => {
    setConfirm(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    // prevent refresh
    e.preventDefault();
    if (Password !== Confirm) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  return (
    <div className="app">
      <Title level={2} style={{ fontWeight: "100" }}>
        Sign In
      </Title>
      <form style={{ width: "350px" }} onSubmit={onSubmitHandler}>
        <Form.Item required>
          <Input
            id="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your email"
            type="email"
            value={Email}
            onChange={onEmailHandler}
          />
        </Form.Item>
        <Form.Item required>
          <Input
            id="name"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your name"
            type="name"
            value={Name}
            onChange={onNameHandler}
          />
        </Form.Item>
        <Form.Item required>
          <Input
            id="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your password"
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Form.Item>
        <Form.Item required>
          <Input
            id="confirm"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your password"
            type="confirm"
            value={Confirm}
            onChange={onConfirmHandler}
          />
        </Form.Item>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ minWidth: "100%" }}
            onSubmit={onSubmitHandler}
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
