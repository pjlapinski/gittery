import React from 'react';

interface ModalProps {
  id: string;
  ariaLabelledby: string;
  children: React.ReactNode;
  className?: string;
}

export default function ModalWindow({ id, ariaLabelledby, children, className }: ModalProps) {
  return (
    <div
      className={`modal ${className}`}
      id={id}
      tabIndex={-1}
      role='dialog'
      aria-labelledby={ariaLabelledby}
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
}
