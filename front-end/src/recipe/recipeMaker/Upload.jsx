import React, { useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import Links from '../../components/Links'
import Input from '../../components/Input'
import Button from '../../components/Button';
import { uploadRecipe } from '../allapi';
import { TiArrowSortedDown } from 'react-icons/ti'
import Modal from '../modal/Modal';


function Upload() {
    const [steps, setSteps] = useState([{ stepNo: 1, instruction: '' }]);
    const [recipeName, setRecipeName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [mealType, setMealType] = useState('Breakfast')
    const [ingredients, setIngredients] = useState([])
    const [error, setError] = useState('');
    const uploadModal = useRef();

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

    const handleInputValiate = () => {
        setError('');
        if (recipeName === '' || !image || (steps.length === 1 && steps[0].instruction === '') || ingredients.length === 0) {
            setError("Please provide value for all input fields");
            return false;
        } else {
            return true;
        }
    }

    const uploadedItem = async (e) => {
        try {
            const uploadedSucces = await uploadRecipe({
                recipeName,
                steps,
                description,
                image,
                mealType,
                ingredients
            })
            uploadModal.current.open();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal ref={uploadModal}>
                <div className='w-full px-4 relative h-40 grid place-items-center'>
                    <h1 className='text-xl text-stone-300'>Uploaded Successfully.</h1>
                </div>
            </Modal>
            <form method='post' onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' className='flex justify-center gap-4 p-4'>
                <div className='flex flex-col w-[45rem] relative justify-center text-stone-400 gap-4 p-4 bg-zinc-900 border-2 border-[#ff4d00] rounded-md'>
                    <Links path={'/'}>
                        <span className='text-stone-200 text-3xl bg-[#ff4d00] rounded-md absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </Links>
                    <h1 className='text-3xl font-bold'>Upload your Recipe here</h1>
                    <span className='text-red-600'>{error}</span>
                    <Input label={'Recipe Name'} id={'recipeName'} type='text' onChange={(e) => setRecipeName(e.target.value)} />
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
                                <Input label={`Step ${index + 1}`} id={'steps'} type='text' onChange={(e) => handleStepChange(index, e)} />
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
                    <Input title={'textarea'} label={'Ingrediants'} placeholder='Ingrediants must be separated by comma...' id={'ingrediants'} type='text' onChange={(e) => splitIngredients(e)} />
                    <Input title={'textarea'} label={'Description (optional)'} id={'description'} type='text' onChange={(e) => setDescription(e.target.value)} />
                    <div className='flex gap-4'>
                        <Button handleOnClick={() => { if (handleInputValiate()) { uploadedItem() } }}>Upload</Button>
                        <Links path={'/'}>
                            <Button>Cancel</Button>
                        </Links>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Upload