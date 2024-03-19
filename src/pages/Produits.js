import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../component/navBar/NavBar';
import Menu from '../component/navBar/Menu';
import Context from '../component/listeProduit/Context';

const Produits = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) ;
  
  useEffect(() => {
    window.onpopstate = () => {
      if(user.id > 0){
         navigate("/produits");
      }
    }
}, [navigate])


  return (
    <div className='produits'>
         <NavBar 
            active1= "btn1 btn-active"
            active2= "btn2"
            active3= "btn3"
         />
         <Menu />
         <Context user = {user} />
    </div>
  )
}

export default Produits
