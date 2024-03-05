import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import EditProfile from './pages/EditProfile'
import Home from './pages/Home'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <>
      <BrowserRouter>
        <SnackbarProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path="/send" element={<SendMoney />} />
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
