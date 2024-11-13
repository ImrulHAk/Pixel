import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";
import ErrorIcon from '@mui/icons-material/Error';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
    const auth = getAuth();
    let [email, setEmail] = useState("")
    let [emailerr, setEmailerr] = useState("")

    let handleForgetPassword = (e) => {
        e.preventDefault()
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailerr("Invalid email")
          }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Reset mail send")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-extrabold text-[#03014C]"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        PIXEL
                    </a>
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-[#03014C]">
                            Forgot your password?
                        </h1>
                        <p className="font-light text-gray-500 dark:text-gray-400">
                            Don't fret! Just type in your email and we will send you a code to reset
                            your password!
                        </p>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            {emailerr && <p className='text-red-600 flex items-center gap-1'><ErrorIcon fontSize='small' />{emailerr}</p>}
                            {email ? (<Button className='text-white font-normal rounded-lg text-sm px-5 py-2.5 text-center w-full bg-[#4E1CFF] normal-case ' onClick={handleForgetPassword} >Reset Password</Button>) :
                                (<Button className='text-white font-normal rounded-lg text-sm px-5 py-2.5 text-center w-full bg-[#4E1CFF] normal-case ' disabled onClick={handleForgetPassword} >Reset Password</Button>)}
                        </form>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ForgetPassword