import React, { useEffect, useState } from 'react'

const EditQte = ({id, qte, setPanier, mttE, pu, description, panier}) => {

    const [qtec, setQtec] = useState(qte) ;
    const [mtt, setMtt] = useState(mttE) ;

   
    const qteEdit = () => {

         let qteget = document.getElementById("qteget"+id).value ; 
          setQtec(qteget) ;
          console.log("qte : "+qtec)
          console.log("pu : "+pu)
          let montant = (qteget * pu) ;
          setQtec(qteget) ;
          console.log("montant : "+montant)
          console.log("qte : "+qtec)
          setMtt(montant) ;
          console.log("mtt : "+mtt) ;

         const newPanier = {
          id: id, description: description, pu: pu, qte: qtec, mtt: mtt
        }
  
         for(let i = 0; i < panier.length ; i++){
            if(panier[i].id === id){
                panier[i] = newPanier ;
            }
           
         }
  
         localStorage.setItem("panierV", JSON.stringify(panier)) ;
         setPanier(JSON.parse(localStorage.getItem("panierV"))) ;
      
         console.log(panier) ;

    }

    useEffect(
      () => {
         qteEdit() ;
         console.log(qtec) ;
      }, [qtec])


  

    const handleViewEditQte = (operation) => {
        if(operation === "open"){
        document.getElementById("editqte"+id).style.visibility = "visible" ;
        }else if(operation === "close"){
            document.getElementById("editqte"+id).style.visibility = "hidden" ;
        }
    }


    const handledelete = () => {
      const newPanier = panier.filter(item => item.id !== id) ;
      localStorage.setItem("panierV", JSON.stringify(newPanier))
      setPanier(JSON.parse(localStorage.getItem("panierV"))) ;
    }
 
  return (
    <div>
      <button style={{borderRadius: 50, padding: 3, cursor: 'pointer', background: 'yellow', color: 'black', fontWeight: 'bold', marginRight: 3}} 
      onClick={()=>{handleViewEditQte("open")}}>
        EDITER
        </button>
      <button style={{borderRadius: 50, padding: 3, cursor: 'pointer', background: 'red', color: 'white', fontWeight: 'bold'}} onClick={handledelete}>
        DELETE
        </button>
        <div className='editqte' id={"editqte"+id}>
                <span className='sedq' onClick={()=>{handleViewEditQte("close")}}>X</span><br/>
                <input type='number' value={qtec} className='qtechange' placeholder='QTE' id={"qteget"+id} onChange={(e) => qteEdit()}/><br />
                
        </div>
    </div>
  )
}

export default EditQte
