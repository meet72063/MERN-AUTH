import React from 'react';

const VerificationInstructions = ({ resendConfirmation, reset, email }) => {
    return (
        <div className="mt-6 text-center bg-white dark:bg-dark-background p-12 rounded-lg shadow-md">
            <p className="text-gray-700  text-lg font-serif">
                Great! We've sent a verification link to your email <br />
                <span className='text-xl text-light-primary dark:text-dark-primary'>
                    {email}</span>.

            </p>
            <ol className="text-left mt-4 mb-6 text-teal-700 space-y-1 ">
                <li>Check your email inbox for the verification message.</li>
                <li>Click on the provided verification link.</li>
            </ol>

            <p className="text-gray-700  text-sm">
                Note: The verification link will expire after <span className='text-red-700'>30 minutes</span>.
            </p>
            <p className="text-gray-700  text-sm mt-6">
                Didn't receive an email?
                <button
                    type="button"
                    className="text-teal-500 underline focus:outline-none ml-2"
                    onClick={resendConfirmation}
                >
                    Resend
                </button>
                <button
                    type="button"
                    className="text-red-500  focus:outline-none ml-2"
                    onClick={reset}
                >
                    Reset
                </button>

            </p>
        </div>
    );
};

export default VerificationInstructions;
