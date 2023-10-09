import './App.css'
import CameraCapture from './components/CameraCapture'
// import InicioPage from './pages/InicioPage'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage';
import Navigation from './components/Navigation';
import InfoPage from './pages/InfoPage';
import { UserProvider } from './UserContext'; 

 export const URL = "https://4755h63w-3000.brs.devtunnels.ms";
//correo: "wildshyni@gmail.com"
//password: 123

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route
            path='/collection'
            element={
              <>
                <Navigation />
                <CollectionPage />
              </>
            }
          />
          <Route
            path='/info'
            element={
              <>
                <Navigation />
                <InfoPage />
              </>
            }
          />
          <Route
            path='/camera'
            element={
              <>
                <Navigation />
                <CameraCapture />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
