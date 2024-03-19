import { React, useEffect, useState , useRef } from 'react'
import Api from './Api'
import ReactToPrint from 'react-to-print';

const InvoiceFacture = ({id}) => {

    const [date, setDate] = useState("") ;
    const [client, setClient] = useState("") ;
    const [mtt, setMtt] = useState(0) ;
    const [user, setUser] = useState("") ;
    const [panier, setPanier] = useState([]) ;

    const getData = async (id) => {
        try{
             const response = await Api.get("/facture/"+id) ;
              if(response.status === 200){
                     setDate(response.data.date) ;
                     setClient(response.data.client) ;
                     setMtt(response.data.mtt) ;
                     const getOneUser = await Api.get("/users/"+response.data.user) ;
                     if(getOneUser.status === 200){
                        setUser(getOneUser.data.login) ;
                     }
                const getPanier = await Api.get("/items/"+response.data.id) ;
                if(getPanier.data.length > 0){
                    setPanier(getPanier.data) ;
                }     
              }
        }catch(err){}
    }

    useEffect(
        () => {
            getData(id) ;
        }, [id])

        let componentRef = useRef() ;

  return (
    <div className='invoiceFacture' id={"invoiceFacture"+id} >
        <span onClick={()=>{document.getElementById("invoiceFacture"+id).style.visibility = "hidden" ;}}>X</span><br/>
        <ReactToPrint
         trigger = {() =>{
            return ( 
               <input type='submit' value={"Imprimer"} />
                 )}}
        content={() => componentRef}
        documentTitle='FACTURE VENTE'
        pageStyle="PRINT"
        onAfterPrint={()=>{document.getElementById("invoiceFacture"+id).style.visibility = "hidden"}}
      />
       <br/>
       <div ref={(el) => (componentRef = el)}>
         <h3>Facture print </h3> 
         <label>date ............{date}</label><br/>
         <label>Client ........{client}</label><br/>
         <label >User Login..........{user}</label>

            <table>
                <tr>
                   <th width = {350}>DESCRIPTION</th><th width = {100}>QTE</th><th width = {100}>P.U</th><th width = {100}>MONTANT</th>
                </tr>
             {
                panier.map((item, key) => (
                    <tr key={key}>
                      <td>{item.description}</td><td>{item.qte}</td><td>{item.pu}</td><td>{item.mtt}</td>
                  </tr>
                ))
             }
                
            </table><br/><br/>

         <label>Montant.......{mtt}</label>
    </div>
    </div>
  )
}



export default InvoiceFacture


