import React, { useEffect, useState } from 'react'
import Api from "./Api"

const Paiement = ({panier, setPanier}) => {
  const [total, setTotal] = React.useState(0) ;
  const [client, setClient] = useState("") ;
  const [mtt , setMtt] = useState(0) ;

   useEffect(
    () => {
      var t = 0 ;
       for(let i = 0 ; i < panier.length; i++){
          t += panier[i].mtt ;
       }
       setTotal(t) ;
       setMtt(t)
    }, [panier])

    
 const sendFacture = async () => {
     try{
            const facture = {
                date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                client: client,
                mtt: mtt,
                user: JSON.parse(localStorage.getItem("user")).id
            } ;

            const response1 = await Api.post("/facture", facture) ;
            if(response1.status === 200){
              const response2 = await Api.get("/facture") ;
              if(response2.data.length > 0){
                const myfacture = response2.data[response2.data.length - 1];

                 for(let i = 0; i < panier.length; i++){
                   let data = panier[i] ;
                   const newPanier = {
                    description: data.description,
                    qte: data.qte, 
                    pu: data.pu, 
                    mtt: data.mtt,
                    facture: myfacture.id
                   }

                   Api.post("/items", newPanier) ;

                 }

                 setPanier([]) ;
                 setClient("") ;
                 setMtt() ;

                 alert("save fact ok !!!") ;

              }
            }

     }catch(err){
      console.log(err)
     }
 }


  return (
    <div className='paie'>
        <h4>Paiement facture.</h4>
         <input type='text' className='clientFact' placeholder='Client Facture' value={client} onChange={(e)=>setClient(e.target.value)}/><br/>
         <h4>NET A PAYER : {total} FCFA</h4>
         <input type='number' className='clientFact' placeholder='MONTANT RECU' value={mtt} onChange={(e)=>setMtt(e.target.value)}/><br/>
         <input type='submit' value={"VALIDER LA FACTURE"} className='valFact' onClick={sendFacture}/>

    </div>
  )
}

export default Paiement
