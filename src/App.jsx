import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Articles from './components/Articles'
import Users from './components/Users'
import SingleArticle from './components/SingleArticle'
import { useState } from 'react'
import UserContext from './components/UserContext'

function App() {

  const [isTopics, setIsTopics] = useState(false)

  const [signedInUser, setSignedInUser] = useState({
    username: 'tickle122',
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953'
 })

  return (
    <>
  <UserContext.Provider value={{signedInUser, setSignedInUser}}>
  <div className={isTopics ? "container-add-topics" : "container"}>
    <div className="header">
      <header>
      <Header/>
      <NavBar isTopics={isTopics} setIsTopics={setIsTopics}/>
      </header>
    </div>
    <div className="body">
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
        <footer className='footer'>
          <p>© 2024 NC news</p>
        </footer>
      </div>
  </div>
</div>
</UserContext.Provider>
    </>
  )
}

export default App

