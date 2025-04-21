import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProfileDetail from './pages/ProfileDetail'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Header from './components/Header'
import CreateMyshop from './components/common/Create/CreateMyshop'

import './assets/scss/Styles.scss'

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/myshop" element={<CreateMyshop />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
