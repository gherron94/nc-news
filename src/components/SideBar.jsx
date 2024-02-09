import { NavLink } from "react-router-dom"
import newsApi from "./api"
import {useState}from 'react'

export default function SideBar() {

  const [topicsList, setTopicsList] = useState([])

  newsApi.get(`/topics`).then(({data}) => {
    setTopicsList(data.topics)
  })


  return (
    <nav>
      <h2 className="topics">Topics</h2>
      <div className='topic-divider'></div>
      <ul> 
        {topicsList.map(topic => {
        return (
          <li key={topic.slug}> 
            <NavLink to={`articles/topics/${topic.slug}`}>{topic.slug}</NavLink>
          </li>)
        })}
    </ul>
  </nav>
  )
}