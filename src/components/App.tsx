import React from 'react'
import { HashRouter, HashRouter as Router, Route } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import { hot } from 'react-hot-loader/root'
import store from '../store'
import Home from './Views/Home/Home'
import About from './Views/About/About'

function App() {
  return (
    <StoreProvider store={store}>
      <div className='bg-dark text-white vh-100'>
        <HashRouter>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
        </HashRouter>
      </div>
    </StoreProvider>
  )
}

export default hot(App)
