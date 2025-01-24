import React, { useContext, useEffect, useState } from 'react'
import Links from '../../components/Links'
import { CiSearch } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { useCookies } from 'react-cookie'
import { IoIosClose } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import defaultProfile from '../../assets/images/defaultProfile.webp'
import { FaUser } from "react-icons/fa6";
import { recipeMakersDetails, searchedRecipe } from '../allapi';
import { SearchContext } from '../context/SearchContext';
import Button from '../../components/Button';
import Logo from '../../assets/images/logo.png'
import Input from '../../components/Input';




function Navbar() {
    const [me, setMe] = useState({});
    const { setSearchedItem } = useContext(SearchContext)
    const [srchRecipe, setSrchRecipe] = useState([]);
    const [query, setQuery] = useState('')
    const location = useLocation();
    const [cookies] = useCookies(['token']);
    const isUser = cookies.token ? true : false;
    const [divStyle, setDivStyle] = useState('absolute my-2 mx-2 right-0 rounded-md bg-zinc-900 border-2 border-[#ff4d00] p-4 w-[20rem] z-50 hidden')

    function changeStyle() {
        setDivStyle('absolute right-0 rounded-md bg-zinc-900 border-2 border-[#ff4d00] my-2 mx-2 p-4 w-[20rem] z-50')
    }

    function closeStyle() {
        setDivStyle('absolute right-0 rounded-md bg-zinc-900 border-2 border-[#ff4d00] my-2 mx-2 p-4 w-[20rem] z-50 hidden')
    }

    const handleSearchRecipe = async (e) => {
        let searched = e.target.value
        setQuery(searched)
        if (searched === '') {
            setSearchedItem([]);
            return;
        }
        if (searched.trim() !== '') {
            try {
                const recipe = await searchedRecipe(searched);
                setSearchedItem(recipe.data)
                setSrchRecipe(recipe)
            } catch (error) {
                console.log(error)
            }
        } else {
            setSearchedItem([])
        }

    }


    async function handleProfile() {
        try {
            const newMe = await recipeMakersDetails();
            // console.log(newMe)
            setMe(newMe)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleProfile();
    }, [])
    return (
        <>
            <div className='py-2 px-8 bg-[#ff4d00] flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Links path='/'>
                        <div className='flex relative items-center uppercase cursor-pointer'>
                            <img src={Logo} alt="" className='w-20' />
                            <div className='flex items-center'>
                                <p className='font-bold text-3xl tracking-widest'>Easy</p>
                                <p className='font-[800]'>Meal</p>
                            </div>
                        </div>
                    </Links>
                </div>
                <div className='flex gap-8 items-center'>
                    <div>
                        <div className='relative'>
                            <Input className='w-[40rem] py-2 px-4 bg-zinc-800 outline-none rounded-md text-xl' name='query' type="text" placeholder='Search...' icon={<IoSearch />} value={query} onChange={(e) => handleSearchRecipe(e)} />
                        </div>
                        {(location.pathname !== '/' && query.trim() !== '' && srchRecipe.length !== 0) && (
                            <ul className='sline-in absolute z-30 mt-8 border-2 w-[40rem] p-4 bg-zinc-900 rounded-md border-[#ff4d00] flex flex-col justify-center'>
                                {srchRecipe.data ? (
                                    srchRecipe.data.map((recipe) => {
                                        // console.log(recipe)
                                        return (
                                            <li key={recipe._id} className='mt-2'>
                                                <Links handleOnClick={() => setSrchRecipe([])} style='py-2 px-4 bg-zinc-800 flex items-center gap-8 rounded-full text-xl hover:bg-zinc-700' path={`/view-recipe/${recipe._id}`}>
                                                    <img src={`data:image/jpeg;base64,${recipe.image}`} alt="" className='w-16 rounded-full aspect-square object-cover' />
                                                    <p className='text-2xl font-bold'>{recipe.recipeName}</p>
                                                </Links>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <>
                                        <p className='text-2xl font-bold'>Loading..</p>
                                    </>
                                )
                                }
                                <Links path={'/'} style='flex justify-end mt-4'>
                                    <Button>View Results</Button>
                                </Links>
                            </ul>
                        )}

                    </div>
                    <div className='cursor-pointer flex h-20 items-center'>
                        <Links path={isUser ? (location.pathname === '/' ? '/' : location.pathname) : '/login'}>
                            {isUser && <img className='w-20 border-[1px] border-black aspect-square object-cover rounded-full' src={!me.data?.profilePic ? defaultProfile : `data:image/jpeg;base64,${me.data?.profilePic}`} alt="profile" onClick={isUser ? changeStyle : undefined} />}
                            {!isUser && <span className='text-3xl' ><FaUser /></span>}
                        </Links>
                    </div>
                </div>
            </div>
            <div className={divStyle} id='options'>
                <span className='absolute cursor-pointer top-0 right-0 bg-[#ff4d00] rounded-md text-3xl' onClick={closeStyle}><IoIosClose /></span>
                <div className='flex flex-col gap-4 mt-6'>
                    <Links style='py-2 px-4 bg-[#ff4d00] rounded-full text-xl hover:bg-[#ff7034]' path={'/users-recipe'} title='View Recipe' handleOnClick={closeStyle} />
                    <Links style='py-2 px-4 bg-[#ff4d00] rounded-full text-xl hover:bg-[#ff7034]' path={'/users-recipe-upload'} title='Upload Recipe' handleOnClick={closeStyle} />
                    <Links style='py-2 px-4 bg-[#ff4d00] rounded-full text-xl hover:bg-[#ff7034]' path={'/profile'} title='Profile' handleOnClick={closeStyle} />
                </div>
            </div>
        </>
    )
}

export default Navbar