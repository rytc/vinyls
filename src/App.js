import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './home'
import Admin from './admin'


function App() {

  return (
    <>
    <header className="App-header">
        <h1>vinyl.rytc.io</h1>
    </header>
      
    <main className="App-main">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/admin" element={<Admin/>} />
        </Routes>
      </Router>
    </main>
    </>
  );
}



export default App;
