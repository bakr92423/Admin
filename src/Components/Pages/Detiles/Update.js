import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Update = () => {

  const [category,setCategory]=useState('')
  const [newName,setnewName]=useState('')
  const [selectValue,setSelectValue]=useState([])

  

  useEffect(()=>{
    const showData= async()=>{
      const res = await axios.get("https://mune-node-bakr92423s-projects.vercel.app/api/category");
        const getData = res.data.data;
  
        setSelectValue(getData);
   }
    
  
    showData()
  },[])



  const handileUpdate= async()=>{

    const res = await axios.get(`https://mune-node-bakr92423s-projects.vercel.app/api/category?keyWord=${category}` ,{
      params: { name: category },
    });

    const catData=res.data.data
    

    
     
     
    if (catData[0].name!==category) {
      alert("🚫 لم يتم العثور على الوجبة!");
      return;
    }

  const catId=catData[0]._id
 

  const updateData={
    name:newName || catData[0].name

  }

  const updated= await axios.patch(`https://mune-node-bakr92423s-projects.vercel.app/api/category/${catId}`,updateData)

  console.log(updated.data.data);
  

  
}


  return (
    <div className='col-10 update'>
        <form className='search-form d-flex flex-column  '>
          <p className='title'>تعديل فئة</p>
        <div className='search-box my-5 '>
        <p className='text-center px-4 lable '>اسم الفئة المراد تعديلها</p>
          <select  className='text-center  select ' required value={category} onChange={(e)=>setCategory(e.target.value)} >
          <option value=""> اختر</option>
          {selectValue.map((item)=>{
            
            
            return(

              <option value={item.name}> {item.name}</option>
            )
          })}
            
          </select>
          <button className='btn btn-info mx-2 ' type='submit' >بحث</button>
          </div>
        <div className='update-box my-5'>
        <p className='text-center'>اسم الفئة الجديد</p>
          <input type='text' className='mx-2'required value={newName} min={3} minLength={3} onChange={(e)=>setnewName(e.target.value)} />
          <button className='btn btn-info  ' type='button' onClick={()=>handileUpdate()} >تعديل</button>
          </div>
        </form>
      
    </div>
  )
}

export default Update
