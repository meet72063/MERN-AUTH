import React from 'react';

const Home = () => {
    return (
        <div className=' flex items-center justify-center min-h-page'>
            <div className='text-center w-[60%] space-y-2'>
                <h2 className='text-4xl font-bold text-dark-primary mb-4 '>Welcome to MERN AUTH</h2>
                <p className='text-teal-500 text-xl'>Greetings, fellow developer!</p>
                <p className='text-lg text-gray-800 dark:text-dark-text'>
                    Authentication can be a bit dull, right? 🤔 Fear not! MERN AUTH is your ticket to
                    streamlined authentication setups. It's not just an app; it's your companion for easy
                    authentication in MERN stack projects.
                </p>
                <div className='mt-6'>
                    <a
                        href='https://github.com/meet72063/MERN-AUTH'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600  hover:text-blue-800 hover:underline'
                    >
                        Explore Github Repo
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
