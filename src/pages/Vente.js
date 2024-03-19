import React, { useState } from 'react'
import NavBar from '../component/navBar/NavBar';
import Menu from '../component/navBar/Menu';
import Context from '../component/vente/Context';
import Panier from '../component/vente/Panier' ;
import Paiement from '../component/vente/Paiement';

const Vente = () => {

  const [panier, setPanier] = useState([]) ;
 

  return (
    <div className='vente'>
         <NavBar 
            active1= "btn1"
            active2= "btn2 btn-active"
            active3= "btn3"
         />

         <Menu />

         <Context 
            panier = {panier} 
            setPanier = {setPanier}
         />

         <Panier 
            panier = {panier} 
            setPanier = {setPanier}
         />

         <Paiement 
            panier = {panier}
            setPanier = {setPanier}
         />
         
    </div>
  )
}

export default Vente
