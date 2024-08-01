import React from 'react'

const singleProfile = ({params}:any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">
      <h1>userId: {params.id}</h1>
    </div>
  )
}

export default singleProfile
