import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import newsApi from './api';
import CommentsButton from './CommentsButton';

export default function SingleArticle() {

  const { article_id } = useParams()
  const [singleArticle, setSingleArticle] = useState({});
  const [commentsList, setCommentsList] = useState([])
  const [totalComments, setTotalComments] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)


  const pageLimit = Math.ceil(totalComments / 10)


  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      setSingleArticle(data.article)  
    })
  }, [])

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
     <div className='single-article'>
              <h3>{singleArticle.title}</h3>
              <p>Topic: {singleArticle.topic}</p>
              <p>By: {singleArticle.author}</p>
              <p>{singleArticle.body}</p>
              <p>Total Votes: {singleArticle.votes}</p>
              <p>Total Comments: {singleArticle.comment_count}</p>
              <p>Date created: {`${new Date(singleArticle.created_at)}`}</p>
      </div>

      <CommentsButton setCommentsList={setCommentsList} setTotalComments={setTotalComments} pageNumber={pageNumber} pageLimit={pageLimit} decription={'Comments'}>

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
      <p className='total'>Total comments:  {totalComments}</p>
      <p className='total'>Current Page: {pageNumber}</p>
      <div id='pageButtons'>

      <div className='nextButton'>
        {isFirstPage ? null : <button onClick={previousPage}>Pevious Page</button>}
      </div>

      <div className='previousButton'>
         {isLastPage ? null :  <button onClick={nextPage}>Next Page</button>}
      </div>

    </div>
      </CommentsButton>
    </>
   )
}




