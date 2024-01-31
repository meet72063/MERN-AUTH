import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleSignUp, loginUser } from '../features/auth/authSlice';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"



const Login = () => {
    const [isLoading, setIsLoading] = useState()

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

    //google  login
    const login = useGoogleLogin({
        onSuccess: async ({ code }) => {

            dispatch(googleSignUp({ code, navigate }))
        },
        onError: (error) => console.log('Login Failed:', error),
        flow: "auth-code"
    });


    const onSubmit = (data) => {
        setIsLoading(true)
        dispatch(loginUser({ data, navigate }))
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
                    >
                        {isLoading ? "Logging In..." : "Submit"}
                    </button>
                </form>

                <p className="mt-4 text-gray-700 dark:text-dark-text text-center">OR</p>

                <div className="mt-4 flex justify-center">
                    <button onClick={() => login()} type='button' className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" >
                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="mt-10 text-center text-gray-700 dark:text-dark-text">
                    Don't have an account? <Link to="/signup" className="text-teal-500 hover:underline">Register</Link>
                </p>
            </div>

        </div>
    );
};

export default Login;

