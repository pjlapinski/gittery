import React from 'react'

export default function ReposHeader() {
  return (
    <header className='container-fluid bg-secondary py-3 text-center'>
      <button className='btn btn-lg btn-outline-light mx-2'>Create a new repository</button>
      <button className='btn btn-lg btn-outline-light mx-2'>Find a local repository</button>
      <button className='btn btn-lg btn-outline-light mx-2'>Clone a repository</button>
    </header>
  )
}
