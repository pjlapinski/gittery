import React from 'react';
import ReposHeader from './components/ReposHeader';
import ReposList from './components/ReposList';

const HomeView = () => {
  return (
    <div className='vh-100 d-flex flex-column'>
      <ReposHeader></ReposHeader>
      <ReposList></ReposList>
    </div>
  );
};

export default HomeView;
