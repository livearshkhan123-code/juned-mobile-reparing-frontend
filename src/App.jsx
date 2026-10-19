import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './components/Services'
import Footer from './components/Footer'
import Repair from './pages/Repair'
import BuyNew from './pages/BuyNew'
import BuyUsed from './pages/BuyUsed'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function MainWebsite() {
  return (
    <>
      <Navbar />
      <Home />
      <Services />
      <Repair />
      <BuyNew />
      <BuyUsed />
      <Footer />

      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑ Back to Top
      </button>
    </>
  )
}
function ProtectedAdmin() {
  const isLoggedIn = sessionStorage.getItem('adminAuth');

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Admin />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<MainWebsite />} />
        <Route path = "/admin-login" element = {<AdminLogin/>}/>
        <Route path="/admin" element={<ProtectedAdmin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App