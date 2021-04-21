import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  id: string;
  ariaLabelledby: string;
  children: React.ReactNode;
  className?: string;
}

const ModalWindow = ({ id, ariaLabelledby, children, className }: ModalProps) => {
  return ReactDOM.createPortal(
    <div id={id} className='modal' tabIndex={-1} role='dialog' aria-labelledby={ariaLabelledby} aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className={`modal-content bg-dark border text-white border-white ${className}`}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default ModalWindow;
