import { useState, useContext } from "react"
import newsApi from "./api"
import { useParams } from 'react-router-dom'
import UserContext from "./UserContext"

export default function PostComment({isCommentPosted, setISCommentPosted}) {

  const {signedInUser} = useContext(UserContext)
  const [commentBody, setCommentBody]= useState('')
  const { article_id } = useParams()
  // const [loadingComment, setLoadingComment] = useState(true)
  
  function handleOnChange(event) {
    setCommentBody(event.target.value)
    setISCommentPosted(false)
  }

  function addComment(event) {
    event.preventDefault()

    newsApi.post(`/articles/${article_id}/comments`, {
      "body": commentBody, 
      'username': signedInUser.username
    }).then((response) => {
      if (response.status === 201) {
        setISCommentPosted(true)
      }
    })
    setCommentBody('')
  }

  return (
    <div className="new-comment">
    <form onSubmit={addComment}>
      <label htmlFor="body">Add a new comment:</label>
      <textarea onChange={handleOnChange} value={commentBody} id="body" rows='5'></textarea>
      <button>Add comment</button>
    </form>
    { isCommentPosted ? <p >Comment has been added</p> : null }
    </div>
  )
}
