import React, { useEffect, useState } from 'react'
import Side from '../Layout/Side'
import axios from 'axios'


const AddMeal = () => {

  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDescription]=useState('')
  const [category,setCategory]=useState('')
  const [image,setImage]=useState(null)
  const handalImg = (e) => {
    const file = e.target.files[0]; // 🔥 الحصول على الملف المختار
    console.log("✅ الصورة المختارة:", file); // ✅ تأكيد أن الصورة تم اختيارها
    setImage(file); // ✅ تحديث `state`
  };
  

  const [select,setSelect]=useState([])

  useEffect(()=>{
    const showCategory= async()=>{
       const resCat = await axios.get("https://mune-node-bakr92423s-projects.vercel.app/api/category");
       setSelect(resCat.data.data)

    }

    showCategory()

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !price || !description || !category || !image) {
      console.log("❌ يرجى ملء جميع الحقول!");
      return;
    }
  
    console.log("📌 البيانات قبل الإرسال:");
    console.log("✅ الاسم:", name);
    console.log("✅ السعر:", price);
    console.log("✅ الوصف:", description);
    console.log("✅ الفئة:", category);
    console.log("✅ الصورة:", image);
  
    try {
      // ✅ 1️⃣ رفع الصورة إلى `Cloudinary` أولًا
      const imageFormData = new FormData();
      imageFormData.append("image", image);
  
      const imageRes = await axios.post(
        "https://mune-node-bakr92423s-projects.vercel.app/api/upload",
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      const imageUrl = imageRes.data.imageUrl;
      console.log("✅ الصورة تم رفعها بنجاح:", imageUrl);
  
      // ✅ 2️⃣ إرسال البيانات النصية إلى `MongoDB`
      const mealData = {
        name,
        price,
        description,
        category,
        image: imageUrl, // 🔥 إرسال `imageUrl` بدلًا من `File`
      };
  
      const mealRes = await axios.post(
        "https://mune-node-bakr92423s-projects.vercel.app/api/meal",
        mealData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("✅ تم إضافة الوجبة بنجاح:", mealRes.data);
      alert("🎉 تم إضافة الوجبة بنجاح!");
    } catch (error) {
      console.error("❌ خطأ أثناء الإضافة:", error.response?.data || error.message);
      alert("❌ حدث خطأ أثناء إضافة الوجبة!");
    }
  };
  
  
  
  
  
  
  
  


  return (
    <div className='row'>
       <Side/>
       <div className='d-flex  col-8 parent-add justify-content-center align-items-center '>
       <form className='add-form row-form ' onSubmit={handleSubmit} >
          <div className='row d-flex justify-content-around align-items-around child-form ' >
       <h4 className='col-10 mt-3  text-center ' >اضافة وجبة</h4>
            <div  className='col-5'>
          <label>اسم الوجبة</label>
      <input type='text' required value={name} onChange={(e)=>setName(e.target.value)}  />
            </div>
            <div className='col-5  '>
      <label>السعر</label>
      <input type='Number' required value={price} onChange={(e) => setPrice(Number(e.target.value))}   />

            </div>
            <div className='col-10 text-center d-flex flex-column align-items-center '>
      <label>الفئة</label>
      <select className='select text-center ' value={category} onChange={(e)=>setCategory(e.target.value)} >
      <option value='اختيار'>اختر</option>
        {select.map((item)=>{
          return(
            <option value={item._id}>{item.name}</option>

          )
        })}
        

      </select>

            </div>

            <div className='col-5'>
      <label>الوصف</label>
      <input type='text' required value={description} onChange={(e)=>setDescription(e.target.value)} />

            </div>
            <div className='col-5  '>
            <label>اضف صورة</label>
            <input type='file'  className='select'  onChange={handalImg} />
            </div>
          </div>
            <button type='submit' className='btn btn-info btnAdd  ' >اضافة</button>
    
      


      </form>
        
       </div >
       
       
      
    </div>
  )
}

export default AddMeal
