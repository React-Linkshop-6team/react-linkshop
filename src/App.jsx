<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProfileDetail from './pages/ProfileDetail'
import Create from './pages/Create'
import Edit from './pages/Edit'
=======
import './assets/scss/Style.scss'
>>>>>>> dev

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileDetail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
