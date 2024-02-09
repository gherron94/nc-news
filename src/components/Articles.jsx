import {useEffect, useState} from 'react'
import newsApi from './api'
import { NavLink, useParams} from 'react-router-dom'

export default function Articles() {

  const {topic_id} = useParams()

  console.log(topic_id)

  const [articleList, setArticleList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)

  const pageLimit = Math.ceil(totalArticles / 10)

  useEffect(() => {
    if (!topic_id)
    newsApi.get(`/articles?p=${pageNumber}`)
      .then(({data}) => {
        setArticleList(data.articles)
        setTotalArticles(data.total_count)
      })
  }, [pageNumber, topic_id])


    useEffect(() => {
      if (topic_id) {
        newsApi.get(`/articles?topic=${topic_id}&p=${pageNumber}`)
        .then(({data}) => {
          setArticleList(data.articles)
          setTotalArticles(data.total_count)
        })
      }
    }, [topic_id, pageNumber])

  
  

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
     {topic_id? <h2 id='top'>{topic_id} Articles</h2> :
     
     <h2 id='top'>All Articles</h2>}

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

