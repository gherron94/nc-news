import {useEffect, useState} from 'react'
import newsApi from './api'
import { NavLink, useParams} from 'react-router-dom'

export default function Articles() {

  const {topic_id} = useParams()

  const [articleList, setArticleList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)
  const [sortByDate, setSortByDate] = useState(false)
  const [sortByCommentCount, setSortByCommentCount] = useState(false)
  const [sortByVotes, setSortByVotes] = useState(false)
  const [isAscending, setIsAscending] = useState(false)

  const pageLimit = Math.ceil(totalArticles / 10)

  let urlString = `/articles?`

  if (topic_id) {
    urlString+= `topic=${topic_id}&`
  }

  if (sortByDate) {
    urlString+= `sort_by=created_at&`
  }

  if (sortByCommentCount) {
    urlString+= `sort_by=comment_count&`
  }

  if (sortByVotes) {
    urlString+= `sort_by=votes&`
  }

  if (isAscending) {
    urlString+= `order=asc&`
  }

  urlString+= `p=${pageNumber}`

  useEffect(() => {
    newsApi.get(urlString)
      .then(({data}) => {
        setArticleList(data.articles)
        setTotalArticles(data.total_count)
      })
  }, [pageNumber, topic_id, sortByCommentCount, sortByDate, sortByVotes, isAscending])  

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

  function handleDateSorting() {
    setSortByDate(true)
    setSortByCommentCount(false)
    setSortByVotes(false)
  }

  function handleCommentSorting() {
    setSortByCommentCount(true)
    setSortByDate(false)
    setSortByVotes(false)
  }

  function handleVotesSorting() {
    setSortByVotes(true)
    setSortByCommentCount(false)
    setSortByDate(false)
  }

  function handleDesc() {
    setIsAscending(false)
  }

  function handleAsc() {
    setIsAscending(true)
  }

  return (  
    <>
     {topic_id? <h2 id='top'>{topic_id} Articles</h2> :
     
     <h2 id='top'>All Articles</h2>}

     <div className='sorting-bar'>

      <div className='first-row'>
      <p>Sort By:</p>
      <button className={isAscending ? 'order-buttons-off' : 'order-buttons-on'}  onClick={handleDesc} >descending</button>
      <button className={isAscending ? 'order-buttons-on' : 'order-buttons-off'} onClick={handleAsc}>ascending</button>
      </div>

      <div className='second-row'>
      <button className='sorters' onClick={handleDateSorting} >Date</button>
      <button className='sorters' onClick={handleCommentSorting}>Comments count</button>
      <button className='sorters' onClick={handleVotesSorting}>Votes</button>
      </div>
     </div>

      <div className="articles">
      <ul>
        {articleList.map(article => {
          const dateCreated = `${new Date(article.created_at)}`;

          return (
            <li key={article.article_id}>
              <NavLink to={`/articles/${article.article_id}`}>
              <h3>{article.title}</h3>
              </NavLink>
               <p className='author'>Written by: {article.author}</p>
               <p>Topic: {article.topic}</p>
               <p>Total votes: {article.votes}</p>
               <p>Total comments: {article.comment_count}</p>
               <p>Date created: {dateCreated}</p>
            </li>)
        })}
      </ul>
      <p className='total'>Total articles:  {totalArticles}</p>
      <p className='total'>Current Page: {pageNumber}</p>
    </div>
 
    <div id='pageButtons'>

      <div className='nextButton'>
        {isFirstPage ? null : <button onClick={previousPage}>Pevious Page</button>}
      </div>

      <div className='previousButton'>
         {isLastPage ? null :  <button onClick={nextPage}>Next Page</button>}
      </div>

    </div>

    </>
  )
}

