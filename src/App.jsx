import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'

function App() {
  const location = useLocation()

  const hideDefaultLayoutOn = ['/login', '/register']
  const hideDefaultLayout = hideDefaultLayoutOn.includes(location.pathname)

  return (
    <>
      {!hideDefaultLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideDefaultLayout && <Footer />}
    </>
  )
}

export default App