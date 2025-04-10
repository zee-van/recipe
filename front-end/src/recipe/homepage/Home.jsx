import React, { useContext, useEffect, useState } from 'react'
import { allRecipeLists } from '../allapi';
import Links from '../../components/Links';
import Button from '../../components/Button';
import { SearchContext } from '../context/SearchContext';

function Home() {
  const [listedRecipe, setListedRecipe] = useState([]);
  const { searchedItem } = useContext(SearchContext);

  const handleListedRecipe = async () => {
    try {
      const recipe = await allRecipeLists();
      setListedRecipe(recipe)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleListedRecipe();
  }, [])
  return (
    <>
      {searchedItem.length === 0 ? (
        <ul className='ul p-4'>
          {listedRecipe.data ? (
            listedRecipe.data.map((item) => {
              return (
                <li key={item._id} className='bg-[#e9805c3b] rounded-md flex flex-col'>
                  <div>
                    <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-lg' alt="img" /></div>
                  </div>
                  <div className='p-2 mt-4'>
                    <h1 className='text-stone-200 text-2xl text-center font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{item.recipeName}</h1>
                    <div className='text-center my-4'>
                      <Links path={`/view-recipe/${item._id}`}>
                        <Button btnStyle={'py-2 px-8 w-full bg-[#ff4000] text-stone-100 rounded-full text-center hover:bg-[#ff7034]'}>Recipe</Button>
                      </Links>
                    </div>
                    <div>
                    </div>
                  </div>
                </li>
              )
            })
          ) : (
            <div className='absolute top-1/2 left-1/2 translate-[-50%]'>
              <div className="w-16 border-[8px] border-[#f3f3f3] rounded-full border-t-[#ff4d00] h-16 animate-spin"></div>
            </div>
          )}
        </ul>
      ) : (
        searchedItem ? (
          <ul className='ul p-4'>
            {searchedItem.map((item) => {
              return (
                <li key={item._id} className='bg-[#e9805c3b] rounded-md flex flex-col'>
                  <div>
                    <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-lg' alt="img" /></div>
                  </div>
                  <div className='p-2 mt-4'>
                    <h1 className='text-stone-200 text-2xl text-center font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{item.recipeName}</h1>
                    <div className='text-center my-4'>
                      <Links path={`/view-recipe/${item._id}`}>
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
          <div className='absolute top-1/2 left-1/2 translate-[-50%]'>
            <div className="w-16 border-[8px] border-[#f3f3f3] rounded-full border-t-[#ff4d00] h-16 animate-spin"></div>
          </div>
        )

      )}
    </>
  )
}

export default Home