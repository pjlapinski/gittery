import React from 'react';
import ReposHeader from './ReposHeader';
import ReposList from './ReposList';

export default function HomeView() {
  return (
    <div className='vh-100 d-flex flex-column'>
      <ReposHeader></ReposHeader>
      <ReposList></ReposList>
    </div>
  );
}
