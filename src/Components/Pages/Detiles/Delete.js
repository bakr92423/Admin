import axios from 'axios'
import React, { useState } from 'react'

const Delete = () => {

  const[cat,setCat]=useState('')

  const handleDelete = async () => {
    if (!cat) {
      console.error("❌ خطأ: اسم الوجبة فارغ!");
      alert("❌ يرجى إدخال اسم الوجبة!");

      


      return;
    }

    try {
      // 🔍 1️⃣ البحث عن `id` باستخدام `name`
      const res = await axios.get(`https://mune-node-bakr92423s-projects.vercel.app/api/category?keyWord=${cat}` ,{
        params: { name: cat },
      });
      
      

      const catego = res.data.data[0];

      if (!catego || !catego._id) {
        alert("🚫 لم يتم العثور على الوجبة!");
        return;
      }

      const id = catego._id; // استخراج `id` الصحيح
      console.log(id);
      

      // 🗑 2️⃣ إرسال طلب الحذف باستخدام `id`
      await axios.delete(`https://mune-node-bakr92423s-projects.vercel.app/api/category/${id}`);

      console.log("✅ تم حذف الوجبة بنجاح!");
      alert(`🚀 تم حذف الوجبة: ${cat} بنجاح!`);

      setCat(""); // إعادة تعيين الحقل بعد الحذف
    } catch (error) {
      console.error("❌ خطأ أثناء الحذف:", error.response?.data || error.message);
      alert("❌ حدث خطأ أثناء حذف الوجبة!");
    }
  };
 

  return (
    <div className='col-10 update'>
    <form className='search-form d-flex flex-column  '>
      <p className='title'>حذف فئة</p>
    {/* <div className='search-box my-5 '>
      <input type='search' placeholder='ابحث هنا' className='text-center' />
      <button className='btn btn-info mx-2 ' type='submit' >بحث</button>
      </div> */}
    <div className='update-box my-5'>
    <p className='text-center'>اسم الفئة المطلوب حذفها</p>
      <input type='text' className='mx-2' value={cat} onChange={(e)=>setCat(e.target.value)} />
      <button className='btn btn-info  ' type='button' onClick={()=>handleDelete()} >حذف</button>
      </div>
    </form>
  
</div>
  )
}

export default Delete
