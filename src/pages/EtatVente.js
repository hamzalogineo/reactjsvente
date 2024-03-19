import React from 'react'
import NavBar from '../component/navBar/NavBar';
import Menu from '../component/navBar/Menu';
import Context from '../component/etatVente/Context';

const EtatVente = () => {

  

  return (
    <div className='etatvente'>
        <NavBar 
           active1= "btn1"
           active2= "btn2"
           active3= "btn3 btn-active"
        />
         <Menu />
         <Context />

    </div>
  )
}

export default EtatVente
