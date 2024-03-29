import {useState} from 'react'
import newsApi from './api'

import { useContext } from 'react';
import UserContext from "./UserContext"


  export default function Users() {


  const {signedInUser, setSignedInUser} = useContext(UserContext)
  const [usersList, setUsersList]= useState([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  newsApi.get('/users')
      .then(({data}) => {
        setIsLoadingUsers(false)
        setUsersList(data.users)
      })
  
  function switchUser(event) {
    const username = event.target.parentNode.childNodes[0].innerText;
    const avatar_url = event.target.parentNode.childNodes[1].src;
    setSignedInUser((currSignedInUser) => {
        return {...currSignedInUser, username, avatar_url}
    })
  }

return (
  <>
  {isLoadingUsers ? <div className='loading' ><h3>Loading Users...</h3></div> : 
  <>
 <h2>Select User</h2>
 <div className="flex-box-user"> 
      <ul>
        {usersList.map(user => {
          return (
          <li className={user.username !== signedInUser.username ? 'signed-out-card':'signed-in-card'} key={user.username} >
               <h3>{user.username}</h3>
               <img src={user.avatar_url} alt={`An image of ${user.username}'s avatar`}/>
               {console.log()}
               {user.username !== signedInUser.username ?   <button onClick={switchUser} >Select User</button> :<p><strong>Signed In</strong></p>}
            </li>)
        })}
      </ul>
    </div>
    </>
  }
  </>
)
}

