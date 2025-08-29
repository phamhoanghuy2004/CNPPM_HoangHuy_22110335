import './App.css'
import Header from './components/layout/header'
import './styles/global.css'
import { Outlet, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import UserPage from './pages/user'
import axios from './util/axios.customize'
import { useContext, useEffect } from 'react'
import { AuthContext } from './components/context/auth.context.jsx'
import { Spin } from 'antd'

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext)

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true)
      try {
        const res = await axios.get('/v1/api/user')
        if (res) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res?.[0]?.email ?? '',
              name: res?.[0]?.name ?? '',
            },
          })
        }
      } finally {
        setAppLoading(false)
      }
    }
    fetchAccount()
  }, [])

  return (
    <div>
      {appLoading === true ? (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <div style={{ padding: 16 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
          <Outlet />
        </>
      )}
    </div>
  )
}

export default App
