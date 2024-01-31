import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../features/auth/authThunk'

const ResetPassword = () => {
    const { token } = useParams();


    const schema = Yup.object({
        newPassword: Yup.string()
            .min(6, "password must be atleast 6 characters")
            .required("password is required"),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })

    const { handleSubmit, register, formState: { errors }, } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
        resolver: yupResolver(schema)
    })




    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const { newPassword } = data
        await resetPassword({ newPassword, token }, navigate)
    }

    if (!token) {
        return <Navigate to='/login' replace />
    }

    return (
        <div className='grid place-content-center p-10 space-y-5'>
            <h2 className='text-xl font-serif'>Reset your Password</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block  font-medium text-gray-700 dark:text-dark-text">Enter your new password</label>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder='enter new password'
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-teal-500 dark:bg-dark-bg  dark:text-dark-text"
                        {...register("newPassword")}

                    />
                    {errors.newPassword && <p className="text-red-400  text-sm mt-1">{errors.newPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block  font-medium text-gray-700 dark:text-dark-text">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder='enter new password'
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-teal-500 dark:bg-dark-bg  dark:text-dark-text"
                        {...register("confirmPassword")}

                    />
                    {errors.confirmPassword && <p className="text-red-400  text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>


                <button
                    type="submit"
                    className="w-fit px-10 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300 "

                >
                    Reset
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
