import React, { useEffect, useState } from 'react'
import Side from '../Layout/Side'
import axios from 'axios'

const DeleteMale = () => {
  const [male,setMale]=useState([])
  const [valueMeal,setValueMeal]=useState('')

  const showMeal= async ()=>{

    const res= await axios.get(`https://mune-node-bakr92423s-projects.vercel.app/api/meal`)
    const resGetMeal=res.data.data
    setMale(resGetMeal)
    }

  useEffect(()=>{
 

  showMeal()
  
  },[])

  const handilDelete = async(e)=>{
    e.preventDefault()


    const getId= await axios.get(`https://mune-node-bakr92423s-projects.vercel.app/api/meal?keyWord=${valueMeal}`);

    const idMeal=getId.data.data[0]._id
    
    if(idMeal){
      
      try{
        await axios.delete(`https://mune-node-bakr92423s-projects.vercel.app/api/meal/${idMeal}`)
      alert('تم حذف الوجبة بنجاح')
      setValueMeal(' ')
      showMeal()
      }catch(error){
        console.log(error);
        
        
      }

    }else{
      alert('لم يتم العثور علي الوجبة')
    }
  
  }
  console.log('valueMeal',valueMeal);
  

  return (
    <div className='row'>
      <Side/>

<div className='col-10 update d-flex justify-content-center align-items-center '>
    <form className='search-form d-flex flex-column text-center row-form  ' onSubmit={()=>handilDelete()} >
      <p className='title'>حذف وجبة</p>
   
    <div className='update-box my-5'>
    <p className='text-center center '>اسم الوجبة المطلوب حذفها</p>
      <select className='text-center   select ' required value={valueMeal} onChange={(e)=>setValueMeal(e.target.value)} >
        {male.map((item,id)=>{
          return(
            <option key={id} value={item.id} >{item.name}</option>

          )
        })}

      </select>
      <button className='btn btn-info mx-2  ' type='button'  >حذف</button>
      </div>
    </form>
  
</div>
      
    </div>
  )
}

export default DeleteMale
