import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({asin}) => {
const [comments, setComments] = useState ([])
const [isLoading, setIsLoading] = useState (false)
const [isError, setIsError] = useState (false)

 const fetchComments = async () => {

      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' + asin,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NhYWZmYTE3ZWE3ODAwMTUyZWMwYzMiLCJpYXQiOjE2NzU3ODM3NjEsImV4cCI6MTY3Njk5MzM2MX0.ITbhkmZwNPpTn1UhJpP1Uz6Cq08C58klLdSOVgxi9Ys',
            },
          }
        )
        console.log(response)
        if (response.ok) {
          let comments = await response.json()
          setComments(comments)
          setIsLoading(false)
          setIsError(false)
        } else {
          console.log('error')
          this.setState({ isLoading: false, isError: true })
        }
      } catch (error) {
        console.log(error)
        this.setState({ isLoading: false, isError: true })
      }
    
  } 
  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asin])


   
    return (
      <div className="text-center">
        {isLoading && <Loading />}
        {isError && <Error />}
        <AddComment asin={asin} />
        <CommentList commentsToShow={comments} />
      </div>
    )
  }


export default CommentArea
