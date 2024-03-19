import React, { useState } from 'react'
import ApiLp from './ApiLp';

const Edit = ({id, refreshP}) => {

  // id: 1, description: "FONIO PRECUIT", pu: 1500, etat: 0, userSaisie: "ZB"
     

    
    const [desc, setDesc] = useState("") ;
    const [pu, setPu] = useState(0) ;
    const [etat, setEtat] = useState(0);
    
    const [userSaisie, setUserSaisie] = useState("") ;

    const getProd = async () =>{
      try{
         const response = await ApiLp.get("/produits/"+id) ;
         console.log(response)
         if(response.status === 200){
             setDesc(response.data.description) ;
             setPu(response.data.pu) ;
             setEtat(response.data.etat) ;
             setUserSaisie("zouma baga") ;
         }
      }catch(er){console.log(er)}
     }

    

       
       const handleEditValider = async (id) => {
        console.log(id)
          
        try{
  
          const produit = {
              id: id,
              description: desc,
              pu: pu,
              etat: etat
          } ;
               const response = await ApiLp.put("/produits", produit) ;
               refreshP() ;
               if(response.status === 200){
                  let box = document.getElementById("box"+id) ;
                  
                      
                      box.style.visibility = "hidden" ;
                  
            }
  
        }catch(err){}
     
      }


    const handleEdit = async (operation, id) => {
      console.log(id)
   
                let box = document.getElementById("box"+id) ;
                if(operation === "open"){
                   getProd() ;
                    box.style.visibility = "visible" ;
                }else if(operation === "close"){
                    
                    box.style.visibility = "hidden" ;
                }
    
    }

  
          

  return (
    <div>
      <button className='editP' id={"editp"+id} onClick={()=>{handleEdit("open", id)}}>EDITER</button> <button className='deleteP' id={"deletep"+id} >DELETE</button>
      <div className='editBox' id={"box"+id}>

        <span className='sclose' onClick={()=>{handleEdit("close", id)}}>X</span><br/><br/>
        <label className='lid'>{"ID PRODUIT : "+id}</label><br/>
        <input type='text' className='descp' value={desc} placeholder='DESCRIPTIONT' onChange={(e) => {setDesc(e.target.value)}} /><br/>
        <input type='number' value={pu} placeholder='P.U' className='prixp'  onChange={(e) => {setPu(e.target.value)}}/><br/>
        <label className='etat'>{etat+" "+userSaisie}</label><br/>
        <input type='submit' value={"EDITER"} className='submitEdit' onClick={() => {handleEditValider(id)}}/>
             
      </div>
    </div>
  )
}

export default Edit
