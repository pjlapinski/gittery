import React from 'react';

interface ModalProps {
  id: string;
  ariaLabelledby: string;
  children: React.ReactNode;
  className?: string;
}

export default function ModalWindow({ id, ariaLabelledby, children, className }: ModalProps) {
  return (
    <div id={id} className='modal' tabIndex={-1} role='dialog' aria-labelledby={ariaLabelledby} aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className={`modal-content bg-dark border border-white ${className}`}>{children}</div>
      </div>
    </div>
  );
}
