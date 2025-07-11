import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import TeacherCourseDetail from './components/CoursePage';
import Course from './components/Course';

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false);
  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(!token) {
      setIsLoggedIn(false)
    }
    else {
      setIsLoggedIn(true)
    }
  } , [])

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/teacher/dashboard' element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Signin setIsLoggedIn={setIsLoggedIn} />} />
      <Route path='/course' element={<Course/>} />
    </Routes>
  )
}

export default App;