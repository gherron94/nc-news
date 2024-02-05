import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Articles from './components/Articles'

function App() {

  return (
    <>
    <header>
      <Header/>
      <NavBar/>
    </header>
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
    </main>
    </>
  )
}

export default App
