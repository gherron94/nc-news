import { useContext } from "react"
import { NavLink } from "react-router-dom"
import UserContext from "./UserContext"


 
export default function NavBar() {

  const {signedInUser} = useContext(UserContext)

  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <div className='divider'></div>
        <li>
          <NavLink to='/articles'>Articles</NavLink>
        </li>
        <div className='divider'></div>
        <li>
          <NavLink to='/users'>Users</NavLink>
        </li>
        <li id='currentUser'>
        <div  id="loggedIn">
        <p>{signedInUser.username}</p>
        <img src={signedInUser.avatar_url} alt='placeholder'/>
        </div>
        </li>
      </ul>
    </nav>
  )
}