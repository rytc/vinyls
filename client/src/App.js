import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import Home from './pages/home'
import Admin from './pages/admin'
import Login from './pages/login'
import Record from "./pages/record"
import EditRecord from './pages/editrecord';

function App() {

  return (
    <>
    <header className="App-header">
        <h1>vinyls.rytc.io</h1>
        <a href="https://rytc.io">Go to rytc.io</a>
    </header>
      
    <main className="App-main">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/record" element={<Record />} />
            <Route exact path="/admin" element={
                localStorage.getItem("jwt") ? 
                  <Admin/> 
                  : <Navigate to="/login" replace={true} /> } 
            /> 
          <Route exact path="/editrecord" element={
                localStorage.getItem("jwt") ? 
                  <EditRecord /> 
                  : <Navigate to="/login" replace={true} /> } 
            />
        </Routes>
      </Router>
    </main>
    </>
  );
}



export default App;
