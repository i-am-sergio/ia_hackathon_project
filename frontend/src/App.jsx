import './App.css';
// import { Login, Register } from './pages';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage';
import Navigation from './components/Navigation';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/collection' element={<CollectionPage/>} />
        </Routes>
      </BrowserRouter>
      {/* <RegisterPage /> */}
    </>
  )
}

export default App
