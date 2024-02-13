import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import newsApi from './api';
import Comments from './Comments';
import PostComment from './PostComment';

export default function SingleArticle() {

  const { article_id } = useParams()
  const [singleArticle, setSingleArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [upVoted, setUpVoted] = useState(false)
  const [downVoted, setdownVoted] = useState(false)
  const [isCommentPosted, setISCommentPosted] = useState (false)
  const [isLoadingArticle, setIsLoadingArticle] = useState(true)


 

  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      setIsLoadingArticle(false)
      setSingleArticle(data.article)
      setVoteCount(data.article.votes)
    })
  }, [])

  function upVote() {

    if (!hasVoted)  {
      setVoteCount(voteCount + 1)
      newsApi.patch(`/articles/${article_id}`, {"inc_votes": 1})
      setHasVoted(true)
      setUpVoted(true)
      setdownVoted(false)
      setISCommentPosted(false)
    }
    else if (hasVoted && upVoted) {
      setVoteCount(voteCount - 1)
      newsApi.patch(`/articles/${article_id}`, {"inc_votes": - 1})
      setHasVoted(false)
      setdownVoted(false)
      setUpVoted(false)
      setISCommentPosted(false)
    }
  }

  function downVote() {

    if (!hasVoted) {
      setVoteCount(voteCount - 1)
      newsApi.patch(`/articles/${article_id}`, {"inc_votes": -1})
      setHasVoted(true)
      setdownVoted(true)
      setUpVoted(false)
      setISCommentPosted(false)
    } 
    else if (hasVoted && downVoted) {
      setVoteCount(voteCount + 1)
      newsApi.patch(`/articles/${article_id}`, {"inc_votes": 1})
      setHasVoted(false)
      setdownVoted(false)
      setUpVoted(false)
      setISCommentPosted(false)
    }
  }

  return (
    <>
    {isLoadingArticle ? <div className='loading' ><h3>Loading Article...</h3></div> : 
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
      <button className={hasVoted && upVoted ? 'voted':'not-voted'} onClick={upVote}>upvote</button>
      <button className={hasVoted && downVoted ? 'voted':'not-voted'}onClick={downVote}>downvote</button>
      </div>
      {hasVoted && upVoted ? <p className='vote-status'>Upvoted Article</p> : null}
      {hasVoted && downVoted ? <p className='vote-status'>Downvoted Article</p> : null}
      <PostComment isCommentPosted={isCommentPosted} setISCommentPosted={setISCommentPosted} ></PostComment>
    </div>
    <Comments isCommentPosted={isCommentPosted} setISCommentPosted={setISCommentPosted}></Comments>
    </>
      }
      </> 
   )
}




