import './App.css'
import CameraCapture from './components/CameraCapture'
// import InicioPage from './pages/InicioPage'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage';
import Navigation from './components/Navigation';
import InfoPage from './pages/InfoPage';

// export const URL = "http://localhost:3000";
// export const URL = "https://4755h63w-3000.brs.devtunnels.ms";
export const URL = "https://0qh1s63v-3000.brs.devtunnels.ms";

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
          <Route path='/camera' element={<CameraCapture/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
