import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Articles from './components/Articles'
import Users from './components/Users'
import SingleArticle from './components/SingleArticle'
import SideBar from './components/SideBar'
import { useState } from 'react'
import UserContext from './components/UserContext'

function App() {

  const [signedInUser, setSignedInUser] = useState({
    username: 'tickle122',
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953'
 })

 const [isTopic, setISTopic] = useState(false)
 const [topic, setTopic] = useState('') 

  return (
    <>
  <UserContext.Provider value={{signedInUser, setSignedInUser}}>
  <div className="container">
    <div className="header">
    <header>
      <Header/>
      <NavBar setISTopic={setISTopic}/>
    </header>
  </div>
  <div className="body">
  <div className="sidebar">
    <SideBar setTopic={setTopic} setISTopic={setISTopic}/>
  </div>
  <div className="content">
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles/>} />
      <Route path="/articles/:article_id" element={<SingleArticle />} />
      <Route path={`/articles/topics/:topic_id`} element={<Articles/>} />
      <Route path="/users" element={<Users/>} />
    </Routes>
    </main>
  </div>
  </div>
  <div className="footer"></div>
</div>
</UserContext.Provider>
    </>
  )
}

export default App

