import React from 'react';
import ModalWindow from './ModalWindow';

interface ErrorModalProps {
  id: string;
  message: string;
}

const ErrorModal = ({ id, message }: ErrorModalProps) => {
  return (
    <ModalWindow ariaLabelledby={`${id}--label`} id={id}>
      <div className='modal-header'>
        <h5 className='modal-title' id={`${id}--label`}>
          Error
        </h5>
        <button type='button' className='close text-white' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='modal-body'>
        <p>{message}</p>
      </div>
    </ModalWindow>
  );
};

export default ErrorModal;
