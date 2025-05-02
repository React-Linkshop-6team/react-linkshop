import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProfileDetail from './pages/ProfileDetail'
import Create from './pages/Create'
import Header from './components/Header'
import EditMyshop from './components/common/Edit/EditMyshop'
import CreateMyshop from './components/common/Create/CreateMyshop'
import './assets/scss/Styles.scss'
import Signup from './pages/Signup'
import Login from './pages/Login'
import MyStore from './pages/MyStore'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mystore" element={<MyStore />} />
          <Route path="/myshop" element={<CreateMyshop />} />
          <Route path="/editmyshop" element={<EditMyshop />} />
          <Route path="/edit/:linkShopId" element={<Edit />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
