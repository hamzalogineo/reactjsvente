import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = ({active1, active2, active3}) => {

    const handleActive = (id) =>{
       document.getElementById("btn1").classList.remove("btn-active") ;
       document.getElementById("btn2").classList.remove("btn-active") ;
       document.getElementById("btn3").classList.remove("btn-active") ;

       document.getElementById(id).classList.add("btn-active") ;
    }

  return (
    <div className='navbar'>
       <label style={{color: 'white'}}>SIBY-CENTER</label> 
       <Link to="/produits"><button className={active1} id='btn1' onClick={()=>{handleActive("btn1")}}>PRODUITS</button></Link>
       <Link to="/vente"><button className={active2} id='btn2' onClick={()=>{handleActive("btn2")}}>VENTES</button></Link>
       <Link to="/etat"><button className={active3} id='btn3' onClick={()=>{handleActive("btn3")}}>ETAT VENTES</button></Link>

       <Link to="/"><button className='btn4' onClick={()=>{localStorage.setItem("user", "")}}>Log-Out</button></Link>
    </div>
  )
}


 
  export default NavBar

 
   