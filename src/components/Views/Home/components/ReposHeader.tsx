import { remote } from 'electron';
import { Modal } from 'bootstrap';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { useStoreActions } from '@/store';
import ErrorModal from '@components/Shared/ErrorModal';

export default function ReposHeader() {
  const addRepo = useStoreActions(store => store.addRepository);

  function findLocalRepo() {
    const modal = new Modal(document.getElementById('not-a-git-repository') as HTMLElement);
    const pathToRepo = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })?.[0];
    if (pathToRepo === undefined) return;
    if (fs.existsSync(`${pathToRepo}${path.sep}.git${path.sep}`))
      addRepo({ name: path.basename(pathToRepo), localPath: pathToRepo });
    else modal.show();
    // else remote.dialog.showMessageBoxSync({ type: 'error', message: 'The chosen directory is not a git repository.' });
  }

  return (
    <>
      <ErrorModal id='not-a-git-repository' message='The chosen directory is not a git repository.' />
      <header className='container-fluid bg-secondary py-3 text-center'>
        <button className='btn btn-lg btn-outline-light mx-2'>Create a new repository</button>
        <button className='btn btn-lg btn-outline-light mx-2' onClick={() => findLocalRepo()}>
          Find a local repository
        </button>
        <button className='btn btn-lg btn-outline-light mx-2'>Clone a repository</button>
      </header>
    </>
  );
}
