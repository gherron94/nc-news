import { useContext, useState} from "react"
import { NavLink} from "react-router-dom"
import UserContext from "./UserContext"
import newsApi from "./api"

export default function NavBar({isTopics, setIsTopics}) {

  const {signedInUser} = useContext(UserContext)
  const [topicsList, setTopicsList] = useState([])

  newsApi.get(`/topics`).then(({data}) => {
    setTopicsList(data.topics)
  })
 
  function showTopics() {
    setIsTopics(true)
    if (isTopics) {
      setIsTopics(false)
    }
  } 

  function chooseTopic() {
    setIsTopics(false)
  } 

  return (
    <nav>
      <ul>
        <li onClick={chooseTopic}>
          <NavLink to='/'>Home</NavLink>
        </li>
        <div className='divider'></div>
        <li onClick={chooseTopic}>
          <NavLink to='/articles'>Articles</NavLink>
        </li>
        <div className='divider'></div>

        <li onClick={showTopics}> 
          Topics
        </li>
        <li onClick={chooseTopic}  id='currentUser'>
        <NavLink to='/users'>
        <div  id="loggedIn">
        <p>{signedInUser.username}</p>
        <img src={signedInUser.avatar_url} alt='placeholder'/>
        </div>
        </NavLink>  
        </li>

      </ul>  
      {isTopics ? <div id="topics-bar">
      <ul> 
        {topicsList.map(topic => {
        return (
          <li onClick={chooseTopic} key={topic.slug}> 
            <NavLink to={`articles/topics/${topic.slug}`}>{topic.slug}</NavLink>
          </li>)
        })}
    </ul>
      </div>  : null}
    </nav>
  )
}