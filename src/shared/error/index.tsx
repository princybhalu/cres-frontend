import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorComp = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate('/');
    };

    return (
        <div className='mx-auto w-full h-full'>
            <h1 className='text-red font-semobold'>403 Error</h1>
            <h3 className='font-semoibold'>Someting Goes Wrong</h3>
            <button onClick={handleNavigation}>Go to Home Page</button>
        </div>
    );
}

export default ErrorComp;
