import React from 'react'
import { Link } from 'react-router-dom'


const Side = () => {
  return (
    <div className='col-2' >
    <div className=' px-4  d-flex side align-items-center justify-content between'>
      <div className='parent d-flex flex-column '>
        <h3 className='mt-3 ' >الفئة</h3>
        <Link to='/addCategory' >اضافة فئة</Link>
      <Link to='/updateCategory' className=' mx-1' >تعديل فئة</Link>
      <Link to='/deleteCategory' className=' mx-1' >حذف فئة</Link>

      </div>
      <div className='parent meals d-flex flex-column '>
        <h3 className='mt-4 ' >الوجبات</h3>
        <Link to='/addMeal' className=' ' >اضافة وجبة</Link>
      <Link to='/updateMale' className=' mx-1' >تعديل وجبة</Link>
      <Link to='/deleteMale' className=' mx-1' >حذف وجبة</Link>
      <Link to='' className=' mx-1' > القائمة</Link>

      </div>
      
    </div>
    </div>
  )
}

export default Side
