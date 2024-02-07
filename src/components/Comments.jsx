import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import newsApi from './api';
import CommentsButton from './CommentsButton';

export default function Comments() {

  const { article_id } = useParams()
  const [commentsList, setCommentsList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)
  const [hasComments, setHasComments] = useState(true)
  const [totalComments, setTotalComments] = useState(0)
  
  const pageLimit = Math.ceil(totalComments / 10)

  useEffect(()=> {
    newsApi.get(`/articles/${article_id}/comments?p=${pageNumber}`)
    .then(({data}) => {
      setCommentsList(data.comments)
      setTotalComments(data.total_count)
      if (!data.total_count) {
        setTotalComments(0)
        setHasComments(false)
      }
    })
  }, [pageNumber]) 

  
  function nextPage() {
    if (pageNumber < pageLimit) {
    setPageNumber(pageNumber + 1)
    setIsFirstPage(false)
    }
    if (pageNumber === pageLimit - 1) {
      setIsLastPage(true)
    }
  }  
  
  function previousPage() {
    if (pageNumber > 1) {
    setPageNumber(pageNumber - 1);
    } 
    if (pageNumber === 2) {
      setIsFirstPage(true)
    }
    if (pageNumber === pageLimit) {
      setIsLastPage(false)
    }
  }

  return (
    <>
      <p className='total'>Total comments: {totalComments}</p>   
      {hasComments ? <CommentsButton setCommentsList={setCommentsList} setTotalComments={setTotalComments} pageNumber={pageNumber} pageLimit={pageLimit} decription={'Comments'}>

        <div className="comments-flex">
      <ul>
        {commentsList.map(comment => {
          const dateCreated = `${new Date(comment.created_at)}`;
          return (
            <li key={comment.comment_id}>
              <h3>{comment.author}</h3>
               <p>{comment.body}</p>
               <p>Votes: {comment.votes}</p>
               <p>Date created: {dateCreated}</p>
            </li>)
        })}
      </ul>
      </div>
      <p className='total'>Showing comments: {`${(pageNumber * 10 - 9)} - ${(pageNumber * 10 - 10) + commentsList.length} `}</p>
      <div id='commentsButtons'>

      <div className='nextButton'>
        {isFirstPage ? null : <button onClick={previousPage}>Pevious comments</button>}
      </div>

      <div className='previousButton'>
         {isLastPage ? null :  <button onClick={nextPage}>Next comments</button>}
      </div>

    </div>
      </CommentsButton> : null }
    </>
   )
}




