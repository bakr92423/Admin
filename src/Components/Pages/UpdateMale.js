import React, { useEffect, useState } from 'react'
import Side from '../Layout/Side'
import axios from 'axios'

const UpdateMale = () => {

  const [meal,setMeal]=useState([])
  const [searchmeal,setsearchmeal]=useState('')
  const [searchmealBtn,setsearchmealBtn]=useState(false)
  const [cat,setCat]=useState([])


  useEffect(()=>{

    const showMeal= async ()=>{

      const res= await axios.get(`https://mune-node-bakr92423s-projects.vercel.app/api/meal`)
      const resMeal=res.data.data
      setMeal(resMeal)
      
      
      
      
      
      
    }
    showMeal()

  },[])
  useEffect(()=>{

    const showMealseach = async () => {
      const res = await axios.get(
        `https://mune-node-bakr92423s-projects.vercel.app/api/meal?keyWord=${searchmeal}`
      );
      const resMealSearch = res.data.data[0];
  
      if (resMealSearch) {
        setsearchmeal({
          ...resMealSearch,
          category: resMealSearch.category?._id || "", // ✅ حفظ `_id` الخاص بالفئة
        });
      }
    };
    showMealseach()

    const showCategory= async()=>{
      const resCat = await axios.get("https://mune-node-bakr92423s-projects.vercel.app/api/category");
      setCat(resCat.data.data)
      // const privdCat = await axios.get(`https://mune-node-bakr92423s-projects.vercel.app/api/category?keyWord=${dataMeal.category}`);

      // console.log('privdCat',privdCat.data.data);
  
      
     
      

   }

   showCategory()

    

    
  if (searchmealBtn) {
    showMealseach();
    setsearchmealBtn(false);
  }

  },[searchmealBtn])

  const handelUpdate= async(e)=>{
    e.preventDefault()

    let urlImage=searchmeal.image

    if(searchmeal.image && typeof searchmeal.image !== "string"){
      const dataImage= new FormData()
      dataImage.append("image",searchmeal.image)
  
      const resImage= await axios.post(
        "https://mune-node-bakr92423s-projects.vercel.app/api/upload",
        dataImage,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
       urlImage=resImage.data.imageUrl 
    }

  
    let updateData={
      name:searchmeal.name,
      price:searchmeal.price,
      description:searchmeal.description,
      category:searchmeal.category,
      image:urlImage,
    }
    

    const newMeal= await axios.patch(
            `https://mune-node-bakr92423s-projects.vercel.app/api/meal/${searchmeal._id}`,
            updateData,
            { headers: { "Content-Type": "application/json" } }
          );
        
          setsearchmeal(
            {
              name:" ",
              price:" ",
              description:" ",
              category:" ",
              image:" ",
            }
          )
          
          
          

  }


  

  return (
    <div className='row'>
          <Side/>
          <div className='d-flex  col-8 parent-add justify-content-center align-items-center '>
          <form className='add-form row-form ' onSubmit={()=>handelUpdate()} >
             <div className='row d-flex justify-content-around align-items-around child-form ' >
          <h3 className='col-10 mt-3  text-center ' >تعديل وجبة</h3>
          <div  className='col-10 text-center  '>
         {/* <input type='search'  placeholder='اكتب اسم الوجبة هنا' className='text-center'   /> */}
         <select className='text-center select ' required  onChange={(e)=>setsearchmeal(e.target.value)} >
         
         <option value="" >اختر اسم الوجبه</option>
         
     
          {meal.map((item)=>{
            
            return(
              <option value={item.id} >{item.name}</option>

            )
          })}

         </select>
             <button className='btn btn-info mx-2' type='button' onClick={()=>setsearchmealBtn()}  >بحث</button>
               </div>
               <div  className='col-5'>
             <label>اسم الوجبة</label>
         <input type='text' required value={searchmeal.name} onChange={(e)=>setsearchmeal({...searchmeal,name:e.target.value})} />
               </div>
               <div className='col-5  '>
         <label>السعر</label>
         <input type='text' required value={searchmeal.price } onChange={(e)=>setsearchmeal({...searchmeal,price: Number(e.target.value)})}  />
   
               </div>
                      <div className='col-10 text-center d-flex flex-column align-items-center '>
                     <label>الفئة</label>
                     <select
  className="select text-center"
  value={searchmeal.category || ""} // ✅ تعيين الفئة الحالية للوجبة
  onChange={(e) => setsearchmeal({ ...searchmeal, category: e.target.value })} // ✅ تحديث الفئة عند التغيير
>
  <option value="">اختر الفئة</option> {/* 🔥 خيار افتراضي */}
  {cat.map((itemcat) => (
    <option key={itemcat._id} value={itemcat._id}>
      {itemcat.name} {/* 🔥 عرض اسم الفئة */}
    </option>
  ))}
</select>



               
                           </div>
               <div className='col-5'>
         <label>الوصف</label>
         <input type='aria' required value={searchmeal.description} onChange={(e)=>setsearchmeal({...searchmeal,description:e.target.value})} />
   
               </div>
               <div className='col-5  '>
               <label>اضف صورة</label>
               <input type='file'  className='select'   />
               </div>
             </div>
               <button className='btn btn-info btnAdd'  type='submit' >تعديل</button>
       
         
   
   
         </form>
           
          </div >
          
          
         
       </div>
  )
}

export default UpdateMale
