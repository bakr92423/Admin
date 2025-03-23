import axios from 'axios';
import React, { useState } from 'react'

const Add = () => {

  const [name,setName]=useState('')

  const handleSubmit=async (e)=>{
    e.preventDefault();

    const formData= new FormData()
    formData.append('name',name)
    try{
       const res=await axios.post('https://mune-node-bakr92423s-projects.vercel.app/api/category',formData,{headers:{
        "Content-Type": "application/json",

       }});
       console.log(res);
       

    } catch (error) {
            console.error('Error submitting data:', error);
            // التعامل مع الأخطاء هنا
          }

  }

  

  return (
    <div className='col-10 add  ' >

      <form onSubmit={handleSubmit} >
      <label>الاسم</label>
      <input type='text' className='text-center' required value={name} placeholder='اكتب اسم الفئة هنا' onChange={(e)=>setName(e.target.value)} />
      <button className='btn btn-info ' type='submit' >اضافة</button>


      </form>

        
      
    </div>
  )
}

export default Add

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddMealForm = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('description', description);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       const response = await axios.post('YOUR_API_ENDPOINT', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Data submitted successfully:', response.data);
//       // يمكنك إضافة منطق هنا بعد إرسال البيانات بنجاح، مثل مسح النموذج أو عرض رسالة تأكيد
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       // التعامل مع الأخطاء هنا
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>اسم الوجبة</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>السعر</label>
//         <input
//           type="text"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>الوصف</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>أضف صورة</label>
//         <input
//           type="file"
//           onChange={handleImageChange}
//           required
//         />
//       </div>
//       <button type="submit">إضافة</button>
//     </form>
//   );
// };

// export default AddMealForm;
