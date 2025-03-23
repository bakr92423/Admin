import React, { useEffect } from 'react'
import './App.css';
import Outlit from './Components/Layout/Outlit';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddCategory from './Components/Pages/Detiles/AddCategory';
import UpdateCategory from './Components/Pages/UpdateCategory';
import DeleteCategory from './Components/Pages/DeleteCategory';
import AddMale from './Components/Pages/AddMeal';
import axios from 'axios';
import UpdateMale from './Components/Pages/UpdateMale';
import DeleteMale from './Components/Pages/DeleteMale';
import User from './Components/Pages/User';


const App = () => {

  async function  getData(){
      const {data}= await axios.get('https://mune-node-bakr92423s-projects.vercel.app/api/category')
      console.log(data)
      

  }
  useEffect(()=>{
    getData()

  },[])

  const Root= createBrowserRouter([{path:'/',element:<Outlit />,children:[
    {index:true,element:<User/>},
    {path:'/addCategory',element:<AddCategory />},
    {path:'/updateCategory',element:<UpdateCategory />},
    {path:'/deleteCategory',element:<DeleteCategory />},
    {path:'/addMeal',element:<AddMale />},
    {path:'/updateMale',element:<UpdateMale />},
    {path:'/deleteMale',element:<DeleteMale />},

  ]}])
  return (
    
    <div >
      <RouterProvider router={Root} ></RouterProvider>
      
    </div>
  )
}

export default App

