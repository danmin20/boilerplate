import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import Icon from "@ant-design/icons";
import { loginUser } from "../../../_actions/user_action";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberChecked = localStorage.getItem("remember") ? true : false;
  const initialEmail = localStorage.getItem("remember")
    ? localStorage.getItem("remember")
    : "";

  const [Remember, setRemember] = useState(rememberChecked);
  const handleRemember = () => {
    setRemember(!Remember);
  };

  const [Email, setEmail] = useState(initialEmail);
  const [Password, setPassword] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    // prevent refresh
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      console.log(response.payload);
      if (response.payload.loginSuccess) {
        props.history.push("/");
      }
    });
  };

  return (
    <div className="app">
      <Title level={2} style={{ fontWeight: "100" }}>
        Log In
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
            id="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your password"
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox id="remember" onChange={handleRemember} checked={Remember}>
            Remember me
          </Checkbox>
          <a
            className="login-form-forgot"
            href="/reset_user"
            style={{ float: "right" }}
          >
            forgot password
          </a>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ minWidth: "100%" }}
              onSubmit={onSubmitHandler}
            >
              Log in
            </Button>
          </div>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
