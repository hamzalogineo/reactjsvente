import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {

    const handleActive = (id) =>{
        document.getElementById("btn1").classList.remove("btn-active") ;
        document.getElementById("btn2").classList.remove("btn-active") ;
        document.getElementById("btn3").classList.remove("btn-active") ;
 
        document.getElementById(id).classList.add("btn-active") ;
     }

  return (
    <div className='Menu'>
        <br/><br/><br/>
         
       
       <Link to="/vente"><button className='btn2' id='btn2' onClick={()=>{handleActive("btn2")}}>VENTES</button></Link><br/>
       <Link to="/etat"><button className='btn3' id='btn3' onClick={()=>{handleActive("btn3")}}>ETAT VENTES</button></Link><br/>

       <h4 className='copy'>COPYRIGT@ 2024</h4>
    </div>
  )
}

export default Menu
