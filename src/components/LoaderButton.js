import React from 'react';
import { Button } from 'react-bootstrap';
import './LoaderButton.css';

function LoaderButton({isLoading, className='', disabled=false, ...props}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <i className='fa fa-spinner spinning'></i>}
      {props.children}
    </Button>
  );
}

export default LoaderButton;