import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Records from './components/Records.js'
import VinylWindow from './components/VinylWindow';

function Home() {
  return (
    <>
    <div className="Search">
        <input
          type="search"
          placeholder='Search records'
        />
    </div>
    <Records />
    <VinylWindow />
    </>
  )
}

function Admin() {
  return (
    <>
      <h1>Admin</h1>
    </>
  );
}

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
