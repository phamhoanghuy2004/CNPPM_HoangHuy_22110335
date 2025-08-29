import React from 'react'
import { Button, Col, Divider, Form, Input, Row, notification } from 'antd'
import { createUserApi } from '../util/api'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

const RegisterPage = () => {
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const { name, email, password } = values
    try {
      const res = await createUserApi(name, email, password)
      if (res) {
        notification.success({ message: 'CREATE USER', description: 'Success' })
        navigate('/login')
      } else {
        notification.error({ message: 'CREATE USER', description: 'Error' })
      }
    } catch (e) {
      notification.error({ message: 'CREATE USER', description: 'Error' })
    }
  }
  const onFinishFailed = () => {
    notification.error({ message: 'Vui lòng nhập đủ thông tin' })
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row justify="center" style={{ width: '100%' }}>
        <Col xs={22} sm={18} md={12} lg={8}>
          <fieldset style={{ padding: '15px', margin: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <legend>Đăng ký tài khoản</legend>
          <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}> 
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}> 
              <Input.Password />
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}> 
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
          <Divider />
          <div>
            <Link to="/"><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterPage


