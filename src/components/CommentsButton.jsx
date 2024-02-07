import {useState } from "react"

export default function Button({children, decription}) {

  const [isRevealed, setIsRevealed] = useState(false)

  function whenClicked() {
    setIsRevealed(isRevealed => !isRevealed)
  }

  return (
    <>
    <button className='commentsButton' onClick={whenClicked}>
      {isRevealed? 'Hide': 'Show'} {decription}
    </button>
    {isRevealed? children: null}
    </>
  
  )

}