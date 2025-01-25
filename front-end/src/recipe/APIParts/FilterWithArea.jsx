import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Links from '../../components/Links';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { IoSearch } from 'react-icons/io5';
import { SearchContext } from '../context/SearchContext';

function FilterWithArea() {
    const { filterWithArea } = useParams();
    const [listedMeals, setListedMeals] = useState([]);
    const { searchedItemFromApi, setSearchedItemFromApi } = useContext(SearchContext)
    const [query, setQuery] = useState('')

    useEffect(() => {

        async function fetchMeals(areaName) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setListedMeals(result);
            } catch (error) {
                console.log('Fetch error:', error);
            }
        }
        fetchMeals(filterWithArea);
    }, [filterWithArea]);

    const handleSearchRecipe = async (e) => {
        let searched = e.target.value
        setQuery(searched)
        if (searched === '') {
            setSearchedItemFromApi([]);
            return;
        }
        if (searched.trim() !== '') {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searched}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setSearchedItemFromApi(result);
            } catch (error) {
                console.log('Fetch error:', error);
            }
        } else {
            setSearchedItemFromApi([])
        }

    }

    return (
        <>
            <div className='relative w-[40rem] mt-[1rem] mx-auto'>
                <Input className='py-2 px-4 bg-zinc-800 outline-none rounded-md text-xl' name='query' type="text" placeholder={`Search ${filterWithArea} items and others here...`} value={query} onChange={(e) => handleSearchRecipe(e)} icon={<IoSearch />} />
            </div>
            {searchedItemFromApi.meals !== null ? (
                searchedItemFromApi.length !== 0 ? (
                    <ul className='ul p-4'>
                        {searchedItemFromApi.meals.map((meal) => {
                            return (
                                <li key={meal.idMeal} className='bg-[#e9805c3b] rounded-md flex flex-col'>
                                    <div>
                                        <div><img src={meal.strMealThumb} className='w-full aspect-square object-cover rounded-lg' alt="img" /></div>
                                    </div>
                                    <div className='p-2 mt-4'>
                                        <h1 className='text-stone-200 text-2xl text-center font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{meal.strMeal}</h1>
                                        <div className='text-center my-4'>
                                            <Links path={`/view-recipe/${meal.idMeal}`}>
                                                <Button btnStyle={'py-2 px-8 w-full bg-[#ff4000] text-stone-100 rounded-full text-center hover:bg-[#ff7034]'}>Recipe</Button>
                                            </Links>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    listedMeals.meals ? (
                        listedMeals.meals.length !== 0 ? (
                            <ul className='ul p-4'>
                                {listedMeals.meals.map((meal) => {
                                    return (
                                        <li key={meal.idMeal} className='bg-[#e9805c3b] rounded-md flex flex-col'>
                                            <div>
                                                <div><img src={meal.strMealThumb} className='w-full aspect-square object-cover rounded-lg' alt="img" /></div>
                                            </div>
                                            <div className='p-2 mt-4'>
                                                <h1 className='text-stone-200 text-2xl text-center font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{meal.strMeal}</h1>
                                                <div className='text-center my-4'>
                                                    <Links path={`/view-recipe/${meal.idMeal}`}>
                                                        <Button btnStyle={'py-2 px-8 w-full bg-[#ff4000] text-stone-100 rounded-full text-center hover:bg-[#ff7034]'}>Recipe</Button>
                                                    </Links>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <div>No Items..</div>
                        )
                    ) : (
                        <div className='absolute top-1/2 left-1/2 translate-[-50%]'>
                            <div className="w-16 border-[8px] border-[#f3f3f3] rounded-full border-t-[#ff4d00] h-16 animate-spin"></div>
                        </div>
                    )
                )
            ) : (
                <div className='absolute top-1/2 left-1/2 translate-[-50%]'>
                    <div className='text-3xl'>No Meal Found</div>
                </div>

            )}
            {/* {listedMeals.meals ? (
                listedMeals.meals.length !== 0 ? (
                    <ul className='ul p-4'>
                        {listedMeals.meals.map((meal) => {
                            return (
                                <li key={meal.idMeal} className='bg-[#e9805c3b] rounded-md flex flex-col'>
                                    <div>
                                        <div><img src={meal.strMealThumb} className='w-full aspect-square object-cover rounded-lg' alt="img" /></div>
                                    </div>
                                    <div className='p-2 mt-4'>
                                        <h1 className='text-stone-200 text-2xl text-center font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{meal.strMeal}</h1>
                                        <div className='text-center my-4'>
                                            <Links path={`/view-recipe/${meal.idMeal}`}>
                                                <Button btnStyle={'py-2 px-8 w-full bg-[#ff4000] text-stone-100 rounded-full text-center hover:bg-[#ff7034]'}>Recipe</Button>
                                            </Links>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <div>No Items..</div>
                )
            ) : (
                <div className='absolute top-1/2 left-1/2 translate-[-50%]'>
                    <div className="w-16 border-[8px] border-[#f3f3f3] rounded-full border-t-[#ff4d00] h-16 animate-spin"></div>
                </div>
            )} */}
        </>
    )
}

export default FilterWithArea