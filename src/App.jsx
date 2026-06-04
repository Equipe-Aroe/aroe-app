import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import Sobre from './pages/Sobre/Sobre'

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
        <Route path="/pages/sobre" element={<Sobre />} />
      </Routes>
      {!hideDefaultLayout && <Footer />}
    </>
  )
}

export default App