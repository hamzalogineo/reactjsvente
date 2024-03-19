import {React, useState, useEffect} from 'react'
import ApiLp from '../listeProduit/ApiLp' ;
import AddPanier from './AddPanier';

const Context = ({panier, setPanier}) => {

  const [listeProduit, setListeProduit] = useState([]) ;
  const [currentPage, setCurrentPage] = useState(1) ;
  const recordsPerPage = 8 ;
  const lastIndex = currentPage * recordsPerPage ;
  const firstIndex = lastIndex - recordsPerPage ;
  const records = listeProduit.slice(firstIndex, lastIndex) ;
  const npage = Math.ceil(listeProduit.length / recordsPerPage) ;
  const numbers = [...Array(npage + 1).keys()].slice(1) ;

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


 useEffect(
  ()=>{
      refreshP() ;
  }, [])

  const [findP, setFindP] = useState("") ;

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
         
        <div className='tablep'>
               <input type='text' placeholder='RECHERCHER' className='findp' value={findP} onChange={(e) => {handleChange(e)}}/> <label style={{color: 'white', fontWeight: 'bold', marginLeft: 200}}>Liste produits</label><br/>
               <table className='tabp'>
                <tr>
                  <th>ID</th><th>DESCRIPTION</th><th>P.U</th><th>ETAT</th><th>ACTION</th>
                </tr>

             {
              records.map((item, key) => (

                <tr>
                    <td width={40} key={key}>{item.id}</td><td width={400}>{item.description}</td><td width={75}>{item.pu}</td><td width={50}>{item.etat}</td>
                    <td width={200} >
                       <AddPanier 
                            id = {item.id} 
                            panier = {panier}
                            setPanier = {setPanier}
                        />
                    </td>
              </tr>

              ))
             } 
                
               </table>

               <div className='pagination-vente'>
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
