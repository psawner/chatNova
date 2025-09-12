
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './login'
import Dashboard from './dashboard/dashboard'
import Register from './register/register';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard/dashboard' element={<Dashboard/>}/>
          <Route path='/register/register' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
