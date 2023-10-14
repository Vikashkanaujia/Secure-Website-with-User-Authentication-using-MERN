import {BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './component/Navbar';
import Account from './pages/Account';
import Home from './pages/Home';

function App() {

    const isUserSignedIn = !!localStorage.getItem('token')
  return (
   <>
   <BrowserRouter>
   <Navbar/>
      <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/' element={<Home/>}/>
           
            {isUserSignedIn && <Route path='/account' element={<Account/>}/>}
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
