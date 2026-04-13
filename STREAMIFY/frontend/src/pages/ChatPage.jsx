import React from 'react'
import { useNavigate } from 'react-router'

const ChatPage = () => {

  const navigate = useNavigate()
  return (
    <div>ChatPage
      <div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}> go back</button>

      </div>
    </div>
  )
}

export default ChatPage