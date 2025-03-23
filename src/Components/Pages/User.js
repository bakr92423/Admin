import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const User = () => {
    const [user,setUser]=useState('')
    const [pass,setPass]=useState('')
    const navigate=useNavigate()

    const login=(e)=>{
        e.preventDefault()
       if(user!=='admin' && pass!=='123' ){
        
        return(
            alert('الرجاء التأكد من اسم المستخدم وكلمة المرور')
        )
       }else{
        navigate('/addCategory')

       }
        
    }

  return (
    <div className='container user ' >
        <div className='row' >
        <div className='col-12 d-flex justify-content-center align-items-center userForm '>
        <form className='d-flex justify-content-center align-items-center flex-column ' onSubmit={login}  >
        <p>تسجيل الدخول</p>
        <input type='text' className='text-center'   onChange={(e)=>setUser(e.target.value)}  placeholder='ادخل اسم المستخدم' />
        <input type='password' className='text-center' onChange={(e)=>setPass(e.target.value)}  placeholder='ادخل كلمة المرور' />
        <button  className='btn btn-info px-4 ' type='submit' >دخول</button>

        </form>

        </div>
        </div>
     
    </div>
  )
}

export default User
