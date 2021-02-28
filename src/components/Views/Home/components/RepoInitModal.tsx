import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
import path from 'path';
import fs from 'fs';
import ModalWindow from '@/components/Shared/ModalWindow';
import { git } from '@components/App';
import { useStoreActions } from '@/store';

interface RepoInitModalProps {
  id: string;
  onInit: Function;
}

const forbiddenFileNameCharacters = '<>:"/\\|?*';

export default function RepoInitModal({ id, onInit }: RepoInitModalProps) {
  const [repoName, setRepoName] = useState('');
  const [repoPath, setRepoPath] = useState('');
  const [nameError, setNameError] = useState('');
  const [pathError, setPathError] = useState('');

  const addRepo = useStoreActions(store => store.addRepository);

  function resetState() {
    setRepoName('');
    setRepoPath('');
    setNameError('');
    setPathError('');
  }

  function onChoosePathButtonClick() {
    const pathToRepo = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })?.[0];
    if (pathToRepo === undefined) return;
    setRepoPath(pathToRepo);
  }

  function onInitialize() {
    let nameErr = '';
    let pathErr = '';
    if (repoName === '') nameErr = 'Name cannot be empty';
    if (repoPath === '') pathErr = 'Path cannot be empty';
    if (repoName.split('').some(ch => forbiddenFileNameCharacters.indexOf(ch) !== -1))
      nameErr = 'The name cannot contain any of those charactes: < > : " / \\ | ? *';
    if (repoName.endsWith(' ') || repoName.endsWith('.')) nameErr = 'The name cannot end in a space or dot';
    const fullPath = repoPath + path.sep + repoName;
    if (!fs.existsSync(repoPath)) pathErr = 'The path must be an existing directory';
    if (fs.existsSync(`${fullPath}${path.sep}.git${path.sep}`))
      nameErr = 'The directory must not be an existing repository';
    setNameError(nameErr);
    setPathError(pathErr);
    if (nameErr !== '' || pathErr !== '') return;
    git.init([fullPath]);
    addRepo({ name: repoName, localPath: fullPath });
    setRepoName('');
    setRepoPath('');
    onInit();
  }

  return (
    <ModalWindow id={id} ariaLabelledby={`${id}--label`}>
      <div className='modal-header'>
        <h5 className='modal-title' id={`${id}--label`}>
          Initialize a new repository
        </h5>
        <button type='button' className='close text-white' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='modal-body'>
        <div className='form-group'>
          <span className='text-danger'>{nameError}</span>
          <input
            type='text'
            className='form-control bg-darker text-white mb-3'
            placeholder='Name'
            value={repoName}
            onChange={e => setRepoName(e.target.value)}
          />
          <span className='text-danger'>{pathError}</span>
          <div className='input-group'>
            <input
              type='text'
              className='form-control bg-darker text-white'
              placeholder='Path'
              value={repoPath}
              onChange={e => setRepoPath(e.target.value)}
            />
            <div className='input-group-append'>
              <button className='btn btn-secondary' onClick={() => onChoosePathButtonClick()}>
                Choose...
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <button className='btn btn-secondary' onClick={() => onInitialize()}>
          Initialize
        </button>
        <button className='btn btn-secondary' data-dismiss='modal' onClick={() => resetState()}>
          Close
        </button>
      </div>
    </ModalWindow>
  );
}
