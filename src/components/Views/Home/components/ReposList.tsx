import { useStoreActions, useStoreState } from '@/store';
import { Repository } from '@/types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';
import RepoRemoveModal from './RepoRemoveModal';
import { Modal } from 'bootstrap';

const maxNameChars = 15;
const maxPathChars = 30;

export default function ReposList() {
  const repos = useStoreState(state => state.repositories);
  const removeRepository = useStoreActions(state => state.removeRepository);

  const [repoToDelete, setRepoToDelete] = useState<Repository | null>(null);

  function onDeleteLocal(repo: Repository) {
    removeRepository(repo);
    fs.rmdirSync(repo.localPath, { recursive: true });
  }

  function openRemoveModal(repo: Repository) {
    setRepoToDelete(repo);
    const modal = new Modal(document.getElementById('remove-repo') as HTMLElement);
    modal.show();
  }

  return (
    <>
      <RepoRemoveModal
        id='remove-repo'
        repository={repoToDelete!}
        onConfirm={removeRepository}
        onDeleteLocal={onDeleteLocal}
      />
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
                <button className='btn btn-danger p-3' onClick={() => openRemoveModal(repo)}>
                  X
                </button>
              </div>
              <hr className='border-white m-0' />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
