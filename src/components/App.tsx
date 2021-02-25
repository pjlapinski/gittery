import React from 'react'
import { hot } from 'react-hot-loader/root'
import { HashRouter, HashRouter as Router, Route } from 'react-router-dom'
import Home from './Views/Home/Home'
import About from './Views/About/About'

function App() {
  return (
    <div className='bg-dark text-white vh-100'>
      <HashRouter>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
      </HashRouter>
    </div>
  )
}

export default hot(App)
