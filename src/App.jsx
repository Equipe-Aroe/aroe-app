import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { scrollToSection } from './utils/scrollToSection'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import Sobre from './pages/Sobre/Sobre'
import Farmacia from './pages/Farmacia/FarmaciaSection'
import Dashboard from './pages/Dashboard/Dashboard'
import DashboardHome from './pages/Dashboard/sections/DashboardHome'
import DashboardReceitas from './pages/Dashboard/sections/Receitas'
import DashboardPedidos from './pages/Dashboard/sections/Pedidos'
import DashboardTratamentos from './pages/Dashboard/sections/Tratamentos'
import DashboardLembretes from './pages/Dashboard/sections/Lembretes'
import DashboardNotificacoes from './pages/Dashboard/sections/Notificacoes'
import DashboardHistorico from './pages/Dashboard/sections/Historico'
import DashboardConfiguracoes from './pages/Dashboard/sections/Configuracoes'
import DashboardAjuda from './pages/Dashboard/sections/Ajuda'
import AriaIA from './pages/Dashboard/sections/AriaIA';
import DashboardPerfil from './pages/Dashboard/sections/Perfil';
// Pharmacy Dashboard Pages
import DashboardPharmacy from './pages/Dashboard/sections/Pharmacy/DashboardHomePhamacy'
import EstoquePharmacy from './pages/Dashboard/sections/Pharmacy/Estoque'
import VendasPharmacy from './pages/Dashboard/sections/Pharmacy/Vendas'
import ClientesPharmacy from './pages/Dashboard/sections/Pharmacy/Clientes'
import RelatoriosPharmacy from './pages/Dashboard/sections/Pharmacy/Relatorios'
import PreparacaoPharmacy from './pages/Dashboard/sections/Pharmacy/Preparar'
import PharmacyProfile from './pages/Dashboard/sections/Pharmacy/Perfil'
import PharmacyConfiguracoes from './pages/Dashboard/sections/Pharmacy/Configuracoes'
import PharmacyHelp from './pages/Dashboard/sections/Pharmacy/Ajuda'

function App() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    const timer = setTimeout(() => scrollToSection(id), 100)

    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  const hideDefaultLayoutOn = ['/login', '/register', '/dashboard']
  const hideDefaultLayout = hideDefaultLayoutOn.some(path => location.pathname.startsWith(path))

    return (
  <ThemeProvider>
    <>
      <SmoothScroll />

      {!hideDefaultLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pages/sobre" element={<Sobre />} />
        <Route path="/pages/farmacia" element={<Farmacia />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="receitas" element={<DashboardReceitas />} />
          <Route path="aria" element={<AriaIA />} />
          <Route path="pedidos" element={<DashboardPedidos />} />
          <Route path="tratamentos" element={<DashboardTratamentos />} />
          <Route path="lembretes" element={<DashboardLembretes />} />
          <Route path="notificacoes" element={<DashboardNotificacoes />} />
          <Route path="historico" element={<DashboardHistorico />} />
          <Route path="perfil" element={<DashboardPerfil />} />
          <Route path="configuracoes" element={<DashboardConfiguracoes />} />
          <Route path="ajuda" element={<DashboardAjuda />} />
          {/* Pharmacy Routes */}
          <Route path="pharmacy/dashboard" element={<DashboardPharmacy />} />
          <Route path="pharmacy/estoque" element={<EstoquePharmacy />} />
          <Route path="pharmacy/vendas" element={<VendasPharmacy />} />
          <Route path="pharmacy/clientes" element={<ClientesPharmacy />} />
          <Route path="pharmacy/relatorios" element={<RelatoriosPharmacy />} />
          <Route path="pharmacy/preparar" element={<PreparacaoPharmacy />} />
          <Route path="pharmacy/perfil" element={<PharmacyProfile />} />
          <Route path="pharmacy/configuracoes" element={<PharmacyConfiguracoes />} />
          <Route path="pharmacy/ajuda" element={<PharmacyHelp />} />
        </Route>
      </Routes>

      {!hideDefaultLayout && <Footer />}
    </>
  </ThemeProvider>
)
}

export default App