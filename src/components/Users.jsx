import {useState} from 'react'
import newsApi from './api'


  export default function Users({signedInUser, setSignedInUser}) {

  const [usersList, setUsersList]= useState([])

  newsApi.get('/users')
      .then(({data}) => {
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
  <>  <h2>All Users</h2>
  <div className="flex-box-user">
      <ul>
        {usersList.map(user => {
          return (
            <li key={user.username}>
               <h3>{user.username}</h3>
               <img src={user.avatar_url} alt={`An image of ${user.username}'s avatar`}/>
               {user.username !== signedInUser.username ? <button onClick={switchUser} >Select User</button> :<p>Signed In</p>}
            </li>)
        })}
      </ul>
    </div>
</>
)
}

