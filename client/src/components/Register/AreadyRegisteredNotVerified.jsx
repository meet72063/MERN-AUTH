import React from 'react';

const AlreadyRegisteredNotVerified = ({ resendConformation, email }) => {
    return (
        <div className="mt-6 text-center bg-white dark:bg-dark-background p-12 rounded-lg shadow-md">
            <p className="text-gray-700 text-lg font-serif">
                It looks like you've already registered, but your email is not verified.
            </p>
            <div className="text-gray-700 mt-2 space-y-2">
                <p > You should have received a verification email.</p>
                <p> <span className='font-serif'> Check your mailbox:</span>
                    <span className='text-md dark:text-dark-primary text-teal-500 ml-2'>
                        <a href="https://mail.google.com/" target='_blank'>{email}</a>
                    </span><br />
                    If not, click the button below to resend it.</p>
            </div>
            <button
                type="button"
                className="text-teal-500 underline focus:outline-none ml-2  "
                onClick={resendConformation}
            >
                Resend
            </button>

        </div>
    );
};

export default AlreadyRegisteredNotVerified;
