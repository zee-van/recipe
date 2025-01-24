import React, { useEffect, useRef, useState } from 'react'
import { deleteRecipe, listedRecipes } from '../allapi';
import Button from '../../components/Button';
import Links from '../../components/Links';
import Modal from '../modal/Modal';

function Users() {
    const [listedRecipe, setListedRecipe] = useState([]);
    const [currentId, setCurrentId] = useState('')
    const deleteModal = useRef();

    const handleListedRecipe = async () => {
        try {
            const recipe = await listedRecipes();
            // console.log(recipe)
            setListedRecipe(recipe)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteRecipe = async (id) => {
        try {
            await deleteRecipe(id);
            handleListedRecipe();
            deleteModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }


    const handleDeleteModalOpen = (id) => {
        deleteModal.current.open();
        setCurrentId(id)
    }
    const handleDeleteModalClose = () => {
        deleteModal.current.close();
    }

    useEffect(() => {
        handleListedRecipe();
    }, [])
    return (
        <>
            <ul className='ul p-4'>
                {listedRecipe.data ? (
                    listedRecipe.data.length !== 0 ? (
                        listedRecipe.data.map((item) => {
                            return (
                                <li key={item._id} className='bg-[#e9805c3b] rounded-md flex flex-col'>
                                    <Modal ref={deleteModal}>
                                        <div className='p-4'>
                                            <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to Delete.</h1>
                                            <div className='mt-8 flex gap-4 justify-end'>
                                                <Button handleOnClick={() => handleDeleteRecipe(currentId)}>Yes</Button>
                                                <Button handleOnClick={handleDeleteModalClose}>No</Button>
                                            </div>
                                        </div>
                                    </Modal>
                                    <div>
                                        <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-lg' alt="img" /></div>
                                    </div>
                                    <div className='p-2 mt-4'>
                                        <h1 className='text-stone-200 text-2xl text-center font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{item.recipeName}</h1>
                                        <div className='text-center mt-4'>
                                            <Links path={`/view-recipe/${item._id}`}>
                                                <Button btnStyle={'py-2 px-8 w-full bg-[#ff4000] text-stone-100 rounded-full text-center hover:bg-[#ff7034]'}>Recipe</Button>
                                            </Links>
                                        </div>
                                        <div className='flex mt-4 justify-between'>
                                            <Links path={`/users-recipe/${item._id}`}>
                                                {/* <Button handleOnClick={() => handleUpdateProduct(item._id)}>Update</Button> */}
                                                <Button>Update</Button>
                                            </Links>
                                            <Button handleOnClick={() => handleDeleteModalOpen(item._id)}>Delete</Button>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </li>
                            )

                        })
                    ) : (
                        <div className='text-2xl text-stone-300 font-bold animate-pulse'>No Items...</div>

                    )

                ) : (
                    <div className='text-2xl text-stone-300 font-bold animate-pulse'>Fetching Meal...</div>
                )}

            </ul>
        </>
    )
}

export default Users