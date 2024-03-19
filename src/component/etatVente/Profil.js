import React, { useState } from 'react'
import Avatar from '../file/avatar.jpg' ;
import Api from '../vente/Api';
 

const Profil = () => {

  const handleProfilView = () =>{
      let tag = document.getElementById("profileViewMedia") ;
          if(tag.classList.contains("profileView-active") === true){
            tag.classList.remove("profileView-active") ;
          }else{
            tag.classList.add("profileView-active") ;
          }      
  }

  const userId = JSON.parse(localStorage.getItem("user")).id ;
  const [image, setImage] = useState("YB7.jpg") ;

  const handleFileUpload = async (event) => {
    try{
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
     
      const response = await Api.post("/upload-file/"+userId, formData) ;
          console.log(response) ;
      if(response.status === 200){
        const responseGet = await Api.get("/download/"+userId) ;
        console.log(responseGet) ;

      
         if(responseGet.status === 200){
          
              setImage("YB7.jpg") ;
             
               // {`${image === "" ? Avatar : 'https://www.example.com/images/dinosaur.jpg'}`}
               // "https://media.geeksforgeeks.org/wp-content/uploads/20190506164011/logo3.png"
              
          
         }
      }

    }catch(err){console.log(err) ;}
  };

  return (
    <div>
         <input type='submit' className='profile' value={"Profil"} onClick={()=>{handleProfilView()}} />
         <div className='profileView' id={"profileViewMedia"}>
            <span className='closePv' onClick={()=>{handleProfilView()}}>X</span><br/><br/>
            <img src= {`${image === "" ? Avatar : `http://192.168.1.117:8080/media/YB7.jpg`}`}
                   className = {"imgFile"} alt="avatar" /><br/>
                     Image to send .......... <br/><br/>
               <input type='file' placeholder='FICHIER A UPLODER' className='file' onChange={(e)=>{handleFileUpload(e)}} /> 

               <input type='submit' value={"ENVOYER"} className='filebtn' onClick={(e)=>{handleFileUpload(e)}}/>  <a href={"http://192.168.1.117:8080/media/YB7.jpg"} download className='filebtn'>DOWNLOAD</a> <br/><br/>
                   Audio .......... <br/><br/>
               <input type='file' placeholder='FICHIER A UPLODER' className='file' /> 
               <input type='submit' value={"ENVOYER"} className='filebtn' /><input type='submit' value={"DOWNLOAD"} className='filebtn' /><br/><br/>
                    Fichier tout type pdf word excel etc .......... <br/><br/>
               <input type='file' placeholder='FICHIER A UPLODER' className='file' /> 
               <input type='submit' value={"ENVOYER"} className='filebtn' />
               <input type='submit' value={"DOWNLOAD"} className='filebtn' />
                 
         </div>
    </div>
  )
}

export default Profil
