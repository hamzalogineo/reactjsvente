import React from 'react'
import ApiLp from '../listeProduit/ApiLp'

const AddPanier = ({id, panier, setPanier}) => {

    const addP = async () => {
        try{ 
           const response = await ApiLp.get("/produits/"+id) ;
           if(response.status === 200){
               const newPanier = {
                id: response.data.id,
                description: response.data.description,
                pu: response.data.pu,
                qte: 1,
                mtt: response.data.pu
               }

               setPanier([newPanier, ...panier]) ;

           }else{console.log("err")}
        }catch(err){}
    }

  return (
    <div>
      <button style={{borderRadius: 50, padding: 3, cursor: 'pointer', background: 'blue', color: 'white', fontWeight: 'bold'}} onClick={addP}>
             AJOUTER
      </button>
    </div>
  )
}

export default AddPanier
