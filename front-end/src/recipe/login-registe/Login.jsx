import React, { useRef, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Links from '../../components/Links';
import { IoIosClose } from 'react-icons/io';
import { useCookies } from 'react-cookie'
import { loginUser } from '../allapi';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


function Login() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const isUser = cookies.token ? true : false;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const loginModal = useRef();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = async () => {
        setError('');
        if (!email || !password) {
            setError("Please input the value.")
            return;
        } else if (!emailRegex.test(email)) {
            setError("Invalid email")
            return;
        }
        try {
            const data = await loginUser({
                email,
                password
            })
            if (data.data === 'Incorrect email or password' || data.data === 'Not found') {
                setError(data.data);
            } else {
                loginModal.current.open();
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleCloseLoginModel() {
        loginModal.current.close();
        navigate('/')
    }


    return (
        <>
            <Modal ref={loginModal}>
                <div className='w-full p-4 relative'>
                    <h1 className='text-xl mt-2 text-stone-300'>Your have logged in.</h1>
                    <div className='flex justify-end mt-6'>
                        <Button handleOnClick={handleCloseLoginModel}>Close</Button>
                    </div>
                </div>
            </Modal>
            <div className='w-full h-full mt-4 flex justify-center items-center'>
                <form className='p-4 w-[30rem] bg-zinc-900 border-2 border-[#ff4d00] rounded-md relative' onSubmit={(e) => e.preventDefault()}>
                    <Links path='/'>
                        <span className='text-stone-200 bg-[#ff4d00] rounded-md text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </Links>
                    <h1 className='text-2xl text-center text-stone-300 font-bold'>Login</h1>
                    <div className='mt-8 flex flex-col gap-4 justify-center'>
                        <span className='text-red-600'>{error}</span>
                        <Input label="Email" type='text' icon={<MdEmail />} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type='text' icon={<FaLock />} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <Links path={isUser ? `/` : `/login`} title='Login' handleOnClick={handleLogin} style='py-2 px-4 uppercase text-center bg-[#ff4d00] hover:bg-[#ff7034] rounded-md'></Links>
                        <div className='flex justify-center items-center text-stone-300'>
                            <p>Don't have an account?</p>
                            <Links path='/register' title='Register' style='text-[#ff4d00] transition-all px-2 text-xl hover:scale-110 font-bold'></Links>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login