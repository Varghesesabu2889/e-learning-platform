import React from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Courses from './pages/courses/Courses'
import About from './pages/about/About'
import Account from './pages/account/Account'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Verify from './pages/auth/Verify'

const App = () => {



  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>     
        <Route path="/courses" element={<Courses/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/verify" element={<Verify/>}></Route>

      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App