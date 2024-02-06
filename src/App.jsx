import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Articles from './components/Articles'
import Users from './components/Users'
import { useState } from 'react'

function App() {

  const [signedInUser, setSignedInUser] = useState({
    'username': 'tickle122',
    'avatar_url': 'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953'
 })

  return (
    <>
    <header>
      <Header/>
      <NavBar signedInUser={signedInUser}/>
    </header>
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/users" element={<Users setSignedInUser={setSignedInUser} signedInUser={signedInUser} />} />
    </Routes>
    </main>
    </>
  )
}

export default App
