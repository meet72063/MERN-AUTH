import React, { useState } from 'react'
import SignUp from '../components/Register/SignUp';
import VerificationInstructions from '../components/Register/VerificationInstructions';
import { Navigate } from 'react-router-dom';
import useErrorHandler from '../hooks/useErrorHandler';
import AlreadyRegisteredNotVerified from '../components/Register/AreadyRegisteredNotVerified';
import { attemptRegister, resendVerification } from '../api/auth';

export const REGISTER = "REGISTER"
export const VERIFICATION = "VERIFICATION"
export const REGISTERNOTVERIFIED = "REGISTERNOTVERIFIED"


const Register = () => {
    const [registerStep, setRegisterStep] = useState(REGISTER);
    const { handleError } = useErrorHandler()
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const attemptSignUp = async (data) => {
        setIsLoading(true)
        setEmail(data.email)
        attemptRegister(data)
            .then(() =>
                setRegisterStep(VERIFICATION)
            )
            .catch(err => {
                if (err.response.data.status === "UserExistsNotVerified")
                    setRegisterStep(REGISTERNOTVERIFIED)
                else
                    handleError(err)
            }
            )
            .finally(() => setIsLoading(false))
    };

    const resendConformation = async () => {
        setIsLoading(true)
        resendVerification(email)
            .then(() => setRegisterStep(VERIFICATION))
            .catch(
                handleError
            )
            .finally(() => {
                setIsLoading(false)
            })
    }

    const reset = () => {
        setRegisterStep(REGISTER)
    }

    function RenderSwitch() {
        switch (registerStep) {
            case REGISTER:
                return <SignUp
                    attemptSignUp={attemptSignUp}
                    isLoading={isLoading} />
            case VERIFICATION:
                return <VerificationInstructions
                    resendConformation={resendConformation}
                    reset={reset}
                    email={email}
                    setRegisterStep={setRegisterStep}
                />
            case REGISTERNOTVERIFIED:
                return <AlreadyRegisteredNotVerified
                    resendConformation={resendConformation}
                    email={email}
                />
            default:
                return <Navigate to="/" replace />
        }
    }
    return <div className="flex flex-col items-center p-4">
        {
            RenderSwitch()
        }
    </div>
}

export default Register


