import React, { useRef, useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Modal from '../modal/Modal';
import Login from './Login';
import Links from '../../components/Links';
import { IoIosClose } from 'react-icons/io';
import { registerUser } from '../allapi';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [error, setError] = useState('');
    const [exist, setExist] = useState(false);
    const registerModal = useRef();
    const navigate = useNavigate()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validInput = () => {
        setError(''); // Clear previous error
        if (username === '' || email === '' || password === '') {
            setError("Please provide value for all input fields");
            return false;
        } else if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return false;
        } else if (password.trim().length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        } else if (password.trim() !== conformPassword.trim()) {
            setError("Passwords do not match");
            return false;
        } else {
            return true;
        }
    }

    async function userRegister() {
        try {
            const createUser = await registerUser({
                username,
                email,
                password,
                conformPassword,
            })
            if (createUser.data === 'Email is already exist') {
                setError("Email is already exist")
                setExist(false)
                return
            } else {
                setExist(true)
                registerModal.current.open();
                return
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleRegisterModalClose = () => {
        registerModal.current.close();
        navigate('/')
    }
    return (
        <>

            <Modal ref={registerModal}>
                <div className='w-full p-4 relative'>
                    <h1 className='text-xl mt-2 text-stone-300'>Your account has been registered.</h1>
                    <button onClick={handleRegisterModalClose} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <div className='w-full h-full mt-8 flex justify-center items-center'>
                <form className='p-4 w-[30rem] bg-zinc-900 border-2 border-[#ff4d00] rounded-md relative' onSubmit={(e) => e.preventDefault()}>
                    <Links path='/'>
                        <span className='text-stone-200 text-3xl bg-[#ff4d00] rounded-md absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </Links>
                    <h1 className='text-2xl text-center text-stone-300 font-bold'>Register</h1>
                    <div className='mt-8 flex flex-col gap-4 justify-center'>
                        <span className='text-red-600'>{error}</span>
                        <Input icon={<FaUser />} label="Username" type='text' id='username' onChange={(e) => setUsername(e.target.value)} />
                        <Input icon={<MdEmail />} label="Email" type='text' id='email' onChange={(e) => setEmail(e.target.value)} />
                        <Input icon={<FaLock />} label="Password" type='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                        <Input icon={<FaLock />} label="Conform Password" type='password' id='conformPassword' onChange={(e) => setConformPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col justify-center gap-4 mt-6'>
                        <Links path={exist ? '/' : '/register'} style='flex flex-col justify-center'>
                            <Button title='REGISTER' handleOnClick={() => {
                                if (validInput()) {
                                    userRegister();
                                }
                            }}></Button>
                        </Links>
                        <div className='flex justify-center items-center text-stone-300'>
                            <p>Already have an account?</p>
                            <Links path='/login' title='Login' style='text-[#ff4d00] transition-all px-2 text-xl hover:scale-110 font-bold'></Links>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register