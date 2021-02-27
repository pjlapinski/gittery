import { useStoreState } from '@/store';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ReposList() {
  const repos = useStoreState(state => state.repositories);

  return (
    <div className='overflow-auto'>
      <div className='container pt-2'>
        {repos.map((repo, index) => (
          <Link to='#' className='btn btn-block btn-outline-light border-0 m-0 p-0' key={index}>
            <span className='row mx-1 px-2 justify-content-between'>
              <h3>{repo.name}</h3>
              <h6 className='text-secondary align-self-end'>{repo.localPath}</h6>
            </span>
            <hr className='border-white' />
          </Link>
        ))}
      </div>
    </div>
  );
}
