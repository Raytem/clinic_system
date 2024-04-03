import Spinner from 'react-bootstrap/Spinner';

import React from 'react'

const CenteredSpinner = () => {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default CenteredSpinner