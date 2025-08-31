import React from 'react'
import StudentRegister from './Pages/Register/StudentRegister'
import UpdateStudentDetails from './Pages/Update/UpdateStudent'
import { Toaster } from 'react-hot-toast'
import {Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Home/Homepage'
function App() {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/StudentRegister' element={<StudentRegister/>}/>
        <Route path='/UpdateStudentDetails/:id' element={<UpdateStudentDetails/>}/>
      </Routes>
      {/* <StudentRegister/> */}
      {/* <UpdateStudentDetails/> */}
    </div>
  )
}

export default App