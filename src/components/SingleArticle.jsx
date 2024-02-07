import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import newsApi from './api';
import Comments from './Comments';

export default function SingleArticle() {

  const { article_id } = useParams()
  const [singleArticle, setSingleArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0)

  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      setSingleArticle(data.article)
      setVoteCount(data.article.votes)
    })
  }, [])

  function upVote() {
    setVoteCount(voteCount + 1)
    newsApi.patch(`/articles/${article_id}`, {
     "inc_votes": 1})
  }

  function downVote() {
    setVoteCount(voteCount - 1)
    newsApi.patch(`/articles/${article_id}`, {
      "inc_votes": -1})
  }

  return (
    <>
    <div className='single-article'>
    <div className='article-info'>
        <h3>{singleArticle.title}</h3>
        <p>By: {singleArticle.author}</p>
        <p>Topic: {singleArticle.topic}</p>
        <p>{singleArticle.body}</p>
        <p>Total Votes: {voteCount}</p>
        <p>Date created: {`${new Date(singleArticle.created_at)}`}</p>
      </div>
      <div className='vote-buttons'>
      <button onClick={upVote} className='vote-button'>upvote</button>
      <button onClick={downVote} className='vote-button'>downvote</button>
      </div>
    </div>
    {<Comments></Comments>}
      </>
   )
}




