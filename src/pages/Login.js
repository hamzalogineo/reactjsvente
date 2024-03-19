import {React, useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom' ;
import Api from './Api';

const Login = () => {

  const[view, setView] = useState('CACHER');
  const navigate = useNavigate();
  // const [users, setUsers] = useState([]) ;

  /*
   const obUser = {
    id: 1 ,
    login: "ASTB",
    nom: "AISSATA BAGAYOGo",
    password: "XXXX",
    profil: "ASTB1.jpg",
    role: "CAIISE"
  } ;
*/
   const [login, setLogin] = useState("") ;
   const [nom, setNom] = useState("") ;
   const [password, setPassword] = useState("") ;
   // const [profil, setProfil] = useState("") ;
   const [role, setRole] = useState("CHOISIR") ;

   const [log, setLog] = useState("") ;

   const handleSignUp = async () =>{
    try{

       const user = {login: login, nom: nom, password: password, profil: "", role: role} ;
       
       const response = await Api.post("/users", user) ;
       console.log(response) ;

       if(response.status === 200){
         setLogin("");
         setNom("");
         setPassword("");
         setRole("CHOISIR");

         handleSign() ;
       }

    }catch(err){
        console.log(err) ;
    }
   }

   const idendity = localStorage.getItem("user");
   
  useEffect(() => {
    window.onpopstate = () => {
      if(idendity === ""){
        navigate("/");
      }
      
    }
}, [navigate])

  const handleView = () =>{
    let tag = document.getElementById('pass') ;
        if(tag.type === "password"){
           tag.type = "text" ;
           setView("VOIR-PS") ;
        }else if(tag.type === "text"){
          tag.type = "password" ;
          setView("CACHER") ;
        }
  }

  const handleSign = () =>{
        let tag = document.getElementById('sign-up') ;
        if(tag.classList.contains('sign-up-active')){
          tag.classList.remove('sign-up-active') ;
        }else{
          tag.classList.add('sign-up-active');
        }
  }

  const handleConexion = async (e) =>{
     e.preventDefault() ;

     if(log === ""){
        console.log("COUPLE LOGIN PASS OBLIGATOIRE")
     }else{
    
       try{
               const response = await Api.get("/usersByLog/"+log) ;

               console.log(response) ; 

               if(response.data.length === 0){
                  console.log("bad credential")
               }else{
                const user = response.data[0] ;
                localStorage.setItem("user", JSON.stringify(user)) ;
                navigate("/produits") ;
               }

       }catch(err){
        console.log(err)
       }

     // navigate("/produits") ;

      }

  }
  
const keyEnterLogin = async (e) => {
  try{
        if(e.key === "Enter"){
          handleConexion(e) ;
        }
  }catch(err){}
}
  return (
    <div className='login'>
         <div className="sign-in">
               
                      <label className='spn' style={{color: 'white'}} >Login connexion.</label><br/><br/>
                      <input type='text' className='log' placeholder='LOGIN' value={log} onChange={(e)=>{setLog(e.target.value)}} /><br/>

                      <input type='password' className='pass' id='pass' placeholder='PASSWORD' 
                    
                      value={password} onChange={(e)=>{setPassword(e.target.value)}} onKeyDown={(e) =>{keyEnterLogin(e)}} /> 
                      
                      <button className='view' onClick={()=>{handleView()}}>
                            {view}
                        </button><br/>
                      <input type='submit' value="CONNEXION" className='con' onClick={(e)=>{handleConexion(e)}}/><br/>
                
               <input type='submit' value="SIGN-UP" className='conS' onClick={()=>{handleSign()}}/><br/>

         </div>
         <div className='sign-up' id='sign-up'>
          <span className='close-signUp' onClick={()=>{handleSign()}}>X</span><br/>
         <label className='spn' style={{color: 'white'}}>Inscription .</label><br/><br/>
               <input type='text' className='log' placeholder='NOM COMPLET' value={nom} onChange={(e)=>setNom(e.target.value)}/><br/>
               <input type='text' className='log' placeholder='LOGIN' value={login} onChange={(e)=>setLogin(e.target.value)}/><br/>
               <input type='text' className='log' id='pass-s-u' placeholder='PASSWORD' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
               <select className='log' style={{cursor: 'pointer'}} value={role} onChange={(e)=>setRole(e.target.value)}>
                 <option>CHOISIR</option>
                 <option>ADMIN</option>
                 <option>CAISSE</option>
               </select><br/>
               <input type='submit' value="INSCRIRE" className='con' onClick={handleSignUp}/>

         </div>
    </div>
  )
}

export default Login
