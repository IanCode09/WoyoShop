import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div style={{height: '500px'}}>
            <Spinner animation="border" variant="danger" style={{ width: '50px', height: '50px' }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader
