import { React, useState } from 'react'
 
import Api from '../vente/Api';
import InvoiceFacture from '../../pages/InvoiceFacture';

const Action = ({id}) => {

    const handleActionBox = (operation) =>{
        let tag = document.getElementById('Menu100box'+id) ;
        if(operation === "open"){
          tag.style.visibility = "visible" ;
       }else if(operation === "close"){
        tag.style.visibility = "hidden" ;

        let tagPanier = document.getElementById("actionEtatVentePanier"+id) ;
        
            tagPanier.style.visibility = "hidden" ;
        
     }
    }

    const handlePanier = (operation) =>{
        let tag = document.getElementById("actionEtatVentePanier"+id) ;
        if(operation === "open"){
            getPanier() ;
            tag.style.visibility = "visible" ;
        }else if(operation === "close"){
            tag.style.visibility = "hidden" ;
        }
    }

    const [panier, setPanier] = useState([]) ;

    const getPanier = async () => {
        try{
      
             const response = await Api.get("/items/"+id) ;
             if(response.data.length > 0){
                setPanier(response.data)
             }

        }catch(err){}
    }


    const [currentPage, setCurrentPage] = useState(1) ;
    const recordsPerPage = 11 ;
    const lastIndex = currentPage * recordsPerPage ;
    const firstIndex = lastIndex - recordsPerPage ;
    const records = panier.slice(firstIndex, lastIndex) ;
    const npage = Math.ceil(panier.length / recordsPerPage) ;
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


 const print = () =>{
  document.getElementById("invoiceFacture"+id).style.visibility = "visible" ;
 }
 

  return (
    <div>
        <button className='actionEtat' onClick={()=>{handleActionBox("open")}}>...</button>
        <div className='action100Box' id={'Menu100box'+id}>
             <span style={{cursor: 'pointer', display: 'block', color: 'white'}} onClick={()=>{handleActionBox("close")}}>X</span><br/>
          <input type='submit' className='actionPrint' value={"IMPRIMER"}  onClick={print} /> 
            
                <InvoiceFacture 
                  id = {id}
                />
             
                 <br/>
            <input type='submit' value={"PANIER"} className='actionPanier' onClick={()=>{handlePanier("open")}}/><br/>
            <input type='submit' value={"DELETE"} className='actionDelete' />
        </div>
        <div className='actionEtatVentePanier' id={"actionEtatVentePanier"+id}>
            <span style={{cursor: 'pointer', color: 'white', display: 'block', fontWeight: 'bold', fontSize: 'large', marginTop: 10, marginBottom: 5}}
            onClick={()=>{handlePanier("close")}}>X</span>
            <table className='etatventePanierMenuActionTableau'>
                <tr>
                    <th width={45}>ID</th><th>DESCRIPTION</th><th width={80}>P.U</th><th width={80}>QTE</th><th width={100}>MONTANT</th>
                </tr>

                {
                    records.map((item, key) => (
                        <tr key={key}>
                          <td>{item.id}</td><td>{item.description}</td><td>{item.pu}</td><td>{item.qte}</td><td>{item.mtt}</td>
                       </tr>
                    ))
                }

                
            </table>

            <label style={{color: 'white', position: 'absolute', top: '92%'}}>
                
           <div className='pagination-etatVenteP'>
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

            </label>
        </div>
    </div>
  )
}

export default Action
