import React from 'react';

const AuthPage = () => {
    return (
        <div className="container mx-auto p-4 text-light-text dark:text-dark-text">
            <h1 className="text-3xl font-bold mb-4">
                MERN-AUTH: Authentication Simplified
            </h1>

            <p className="mb-4">
                MERN-AUTH simplifies authentication, providing a secure and user-friendly experience. Key features include:
            </p>

            <ul className="list-disc pl-6 mb-4">
                <li>Email and password authentication</li>
                <li>Google authentication integration</li>
                <li>Password forgot and reset functionalities</li>
                <li>Email verification during signup</li>
                <li>JWT for enhanced security</li>
            </ul>

            <h2 className="text-xl font-bold mb-2">
                Contribute on GitHub:
            </h2>
            <p className="mb-4">
                You're invited to contribute and improve MERN-AUTH on GitHub.
                <br />
                <span className="text-blue-500 hover:underline">
                    [GitHub: <a href="https://github.com/meeetp72063/MERN-AUTH" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MERN-AUTH</a>]
                </span>
            </p>

            <p>
                *Happy Coding!*
                <br />
                Explore the world of secure authentication with MERN-AUTH.
            </p>
        </div>
    );
};

export default AuthPage;
