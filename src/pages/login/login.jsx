import React, {Component} from 'react';
import './login.less';
import logo from "./images/logo.png";
import {Form, Input, Button, message} from 'antd';
import {reqLogin} from "../../api/index"
import {UserOutlined, LockOutlined} from '@ant-design/icons';

export default class Login extends Component {
    onFinish = async (values) => {
        const {data} = await reqLogin(values);
        if (data.status === 0) {
            //登录成功
            message.success("登录成功")
            //跳转
            this.props.history.replace("/")
        } else {
            message.error(data.msg)
        }
    }

    render() {
        return (
            <div className='login'>
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            initialValue="admin"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
};