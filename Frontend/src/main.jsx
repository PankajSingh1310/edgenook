import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserState } from './context/user.context'
import { AdminState } from './context/admin.context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminState>
   <UserState>
   <BrowserRouter>
    <App />
    </BrowserRouter>
   </UserState>
   </AdminState>
  </StrictMode>,
)
