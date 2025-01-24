import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewRecipe } from '../allapi';

function ViewRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await viewRecipe(id);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);


    return (
        <>
            <div>
                {recipe ? (
                    <div className={'relative max-h-max w-full'}>
                        <div
                            className="absolute inset-0 bg-cover h-full bg-no-repeat bg-center opacity-40"
                            style={{ backgroundImage: `url(data:image/jpeg;base64,${recipe.image})` }}
                        ></div>
                        <div className='relative z-10 flex gap-4 w-full p-8 justify-between text-white'>
                            <div className=''>
                                <h1 className='text-[4rem] font-bold'>{recipe.recipeName}</h1>
                                <p>{recipe.description}</p>
                                <p className='text-xl'>Meal Type: <strong>{recipe.mealType}</strong></p>
                                <ul className='mt-4 border-2 border-[#ff4d00] rounded-md p-4 w-full'>
                                    <h1 className='text-2xl font-bold mb-2'>Requirement Ingredients</h1>
                                    {recipe.ingredients.map((ingredient, i) => (
                                        <li key={i} className='flex gap-2 text-xl'>
                                            <p>{i + 1})</p>
                                            <p>{ingredient}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul className='mt-4 border-2 border-[#ff4d00] rounded-md p-4 w-full'>
                                    <h1 className='text-2xl font-bold mb-2'>Steps Involved</h1>
                                    {recipe.steps.map((step) => (
                                        <li key={step.stepNo} className='flex gap-2 text-xl'>
                                            <p>{step.stepNo})</p>
                                            <p className='text-justify'>{step.instruction}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                {/* <img src={`data:image/jpeg;base64,${recipe.image}`} className='w-[28rem] z-10 opacity-100 aspect-square object-cover rounded-lg' alt="" /> */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading..</div>
                )}
            </div>
        </>
    )
}

export default ViewRecipe