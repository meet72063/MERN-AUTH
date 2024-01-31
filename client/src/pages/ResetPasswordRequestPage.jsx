import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { requestResetPasswordLink } from '../features/auth/authThunk'
import useErrorHandler from '../hooks/useErrorHandler'
import { toast } from 'react-toastify'

const ResetPasswordRequest = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [email, setEmail] = useState(null)
    const { error, handleError } = useErrorHandler()
    const schema = Yup.object({
        email: Yup.string().email("wrong email format").required("email is required")
    })

    const { handleSubmit, register, formState: { errors }, } = useForm({
        defaultValues: {
            email: ""
        },
        resolver: yupResolver(schema)
    })


    const dispatch = useDispatch()
    const onSubmit = (data) => {
        setEmail(data.email)
        requestResetPasswordLink(data)
            .then((res) => {
                toast.success(res.data.message)
                setIsSubmit(true)
            })
            .catch(handleError)
    }



    return (
        <div className='grid place-content-center py-10 space-y-4 px-3'  >
            {!isSubmit ? <div>
                <h2 className='font-serif text-lg'> We will send a reset link to  your email  </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-dark-text">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='enter your registered Email'
                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:border-teal-500 dark:bg-dark-bg  dark:text-dark-text"
                            {...register("email")}

                        />
                        {errors.email && <p className="text-red-400  text-sm mt-1">{errors.email.message}</p>}
                    </div>


                    <button
                        type="submit"
                        className="w-fit px-10 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300 "

                    >
                        Send
                    </button>
                </form>
            </div> :
                <div className="text-center mt-8">
                    <p className="text-lg  font-serif">
                        A reset link has been sent to your email
                    </p>
                    <p className="text-teal-500 text-lg font-serif my-4">
                        {email} amitpardhan589@gmail.com
                    </p>
                    <p className=" mt-2">
                        It can take up to 20 minutes to receive our email
                    </p>
                    <p className="mt-2 ">
                        Note: <b className=''>You have 15 minutes to reset your password</b>
                    </p>
                </div>}




        </div>
    )
}

export default ResetPasswordRequest
