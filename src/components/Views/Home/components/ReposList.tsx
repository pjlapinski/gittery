import { useStoreActions, useStoreState } from '@/store';
import { Repository } from '@/types';
import { remote } from 'electron';
import React from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';

const maxNameChars = 15;
const maxPathChars = 30;

export default function ReposList() {
  const repos = useStoreState(state => state.repositories);
  const removeRepository = useStoreActions(state => state.removeRepository);

  function removeRepo(repo: Repository) {
    remote.dialog
      .showMessageBox(remote.getCurrentWindow(), {
        type: 'question',
        message: `Are you sure you want to remove this repository: "${repo.name}"?`,
        buttons: ['Yes', 'Yes, delete local files', 'No'],
        cancelId: 2,
        noLink: true,
      })
      .then(res => {
        if (res.response === 2) return;
        removeRepository(repo.name);
        if (res.response === 1) {
          fs.rmdirSync(repo.localPath, { recursive: true });
        }
      });
  }

  return (
    <div className='overflow-auto'>
      <div className='container pt-2'>
        {repos.map((repo, index) => (
          <div key={index}>
            <div className='d-flex btn-group'>
              <Link
                to='#'
                className='d-flex justify-content-between btn btn-block btn-outline-light border-0'
                onClick={() => console.log(repo)}
              >
                <h4 className='align-self-center'>
                  {repo.name.length >= maxNameChars ? repo.name.slice(0, maxNameChars) + '...' : repo.name}
                </h4>
                <h6 className='text-secondary align-self-end'>
                  {repo.localPath.length >= maxPathChars
                    ? repo.localPath.slice(0, maxPathChars) + '...'
                    : repo.localPath}
                </h6>
              </Link>
              <button className='btn btn-danger p-3' onClick={() => removeRepo(repo)}>
                X
              </button>
            </div>
            <hr className='border-white m-0' />
          </div>
        ))}
      </div>
    </div>
  );
}
