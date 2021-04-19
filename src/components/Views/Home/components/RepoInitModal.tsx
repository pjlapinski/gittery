import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import ModalWindow from '@/components/Shared/ModalWindow';
import { git } from '@components/App';
import { useStoreActions } from '@/store';
import licenses from '@/git/licenses';
import ignores from '@/git/ignores';

interface RepoInitModalProps {
  id: string;
  onInit: Function;
}

const forbiddenFileNameCharacters = '<>:"/\\|?*';

const RepoInitModal = ({ id, onInit }: RepoInitModalProps) => {
  const [repoName, setRepoName] = useState('');
  const [repoPath, setRepoPath] = useState('');
  const [repoDescription, setRepoDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [pathError, setPathError] = useState('');
  const [selectedIgnore, setSelectedIgnore] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('');

  const addRepo = useStoreActions(store => store.addRepository);

  const resetState = () => {
    setRepoName('');
    setRepoPath('');
    setRepoDescription('');
    setNameError('');
    setPathError('');
    setSelectedIgnore('');
    setSelectedLicense('');
  };

  const onChoosePathButtonClick = () => {
    const pathToRepo = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })?.[0];
    if (pathToRepo === undefined) return;
    setRepoPath(pathToRepo);
  };

  const onInitialize = async () => {
    // validate inputs
    let nameErr = '';
    let pathErr = '';
    if (repoName === '') nameErr = 'Name cannot be empty';
    if (repoPath === '') pathErr = 'Path cannot be empty';
    if (repoName.split('').some(ch => forbiddenFileNameCharacters.indexOf(ch) !== -1))
      nameErr = 'The name cannot contain any of those characters: < > : " / \\ | ? *';
    if (repoName.endsWith(' ') || repoName.endsWith('.')) nameErr = 'The name cannot end in a space or dot';
    const fullPath = repoPath + path.sep + repoName;
    if (!fs.existsSync(repoPath)) pathErr = 'The path must be an existing directory';
    if (fs.existsSync(`${fullPath}${path.sep}.git${path.sep}`))
      nameErr = 'The directory must not be an existing repository';
    setNameError(nameErr);
    setPathError(pathErr);
    if (nameErr !== '' || pathErr !== '') return;
    // create the repository
    await git.init([fullPath]);
    addRepo({ name: repoName, localPath: fullPath });
    // if description exists, write it to .git/description
    if (repoDescription !== '') fs.writeFileSync(`${fullPath}${path.sep}.git${path.sep}description`, repoDescription);
    // if gitignore was selected, create it
    if (selectedIgnore !== '') {
      const res = await axios.get(`https://api.github.com/gitignore/templates/${selectedIgnore}`);
      if (res.status === 200) {
        fs.writeFileSync(`${fullPath}${path.sep}.gitignore`, res.data['source']);
      }
    }
    // if a license was selected, create it
    if (selectedLicense !== '') {
      const res = await axios.get(`https://api.github.com/licenses/${selectedLicense}`);
      if (res.status === 200) {
        const currentYear = new Date().getFullYear().toString();
        const userName = await git
          .listConfig()
          .then(r => r.all['user.name'])
          .then(r => (typeof r === 'string' ? r : r[0]));
        const userEmail = await git
          .listConfig()
          .then(r => r.all['user.email'])
          .then(r => (typeof r === 'string' ? r : r[0]));
        const data = (res.data['body'] as string)
          .replaceAll(/\[year\]/g, currentYear)
          .replaceAll(/\[project\]/g, repoName)
          .replaceAll(/\[fullname\]/g, userName)
          .replaceAll(/\[email\]/g, userEmail);
        fs.writeFileSync(`${fullPath}${path.sep}LICENSE`, data);
      }
    }
    resetState();
    onInit();
  };

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
          <input
            type='text'
            className='form-control bg-darker text-white mb-3'
            placeholder='Description'
            value={repoDescription}
            onChange={e => setRepoDescription(e.target.value)}
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
          <h5 className='mt-3'>.gitignore</h5>
          <select
            value={selectedIgnore}
            onChange={e => setSelectedIgnore(e.target.value)}
            className='custom-select bg-darker text-white border-white select-white-handle'
          >
            <option value=''>None</option>
            {ignores.map(ignore => (
              <option key={ignore} value={ignore}>
                {ignore}
              </option>
            ))}
          </select>
          <h5 className='mt-3'>License</h5>
          <select
            value={selectedLicense}
            onChange={e => setSelectedLicense(e.target.value)}
            className='custom-select bg-darker text-white border-white select-white-handle'
          >
            <option value=''>None</option>
            {Object.keys(licenses).map(license => (
              <option key={license} value={licenses[license]}>
                {license}
              </option>
            ))}
          </select>
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
};

export default RepoInitModal;
