import React from 'react';
import ModalWindow from '@/components/Shared/ModalWindow';
import { Repository } from '@/types';

interface RepoRemoveModalProps {
  id: string;
  repository: Repository;
  onConfirm: Function;
  onDeleteLocal: Function;
}

const RepoRemoveModal = ({ id, repository, onConfirm, onDeleteLocal }: RepoRemoveModalProps) => {
  return (
    <ModalWindow id={id} ariaLabelledby={`${id}--label`}>
      <div className='modal-header'>
        <h5 className='modal-title' id={`${id}--label`}>
          Remove a repository
        </h5>
        <button type='button' className='close text-white' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='modal-body'>
        <p>Are you sure you want to remove this repository: "{repository?.name}"?</p>
      </div>
      <div className='modal-footer'>
        <button className='btn btn-secondary' data-dismiss='modal' onClick={() => onConfirm(repository)}>
          Yes
        </button>
        <button className='btn btn-secondary' data-dismiss='modal' onClick={() => onDeleteLocal(repository)}>
          Yes, delete local files
        </button>
        <button className='btn btn-secondary' data-dismiss='modal'>
          No
        </button>
      </div>
    </ModalWindow>
  );
};

export default RepoRemoveModal;
