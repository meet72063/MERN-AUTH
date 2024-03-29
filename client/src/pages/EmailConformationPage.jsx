import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import useErrorHandler from '../hooks/useErrorHandler';
import { activateAccount } from '../api/auth';
import Loader from '../components/Loader';

const EmailConfirmationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleError } = useErrorHandler()
    const { token } = useParams();
    const navigate = useNavigate()
    if (!token) {
        return <Navigate to='/home' replace />;
    }

    const handleSubmit = () => {
        setIsLoading(true)
        activateAccount(token)
            .then(() => navigate("/login"))
            .catch(handleError)
            .finally(() => setIsLoading(false))
    };

    return (
        <div className="container mx-auto h-screen flex justify-center items-center">
            <div className="bg-white dark:bg-dark-background p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800  mb-6">
                    Email Confirmation
                </h2>
                <p className="text-gray-600 dark:text-gray-500 mb-4">
                    Click the button below to confirm your email.
                </p>
                <button
                    onClick={handleSubmit}
                    className="bg-teal-500 text-white rounded-md px-4 py-2 hover:bg-teal-600 focus:outline-none focus:shadow-outline-teal"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : "Confirm Email"}
                </button>
            </div>
        </div>
    );
};

export default EmailConfirmationPage;
