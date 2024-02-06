import { useEffect, useState } from "react"
import newsApi from "./api"
import { useParams } from 'react-router-dom'

export default function Button({children, decription, setCommentsList, setTotalComments, pageNumber}) {

  const [isRevealed, setIsRevealed] = useState(false)
  const { article_id } = useParams()



  function whenClicked() {
    setIsRevealed(isRevealed => !isRevealed)
  }

        useEffect(()=> {
          newsApi.get(`/articles/${article_id}/comments?p=${pageNumber}`)
          .then(({data}) => {
            setCommentsList(data.comments)
            setTotalComments(data.total_count)
          })
        }, [pageNumber])
      

  return (
    <>
    <button className='commentsButton' onClick={whenClicked}>
      {isRevealed? 'Hide': 'Show'} {decription}
    </button>
    {isRevealed? children: null}
    </>
  
  )

}