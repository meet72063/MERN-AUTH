import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useErrorHandler from '../hooks/useErrorHandler'
import { setUser } from '../features/auth/authSlice';
import { attemptLogin } from '../api/auth';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import GoogleLogin from '../components/GoogleLogin';
import Loader from '../components/Loader';



const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleError } = useErrorHandler()

    const initialValues = {
        email: "",
        password: ""
    }

    const schema = Yup.object({
        email: Yup.string().email("wrong email format").required("email is required"),
        password: Yup.string().required("password is required")
    })
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: initialValues,
            resolver: yupResolver(schema)
        }
    );


    const dispatch = useDispatch()
    const navigate = useNavigate()



    const onSubmit = (data) => {
        setIsLoading(true)
        attemptLogin(data)
            .then(data => {
                dispatch(setUser(data));
                navigate("/")
            })
            .catch(handleError)
            .finally(() => setIsLoading(false))
    };




    return (
        <div className="flex flex-col items-center justify-center py-4">
            <div className='border p-6 rounded-md'>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold dark:text-dark-text">Login To <span className="text-light-primary dark:text-dark-primary">MERN AUTH</span></h2>
                </div>
                <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text">Email</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-teal-500 dark:bg-dark-bg  dark:text-dark-text"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-400  text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4 ">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-dark-text">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-teal-500 dark:bg-dark-bg  dark:text-dark-text"
                            autoComplete='false'
                            {...register("password")}
                        />


                        {errors.password && <p className="text-red-400  text-sm mt-1">{errors.password.message}</p>}

                        <p className='text-right'>

                            <Link to='/password/forgot' className='text-xs  hover:underline  '>Forgot password?</Link>
                        </p>

                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300 "
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader /> : "Submit"}
                    </button>
                </form>

                <p className="mt-4 text-gray-700 dark:text-dark-text text-center">OR</p>

                <GoogleLogin />

                <p className="mt-10 text-center text-gray-700 dark:text-dark-text">
                    Don't have an account? <Link to="/signup" className="text-teal-500 hover:underline">Register</Link>
                </p>
            </div>

        </div>
    );
};

export default Login;

