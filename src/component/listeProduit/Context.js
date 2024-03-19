import React, { useEffect, useState } from 'react'
import Edit from './Edit';
import ApiLp from './ApiLp'


const Context = ({user}) => {

  const [findP, setFindP] = useState("") ;

  const handleAddp = (action) =>{
       if(action === "add"){
           document.getElementById("addproduit").style.visibility = "visible" ;
       }else if(action === "close"){
           document.getElementById("addproduit").style.visibility = "hidden" ;
       }
  }




   const [listeProduit, setListeProduit] = useState([]) ;
   const [currentPage, setCurrentPage] = useState(1) ;
   const recordsPerPage = 8 ;
   const lastIndex = currentPage * recordsPerPage ;
   const firstIndex = lastIndex - recordsPerPage ;
   const records = listeProduit.slice(firstIndex, lastIndex) ;
   const npage = Math.ceil(listeProduit.length / recordsPerPage) ;
   const numbers = [...Array(npage + 1).keys()].slice(1) ;




  useEffect(
    ()=>{
        refreshP() ;
    }, [])

    const refreshP = async () => {

       try{
            const response = await ApiLp.get("/produitsAll") ;
            console.log(response) ;
            if(response.data.length > 0){
                setListeProduit(response.data) ;
               
            }

       }catch(err){
        console.log(err) ;
       }

    }

  const [description, setDescription] = useState("") ;
  const [pu, setPu] = useState(0) ;
  const etat = 0 ;

  const handleNewPro = async () => {
    try{

        if(description !== "" && pu !== 0){
          const produit = {
            description: description,
            pu: pu,
            etat: etat
          } ;

          const response = await ApiLp.post("/produits", produit) ;
          console.log(response) ;

          if(response.status === 200){
            setDescription("") ; setPu(0) ;
            refreshP() ;
          }

        }else{
          console.log("parametre incorrect") ;
        }

    }catch(err){console.log(err)}

  }

  const handleChange = async (e) => {
    try{
      let find = e.target.value ;
      setFindP(find) ;
      console.log(findP)
      if(findP === ""){
        refreshP() ;
      }else{

        const response = await ApiLp.get("/produitsU/"+findP) ;
        console.log(response) ;
        if(response.data.length > 0){
         setListeProduit(response.data) ;
        }

      }
     
    }catch(err){}
  }


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


  return (
    <div className='pc'>
        <button className='addp' onClick={()=>{handleAddp("add")}}>+</button>
        <div className='addproduit' id='addproduit'>
          <span className='closePP' onClick={()=>{handleAddp("close")}}>X</span><br/><br/>
          <input type='text' placeholder='DESCRIPTION' className='descp' value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
          <input type='number' placeholder='PRIX UNITAIRE' className='pu' value={pu} onChange={(e)=>setPu(e.target.value)} /><br/>
          <input type='submit' value="ENREGISTRER" className='save' onClick={handleNewPro}/>
        </div>
        <div className='tablep'>
               <input type='text' placeholder='RECHERCHER' className='findp'  value={findP} onChange={(e) => {handleChange(e)}}/><br/>
               <table className='tabp'>
                <tr>
                  <th>ID</th><th>DESCRIPTION</th><th>P.U</th><th>ETAT</th><th>ACTION</th>
                </tr>
             
                {
                  records.map((item, key) => (

                    <tr>
                       <td width={40} key={key}>{item.id}</td><td width={400}>{item.description}</td><td width={75}>{item.pu}</td><td width={50}>{item.etat}</td><td width={200} >
                        <Edit 
                             id={item.id} 
                             refreshP = {refreshP} 
                        />
                        </td>
                    </tr>

                  ))
                }

               </table>
            
            <div className='pagination'>
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
              
        </div>
        
    </div>
  )
}

export default Context 
