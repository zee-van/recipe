import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewRecipe } from '../allapi';

function ViewRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [apiRecipe, setApiRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async (id) => {
            try {
                if (id.length < 10) {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setApiRecipe(result.meals);
                } else {
                    try {
                        const response = await viewRecipe(id);
                        setRecipe(response.data);
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }

        };
        fetchRecipe(id);
    }, [id]);


    return (
        <>
            <div>
                {recipe ? (
                    <div className={'relative max-h-max w-full'}>
                        <div
                            className="absolute inset-0 bg-cover h-full bg-no-repeat bg-center opacity-40"
                            style={{ backgroundImage: recipe.image ? `url(data:image/jpeg;base64,${recipe.image})` : '' }}
                        ></div>
                        <div className='relative z-10 flex gap-4 w-full p-8 justify-between text-white'>
                            <div className=''>
                                <h1 className='text-[4rem] font-bold'>{recipe.recipeName}</h1>
                                <p>{recipe.description}</p>
                                <p className='text-xl'>Meal Type: <strong>{recipe.mealType}</strong></p>
                                <ul className='mt-4 border-2 border-[#ff4d00] rounded-md p-4 w-full'>
                                    <h1 className='text-2xl font-bold mb-2'>Required Ingredients</h1>
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
                        </div>
                    </div>
                ) : (
                    apiRecipe ? (
                        apiRecipe.map((recipe) => {
                            return (
                                <div key={recipe.idMeal} className={'relative max-h-max w-full'}>
                                    <div
                                        className="absolute inset-0 bg-cover h-full bg-no-repeat bg-center opacity-40"
                                        style={{ backgroundImage: `url(${recipe.strMealThumb})` }}
                                    ></div>
                                    <div className='relative z-10 flex flex-col gap-4 w-full p-8 justify-between text-white'>
                                        <div className='flex flex-col gap-4 w-full'>
                                            <div className=''>
                                                <h1 className='text-[4rem] font-bold'>{recipe.strMeal}</h1>
                                                <p className='text-xl'>Meal Type: <strong>{recipe.strCategory}</strong></p>
                                            </div>
                                            <div className=''>
                                                <h1 className='text-2xl font-bold mb-2'>Steps Involved</h1>
                                                <p className='text-xl text-justify'>{recipe.strInstructions}</p>
                                            </div>
                                            <div className='mt-4 border-2 border-[#ff4d00] rounded-md p-4 w-full'>
                                                <h1 className='text-2xl font-bold mb-4'>Required Ingredients With Measure</h1>
                                                <ul className='ul'>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strIngredient1}</p>
                                                        <p className=''>{recipe.strMeasure1}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure2}</p>
                                                        <p>{recipe.strIngredient2}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure3}</p>
                                                        <p>{recipe.strIngredient3}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure4}</p>
                                                        <p>{recipe.strIngredient4}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure5}</p>
                                                        <p>{recipe.strIngredient5}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure6}</p>
                                                        <p>{recipe.strIngredient6}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure7}</p>
                                                        <p>{recipe.strIngredient7}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure8}</p>
                                                        <p>{recipe.strIngredient8}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure9}</p>
                                                        <p>{recipe.strIngredient9}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure10}</p>
                                                        <p>{recipe.strIngredient10}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure11}</p>
                                                        <p>{recipe.strIngredient11}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure12}</p>
                                                        <p>{recipe.strIngredient12}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure13}</p>
                                                        <p>{recipe.strIngredient13}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure14}</p>
                                                        <p>{recipe.strIngredient14}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure15}</p>
                                                        <p>{recipe.strIngredient15}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure16}</p>
                                                        <p>{recipe.strIngredient16}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure17}</p>
                                                        <p>{recipe.strIngredient17}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure18}</p>
                                                        <p>{recipe.strIngredient18}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure19}</p>
                                                        <p>{recipe.strIngredient19}</p>
                                                    </li>
                                                    <li className='p-2 flex gap-2 rounded-md items-baseline'>
                                                        <p className='font-bold text-2xl'>{recipe.strMeasure20}</p>
                                                        <p>{recipe.strIngredient20}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    ) : (
                        <div className='absolute top-1/2 left-1/2 translate-[-50%]'>
                            <div className="w-16 border-[8px] border-[#f3f3f3] rounded-full border-t-[#ff4d00] h-16 animate-spin"></div>
                        </div>
                    )

                )}
            </div>
        </>
    )
}

export default ViewRecipe