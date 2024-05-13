import React from 'react';
import { Alert } from 'react-bootstrap';

function SAlert({ message, type, isShow }) {
  return (
    <Alert variant={type} show={isShow}>
      {message}
    </Alert>
  );
}

export default SAlert;
