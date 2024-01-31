import React from 'react';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import GoogleLogin from '../GoogleLogin';
import Loader from '../Loader';




const SignUp = ({ attemptSignUp, isLoading }) => {
    const initialValues = {
        name: "",
        email: "",
        password: ""
    }


    const validationSchema = Yup.object({
        name: Yup.string().min(3).max(50).required("username is Required"),
        email: Yup.string().email("wrong email format").required("email is Required"),
        password: Yup.string().min(6).max(255).required("password is Required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: initialValues,
            resolver: yupResolver(validationSchema)
        }
    )




    return (

        <div className='border p-6 rounded-md'>
            <div className="mb-6">
                <h2 className="text-2xl font-bold dark:text-dark-text">Sign Up To <span className="text-light-primary dark:text-dark-primary">MERN AUTH</span></h2>
            </div>
            <form className="w-full max-w-md" onSubmit={handleSubmit(attemptSignUp)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text">name</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-teal-500 dark:bg-dark-bg  dark:text-dark-text"
                        {...register("name")}
                    />
                    {errors.name && <p className="text-red-400  text-sm mt-1">{errors.name.message}</p>}
                </div>

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
                        {...register("password")}
                        autoComplete="false"
                    />
                    {errors.password && <p className="text-red-400  text-sm mt-1">{errors.password.message}</p>}

                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300 "
                    disabled={isLoading}

                >
                    {isLoading ? <Loader /> : "Submit"}
                </button>
            </form>

            <p className="mt-4 text-gray-700 dark:text-dark-text text-center">OR</p>
            <GoogleLogin />

            <p className="mt-10 text-gray-700 dark:text-dark-text text-center">
                Already have an account? <Link to="/login" className="text-teal-500 hover:underline">Login</Link>
            </p>
        </div>



    );
};

export default SignUp;


