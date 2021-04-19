import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import simpleGit from 'simple-git';
import { hot } from 'react-hot-loader/root';
import store from '../store';
import HomeView from './views/home/HomeView';
import About from './views/about/About';
import { ipcRenderer } from 'electron';

export const git = simpleGit();

ipcRenderer.on('clear-local-storage', () => {
  localStorage.clear();
  ipcRenderer.send('request-reload');
});

const App = () => {
  return (
    <StoreProvider store={store}>
      <div className='bg-dark text-white vh-100' style={{ overflow: 'hidden' }}>
        <HashRouter>
          <Route path='/' exact component={HomeView} />
          <Route path='/about' component={About} />
        </HashRouter>
      </div>
    </StoreProvider>
  );
};

export default hot(App);
