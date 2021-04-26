import { useStoreActions, useStoreState } from '@/store';
import { Repository } from '@/types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fs from 'fs';
import RepoRemoveModal from './RepoRemoveModal';
import { Modal } from 'bootstrap';

const maxNameChars = 40;
const maxPathChars = 70;

const ReposList = () => {
  const repos = useStoreState(state => state.repositories);
  const removeRepository = useStoreActions(state => state.removeRepository);

  const [repoToDelete, setRepoToDelete] = useState<Repository>();
  const [removeRepoModal, setRemoveRepoModal] = useState<Modal>();

  const onDeleteLocal = (repo: Repository) => {
    removeRepository(repo);
    fs.rmdirSync(repo.localPath, { recursive: true });
  };

  const openRemoveModal = (repo: Repository) => {
    setRepoToDelete(repo);
    removeRepoModal!.show();
  };

  useEffect(() => {
    setRemoveRepoModal(new Modal(document.getElementById('remove-repo') as HTMLElement));
  }, [setRemoveRepoModal]);

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
                  className='text-left btn btn-block btn-outline-light border-0'
                  onClick={() => console.log(repo)}
                >
                  <h3>{repo.name.length >= maxNameChars ? repo.name.slice(0, maxNameChars) + '...' : repo.name}</h3>
                  <h6 className='text-muted'>
                    {repo.localPath.length >= maxPathChars
                      ? repo.localPath.slice(0, maxPathChars) + '...'
                      : repo.localPath}
                  </h6>
                </Link>
                <button
                  className='btn btn-sm btn-danger p-3'
                  style={{ fontSize: '2rem' }}
                  onClick={() => openRemoveModal(repo)}
                >
                  &times;
                </button>
              </div>
              <hr className='border-white m-0' />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReposList;
