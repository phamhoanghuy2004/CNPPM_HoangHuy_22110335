import { Button, Col, Divider, Form, Input, Row, notification } from 'antd'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../util/api'
import { AuthContext } from '../components/context/auth.context.jsx'
import { ArrowLeftOutlined } from '@ant-design/icons'

const LoginPage = () => {
  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

  const onFinish = async (values) => {
    try {
      const res = await loginApi(values.email, values.password)
      if (res?.EC === 0) {
        localStorage.setItem('access_token', res?.DT)
        setAuth({ isAuthenticated: true, user: { email: values.email, name: '' } })
        navigate('/user')
      } else {
        notification.error({ message: res?.EM || 'Login failed' })
      }
    } catch (e) {
      notification.error({ message: e?.EM || 'Login failed' })
    }
  }
  const onFinishFailed = (errorInfo) => {
    notification.error({ message: 'Vui lòng nhập đủ thông tin' })
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row justify="center" style={{ width: '100%' }}>
        <Col xs={22} sm={18} md={12} lg={8}>
          <fieldset style={{ padding: '15px', margin: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <legend>Đăng nhập</legend>
          <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}> 
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}> 
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>
          <Link to="/"><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
          </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage


