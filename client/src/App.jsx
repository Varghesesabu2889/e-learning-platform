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
import { UserData } from './context/UserContext'
import Loading from './components/loading/Loading'
import CourseDescription from './pages/courseDescription/CourseDescription'

const App = () => {

  const {isAuth,user,loading} = UserData()

  return (
    <>
      {loading ? (
      <Loading/>):
      (<BrowserRouter>
      <Header isAuth={isAuth}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>     
        <Route path="/courses" element={<Courses/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route
         path="/account"
         element={isAuth?<Account user={user}/>:<Login/>} />
        <Route path="/register" element={isAuth? <Home/> : <Register/>}/>
        <Route path="/login" element={isAuth? <Home/>:<Login/>}/>
        <Route path="/verify" element={isAuth?<Home/>:<Verify/>}/>
        <Route path="/course/:id" element={isAuth ? <CourseDescription user={user}/>:<Login/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter> )}
    </>
  )
}

export default App