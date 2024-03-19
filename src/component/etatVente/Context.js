import React, { useEffect, useState, useRef } from 'react'
import Action from './Action'
import Profil from './Profil'
import Api from '../vente/Api'
import ReactToPrint from 'react-to-print'

const Context = () => {

  const [facture, setFacture] = useState([]) ;

   const getAllFact = async () => {
        try{
           const response = await Api.get("/facture") ;
           if(response.data.length > 0){
           
              const arr = [] ;

            for(let i = 0 ; i < response.data.length; i++){
                let data = response.data[i] ;
                console.log(data) ;
                let idU = data.user ;
                  console.log(idU);

                const getUser = await Api.get("/users/"+idU) ;
                      console.log(getUser) ;
                      

                 const newFacture = {
                    id: data.id,
                    date: data.date, 
                    client: data.client, 
                    mtt: data.mtt ,
                    user: getUser.data.login ,
                    etat: data.etat
                }
            
                arr.push(newFacture) ;
 
            }

                 setFacture(arr) ;
                  
               
            }

        }catch(err){console.log(err)}
   }


   const [cleId, setCleId] = useState("") ;

const findOneFact = async () => {
      setCleId(document.getElementById("findOneFacture").value) ;
    try{
          const response = await Api.get("/facture/"+cleId) ;
          if(response.status === 200){
            const arr = {
                id: response.data.id, 
                date: response.data.date, 
                client: response.data.client, 
                mtt: response.data.mtt, 
                user: response.data.user, 
                etat: response.data.etat
            } ;
         
            setFacture([arr]) ;
          }
    }catch(err){console.log(err)}
 }

  
  useEffect(
    () => {
       getAllFact() ;
      
    },[])


   const [currentPage, setCurrentPage] = useState(1) ;
   const recordsPerPage = 11 ;
   const lastIndex = currentPage * recordsPerPage ;
   const firstIndex = lastIndex - recordsPerPage ;
   const records = facture.slice(firstIndex, lastIndex) ;
   const npage = Math.ceil(facture.length / recordsPerPage) ;
   const numbers = [...Array(npage + 1).keys()].slice(1) ;


     //impl pagination 

  const prePage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage -1) ;
      
    }
}

const changeCPage = (n) => {
     
       setCurrentPage(n) ;
       

}

const nextPage = () => {
   if(currentPage !== npage){
    setCurrentPage(currentPage + 1) ;
   }

}


let componentRef = useRef() ;

  return (
    <div className='etatVContext'>
          <input type='text' placeholder='RECHERCHER BY ID' className='findById' value = {cleId} onChange={findOneFact} id='findOneFacture' 
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
                findOneFact() ;
            }
          }}/> 
          <input type='date' className='du' /><input type='date' className='au' />
          <input type='submit' className='findPeriode' value={"Rechercher"}/> 

          <ReactToPrint
                trigger = {() =>{
                    return (
                      <input type='submit' className='print' value={"PRINT"} /> 
                        )}}
                content={() => componentRef}
                documentTitle='FACTURE VENTE'
                pageStyle="PRINT"
                
         />
          
          <Profil />          
            <br />
          <table className='tableVenteEtat' ref={(el) => (componentRef = el)}>
             <tr>
                <th>ID</th><th width={200}>DATE</th><th>CLIENT</th><th width={120}>MONTANT</th><th width={100}>USER</th><th width={100}>ACTION</th>
            </tr> 

            {
              records.map((item, key) => (
                <tr key={key}>
                 <td>{item.id}</td><td>{item.date}</td><td>{item.client}</td><td>{item.mtt}</td><td>{item.user}</td>
                 <td><Action 
                    id={item.id} 
                    facture = {facture}
                    setFacture = {setFacture}
                    />
                 </td>
               </tr>
              ))
            } 

          </table>  

          <div className='pagination-etatVente'>
              <button onClick={prePage} className='preview-pagination'>Preview</button>
                {
                    numbers.map((n,i) => (
                      <button key={i} className={`btnPagination ${currentPage === n ? 'btnPagination-active' : ''}`} onClick={() => {changeCPage(n)}}>
                        {n}
                      </button>
                    ))
                }
             <button onClick={nextPage} className='next-pagination'>Next</button>   
            </div>

           <div className='etatCaisse'  id='etatCaissePrinting'>

                  <table className='tableVenteEtat'>
                  here we can put all etat entete.................... <br/>
              ..................................... <br/>
              .......................................... <br/> 
                    <tr>
                        <th>ID</th><th width={200}>DATE</th><th>CLIENT</th><th width={120}>MONTANT</th><th width={100}>USER</th>
                    </tr> 

                    {
                      facture.map((item, key) => (
                        <tr key={key}>
                        <td>{item.id}</td><td>{item.date}</td><td>{item.client}</td><td>{item.mtt}</td><td>{item.user}</td>
                        
                      </tr>
                      ))
                    } 

                  </table>  
           </div>

    </div>
  )
}

export default Context
