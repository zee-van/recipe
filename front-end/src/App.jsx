import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './recipe/homepage/Home'
import Navbar from './recipe/navbar/Navbar'
import Login from './recipe/login-registe/Login'
import Register from './recipe/login-registe/Register'
import Users from './recipe/recipeMaker/Users'
import Upload from './recipe/recipeMaker/Upload'
import Profile from './recipe/recipeMaker/Profile'
import Update from './recipe/recipeMaker/Update'
import ViewRecipe from './recipe/users/ViewRecipe'
import { SearchProvider } from './recipe/context/SearchContext'
import FilterWithArea from './recipe/APIParts/FilterWithArea'
// import './App.css'

function App() {

  return (
    <>
      <SearchProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/users-recipe' element={<Users />} />
            <Route path='/users-recipe-upload' element={<Upload />} />
            <Route path='/users-recipe/:id' element={<Update />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/view-recipe/:id' element={<ViewRecipe />} />
            <Route path='/:filterWithArea' element={<FilterWithArea />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </>
  )
}

export default App
