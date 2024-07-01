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
import Paymentsuccess from './pages/paymentsuccess/Paymentsuccess'
import Dashboard from './pages/dashboard/Dashboard'
import StudyCourse from './pages/StudyCourse/StudyCourse'
import Lecture from './pages/lecture/Lecture'
import AdminDashboard from './admin/dashboard/AdminDashboard'
import AdminCourses from './admin/Courses/AdminCourses'
import AdminUsers from './admin/users/AdminUsers'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

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
        <Route path="/forgot" element={isAuth?<Home/>:<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={isAuth?<Home/>:<ResetPassword/>}/>

        <Route path="/course/:id" element={isAuth ?
           <CourseDescription user={user}/>:<Login/>}/>
        <Route 
        path="/payment-success/:id"
        element={isAuth ? <Paymentsuccess  user={user}/>:<Login/>} />
        <Route
        path="/:id/dashboard"
        element={isAuth ? <Dashboard user={user}/>:<Login/>} />
 <Route
        path="/course/study/:id"
        element={isAuth ? <StudyCourse user={user}/>:<Login/>} />
        <Route
        path="/lectures/:id"
        element={isAuth ? <Lecture user={user}/>:<Login/>} />
        <Route 
        path='/admin/dashboard'
        element={isAuth ? <AdminDashboard user={user}/>:<Login/>} />
        <Route 
        path='/admin/course'
        element={isAuth ? <AdminCourses user={user}/>:<Login/>} />
         <Route 
        path='/admin/users'
        element={isAuth ? <AdminUsers user={user}/>:<Login/>} />

      </Routes>
      <Footer/>
      </BrowserRouter> )}
    </>
  )
}

export default App