import './App.css';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Login from './components/Login';
import Admindashboard from './components/Admindashboard';
import Facultydashboard from './components/Facultydashboard';
import Hoddashboard from './components/Hoddashboard';
import Studentdashboard from './components/Studentdashboard';
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Login />}></Route>
    <Route path="/admindashboard" element={<Admindashboard />}></Route>
    <Route path="/facultydashboard" element={<Facultydashboard />}></Route>
    <Route path="/hoddashboard" element={<Hoddashboard />}></Route>
    <Route path="/studentdashboard" element={<Studentdashboard />}></Route>
    </Routes>
    </Router>
  );
}

export default App;
