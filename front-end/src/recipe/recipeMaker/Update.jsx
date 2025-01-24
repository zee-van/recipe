import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateRecipe, viewRecipe } from '../allapi';
import Input from '../../components/Input';
import Links from '../../components/Links';
import Button from '../../components/Button';
import { TiArrowSortedDown } from 'react-icons/ti';
import { IoIosClose } from 'react-icons/io';
import Modal from '../modal/Modal';


function Update() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [steps, setSteps] = useState([{ stepNo: 1, instruction: '' }]);
    const [recipeName, setRecipeName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [mealType, setMealType] = useState('')
    const [ingredients, setIngredients] = useState('')
    const updateModal = useRef();


    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index].instruction = event.target.value;
        setSteps(newSteps);
    }

    const addStep = () => {
        setSteps([...steps, { stepNo: steps.length + 1, instruction: '' }]);
    }

    const removeStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        const updatedSteps = newSteps.map((step, i) => ({
            ...step,
            stepNo: i + 1,
        }));
        setSteps(updatedSteps);
    };

    function splitIngredients(event) {
        const newIngredients = event.target.value;
        const updatedIngredients = newIngredients.split(',').map(ingredient => ingredient.trim());
        setIngredients(updatedIngredients)
    }

    const handleUpdateRecipe = async (id) => {
        try {
            const update = await updateRecipe(id, {
                recipeName,
                steps,
                description,
                image,
                mealType,
                ingredients
            })
            updateModal.current.open();
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseUpdateModal = () => {
        updateModal.current.close();
    }

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await viewRecipe(id);
                setRecipe(response.data);
                setRecipeName(response.data.recipeName)
                setIngredients(response.data.ingredients)
                setMealType(response.data.mealType)
                setSteps(response.data.steps)
                setDescription(response.data.description)
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);


    return (
        <>
            <Modal ref={updateModal}>
                <div className='w-full px-4 relative h-40 grid place-items-center'>
                    <h1 className='text-xl text-stone-300'>{!image && !recipeName && !description && !steps && !ingredients && !mealType ? `You haven't update your recipe.` : `Updated Successfully.`}</h1>
                    <button onClick={handleCloseUpdateModal} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <div>
                {recipe ? (
                    <div className={'relative h-auto w-full'}>
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: `url(data:image/jpeg;base64,${recipe.image})` }}
                        ></div>
                        <div className='relative z-10 flex p-12 justify-between text-white'>
                            <div className='text-center'>
                                <h1 className='text-[4rem] font-bold'>{recipe.recipeName}</h1>
                                <p>{recipe.description}</p>
                                <p className='text-xl'>Meal Type: <strong>{recipe.mealType}</strong></p>
                                <ul className='mt-4 border-2 border-[#ff4d00] rounded-md p-4 md:w-[28rem]'>
                                    <h1 className='text-2xl font-bold'>Requirement Ingredients</h1>
                                    {recipe.ingredients.map((ingredient, i) => (
                                        <li key={i} className='flex gap-2 text-xl'>
                                            <p>{i + 1})</p>
                                            <p>{ingredient}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul className='mt-4 border-2 border-[#ff4d00] rounded-md p-4 md:w-[28rem]'>
                                    <h1 className='text-2xl font-bold'>Steps Involved</h1>
                                    {recipe.steps.map((step) => (
                                        <li key={step.stepNo} className='flex gap-2 text-xl'>
                                            <p>{step.stepNo})</p>
                                            <p>{step.instruction}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <form method='post' onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' className='flex justify-center backdrop-blur-sm gap-4 p-4'>
                                <div className='flex flex-col w-[35rem] relative justify-center text-stone-400 gap-4 p-4 border-2 bg-zinc-900 border-[#ff4d00] rounded-md'>
                                    <Links path={'/users-recipe'}>
                                        <span className='text-stone-200 text-3xl bg-[#ff4d00] rounded-md absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                                    </Links>
                                    <h1 className='text-3xl font-bold'>Update your Recipe here</h1>
                                    <Input label={'Recipe Name'} id={'recipeName'} value={recipeName} type='text' onChange={(e) => setRecipeName(e.target.value)} />
                                    <Input label={'Upload Image'} id={'image'} type='file' accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                    <div className='p-2 border-[1px] border-black rounded-sm'>
                                        <div className='flex justify-between mt-2'>
                                            <p className='uppercase'>Steps Involved For Recipe</p>
                                            <div className='flex gap-4'>
                                                <Button handleOnClick={() => removeStep(steps.length - 1)}>-</Button>
                                                <Button handleOnClick={addStep}>+</Button>
                                            </div>
                                        </div>
                                        {steps.map((step, index) => (
                                            <div key={index}>
                                                <Input label={`Step ${index + 1}`} value={step.instruction} id={'steps'} type='text' onChange={(e) => handleStepChange(index, e)} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='relative flex flex-col'>
                                        <p className='uppercase mb-1'>Select Meal Type</p>
                                        <select name="category" onChange={(e) => setMealType(e.target.value)} className='cursor-pointer py-2 px-4 text-stone-200 outline-none appearance-none rounded-md bg-zinc-800'>
                                            <option value={'Breakfast'}>Breakfast</option>
                                            <option value={'Lunch'}>Lunch</option>
                                            <option value={'Dinner'}>Dinner</option>
                                            <option value={'Snack'}>Snack</option>
                                        </select>
                                        <span className='text-stone-200 text-xl absolute top-7 right-0 p-3'><TiArrowSortedDown /></span>
                                    </div>
                                    <Input title={'textarea'} label={'Ingrediants'} value={ingredients} placeholder='Ingrediants must be separated by comma...' id={'ingrediants'} type='text' onChange={(e) => splitIngredients(e)} />
                                    <Input title={'textarea'} label={'Description (optional)'} value={description} id={'description'} type='text' onChange={(e) => setDescription(e.target.value)} />
                                    <div className='flex gap-4'>
                                        <Button handleOnClick={() => handleUpdateRecipe(id)}>Update</Button>
                                        <Links path={'/users-recipe'}>
                                            <Button>Cancel</Button>
                                        </Links>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div>Loading..</div>
                )}
            </div>
        </>
    )
}

export default Update