import { remote } from 'electron';
import { Modal } from 'bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import { useStoreActions } from '@/store';
import ErrorModal from '@components/shared/ErrorModal';
import RepoInitModal from './RepoInitModal';

const isGitRepo = (pathToRepo: string) => fs.existsSync(`${pathToRepo}${path.sep}.git${path.sep}`);

const ReposHeader = () => {
  const addRepo = useStoreActions(store => store.addRepository);
  const [initRepoModal, setInitRepoModal] = useState<Modal>();
  const [notAGitRepoModal, setNotAGitRepoModal] = useState<Modal>();

  const findLocalRepo = useCallback(() => {
    const pathToRepo = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })?.[0];
    if (pathToRepo === undefined) return;
    if (isGitRepo(pathToRepo)) addRepo({ name: path.basename(pathToRepo), localPath: pathToRepo });
    else notAGitRepoModal?.show();
  }, []);

  useEffect(() => {
    setInitRepoModal(new Modal(document.getElementById('init-repository') as HTMLElement));
    setNotAGitRepoModal(new Modal(document.getElementById('not-a-git-repository') as HTMLElement));
  }, [setInitRepoModal, setNotAGitRepoModal]);

  return (
    <>
      <RepoInitModal id='init-repository' onRepoInitialized={() => initRepoModal?.hide()} />
      <ErrorModal id='not-a-git-repository' message='The chosen directory is not a git repository.' />
      <header className='container-fluid bg-secondary py-3 text-center'>
        <button className='btn btn-lg btn-outline-light mx-2' onClick={() => initRepoModal?.show()}>
          Initialize a new repository
        </button>
        <button className='btn btn-lg btn-outline-light mx-2' onClick={findLocalRepo}>
          Find a local repository
        </button>
        <button className='btn btn-lg btn-outline-light mx-2'>Clone a repository</button>
      </header>
    </>
  );
};

export default ReposHeader;
