import React, { useEffect, useRef, useState } from 'react'
import { editUsersProfile, logout, recipeMakersDetails } from '../allapi'
import { FaEdit } from "react-icons/fa";
import defaultProfile from '../../assets/images/defaultProfile.webp'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Modal from '../modal/Modal';


function Profile() {
    const [me, setMe] = useState({});
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [image, setImage] = useState();
    const editProfile = useRef();
    const logoutModal = useRef();
    const editProfileSuccess = useRef();
    const navigate = useNavigate();

    async function handleProfile() {
        try {
            const newMe = await recipeMakersDetails();
            // console.log(newMe)
            setMe(newMe)
            setUsername(newMe.data.username)
            setPassword(newMe.data.password)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleUpdateProfile() {
        try {
            const updated = await editUsersProfile({
                username,
                password,
                image,
            })
            // console.log(updated)
            editProfile.current.close();
            editProfileSuccess.current.open();
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogout() {
        try {
            await logout();
            navigate('/')
            logoutModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }
    function openModal() {
        editProfile.current.open();
    }
    function openLogoutModal() {
        logoutModal.current.open();
    }
    function closeLogoutModal() {
        logoutModal.current.close();
    }
    useEffect(() => {
        handleProfile();
    }, [])
    return (
        <>
            <Modal ref={editProfile}>
                <div className='flex justify-center items-center'>
                    <form method='post' onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' className='p-4 flex-col flex w-[30rem] gap-4 rounded-md relative'>
                        <h1 className='text-2xl font-bold text-stone-400 mb-2'>Update Your Profile</h1>
                        <Input type="text" label='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        {/* <Input type="password" label='Password' name='password' value={password.slice(0,8)} onChange={(e) => setPassword(e.target.value)} /> */}
                        <Input label='select image' type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        <div className='mt-4 flex flex-col justify-center'>
                            <Button handleOnClick={handleUpdateProfile}>Done</Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal ref={logoutModal}>
                <div className='p-4'>
                    <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to logout.</h1>
                    <div className='mt-8 flex gap-4 justify-end'>
                        <Button handleOnClick={() => handleLogout()}>Yes</Button>
                        <Button handleOnClick={closeLogoutModal}>No</Button>
                    </div>
                </div>
            </Modal>
            <Modal ref={editProfileSuccess}>
                <div className='p-4'>
                    <h1 className='text-xl mt-2 text-stone-300'>{!image && username === me.data?.username ? `No Changes.` : `Updated Successfully`}</h1>
                </div>
            </Modal>

            {me.data ? (
                <div className='flex justify-center my-[3rem] backdrop-blur-sm p-4 w-[35rem] mx-auto rounded-md'>
                    <div className='text-center'>
                        <div className='flex justify-center'>
                            <div className='relative'>
                                <img src={!me.data?.profilePic ? `${defaultProfile}` : `data:image/jpeg;base64,${me.data?.profilePic}`} className='w-32 border-[1px] border-black aspect-square object-cover rounded-full cursor-pointer' alt="img" />
                                <span className='text-xl absolute bottom-0 z-10 left-0 p-2 cursor-pointer bg-[#ff4d00] hover:bg-[#ff7034] opacity-90 rounded-full text-stone-300' onClick={openModal}><FaEdit /></span>
                            </div>
                        </div>
                        <div className='my-4'>
                            <p className='text-4xl font-bold mb-4'>{me.data?.username}</p>
                            <p className='text-xl'>{me.data?.email}</p>
                            <p>Registerd: {new Date(me.data?.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div>
                            <Button handleOnClick={openLogoutModal}>Logout</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default Profile