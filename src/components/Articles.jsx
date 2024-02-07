import {useEffect, useState} from 'react'
import newsApi from './api'
import { NavLink } from 'react-router-dom'

export default function Articles() {

  const [articleList, setArticleList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)

  const pageLimit = Math.ceil(totalArticles / 10)

  useEffect(() => {
    newsApi.get(`/articles?p=${pageNumber}`)
      .then(({data}) => {
        setArticleList(data.articles)
        setTotalArticles(data.total_count)
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
      <h2 id='top'>All Articles</h2>

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

