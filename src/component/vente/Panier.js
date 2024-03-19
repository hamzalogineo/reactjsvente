import React from 'react'
import EditQte from './EditQte'

const Context = ({panier, setPanier}) => {

  return (
    <div className='pc'>
      
        <div className='tablepanier'>
                 <label style={{color: 'white', fontWeight: 'bold', marginLeft: 300}}>Pannier Client</label>
               <table className='tabpanier'>
                <tr>
                  <th>ID</th><th>DESCRIPTION</th><th>P.U</th><th>QTE</th><th>MONTANT</th><th>ACTION</th>
                </tr>
                 
                  {
                    panier.map((item, key) => (
                      <tr>
                      <td width={40} key={key}>{item.id}</td><td width={400}>{item.description}</td><td width={75}>{item.pu}</td><td width={75}>{item.qte}</td><td width={50}>{item.mtt}</td>
                      <td width={200} >
                          <EditQte 
                             id = {item.id} qte = {item.qte} setPanier = {setPanier} mttE = {item.mtt} pu = {item.pu} 
                             description = {item.description} panier = {panier}
                          />
                        </td>
                    </tr>
                    ))
                  }

               
               
               </table>
        </div>
        
    </div>
  )
}

export default Context 
