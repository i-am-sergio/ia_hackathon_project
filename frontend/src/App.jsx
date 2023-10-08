import './App.css'
import CameraCapture from './components/CameraCapture'
import InicioPage from './pages/InicioPage'

// process.env.REACT_APP_SERVER_URL || 
// export const URL = "http://localhost:3000";
export const URL = "https://0qh1s63v-3000.brs.devtunnels.ms";

// import { Login, Register } from './pages';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage';
import Navigation from './components/Navigation';
import InfoPage from './pages/InfoPage';

function App() {
return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/collection' element={<CollectionPage/>} />
          <Route path='/info' element={<InfoPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
