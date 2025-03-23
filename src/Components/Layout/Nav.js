import React from 'react'

const Nav = () => {
  return (
    <div className='row  '>
      <nav class="navbar navbar-expand-lg bg-dark ">
  <div class="container-fluid d-flex justify-between ">
    <h2  class="navbar-brand px-3 " >لوحة التحكم</h2>
    <h2  class="navbar-brand px-3 " >{new Date().getFullYear()}/{new Date().getMonth() +1}/{new Date().getDate() }</h2>
    <h2  class="navbar-brand px-3 " >مطعم جديد</h2>
    

  </div>
</nav>
      
    </div>
  )
}

export default Nav
