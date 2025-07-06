import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TeacherDashboard from './components/TeacherDashBoard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/teacher/dashboard' element={<TeacherDashboard/>} />
    </Routes>
  )
}

export default App;