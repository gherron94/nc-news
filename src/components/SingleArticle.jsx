import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import newsApi from './api';
import Comments from './Comments';

export default function SingleArticle() {

  const { article_id } = useParams()
  const [singleArticle, setSingleArticle] = useState({});
  const [totalComments, setTotalComments] = useState(0)

  const pageLimit = Math.ceil(totalComments / 10)
  
  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      setSingleArticle(data.article)  
    })
  }, [])

  return (
    <>
     <div className='single-article'>
        <h3>{singleArticle.title}</h3>
        <p>Topic: {singleArticle.topic}</p>
        <p>By: {singleArticle.author}</p>
        <p>{singleArticle.body}</p>
        <p>Total Votes: {singleArticle.votes}</p>
        <p>Date created: {`${new Date(singleArticle.created_at)}`}</p>
      </div>
      <p className='total'>Total comments:  {totalComments}</p>   
      {<Comments totalComments={totalComments} setTotalComments={setTotalComments}></Comments>}
      </>
   )
}




