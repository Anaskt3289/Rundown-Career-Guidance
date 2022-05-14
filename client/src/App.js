import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AssessmentInstructionsPage from './Pages/AssessmentInstructionsPage'
import AssessmentTypePage from './Pages/AssessmentTypePage'
import AssessmentPage from './Pages/AssessmentPage';
import OtpLoginPage from './Pages/OtpLoginPage';
import OtpVerificationPage from './Pages/OtpVerificationPage';
import FindMentorPage from './Pages/FindMentorPage';
import MessagesPage from './Pages/MessagesPage';
import { useState } from 'react';

function App() {
  const [loginned , setLoginned] = useState(true)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/otplogin' element={<OtpLoginPage />} />
          <Route path='/otpverification' element={<OtpVerificationPage />} />
          <Route path='/assessmentInstruction' element={<AssessmentInstructionsPage />} />
          <Route path='/assessmentType' element={<AssessmentTypePage />} />
          <Route path='/assessment' element={<AssessmentPage />} />
          <Route path='/findMentor' element={<FindMentorPage />} />
          <Route path='/messages' element={<MessagesPage />} />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
