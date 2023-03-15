
import "./auth.css"
import {useState} from "react"
import { useHistory } from "react-router-dom"
import { emailActions } from "../store/EmailStore"
import { useDispatch } from "react-redux"
import { useContext } from "react";
import Eamilstorconetxt from "../store/EmailContext"
const Authentication=()=>{
    const [login,Setlogin]=useState(false)
    const [email,Setemail]=useState()
     const [password,Setpassword]=useState()
  const history=   useHistory()
  const dispatch=useDispatch()
const EmailCtx=useContext(Eamilstorconetxt)
    const eamilHandler=(event)=>{
        
        Setemail(event.target.value)

    }

    const passwordHandler=(event)=>{
        Setpassword(event.target.value)
    }


    const ExistingAccount=(event)=>{
        Setlogin((prevoiustate)=>{ return !prevoiustate})
    }
   const AuthenticationHandler=(event)=>{
    console.log("Hi")
       event.preventDefault()
      
    if(!login){
     
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8T_iUkMbjDbCaHqWgg8eYAHkNZ4j1SxY",
      {method:"POST",body:JSON.stringify({email:email,password:password,returnSecureToken:true}),headers:{"Content-Type": "application/json"}})
      .then((response)=>{
          if(response.ok){
            console.log(response)
            Setlogin(true)
            // return response.json()
            
          }
          else{
            return response.json()
          }
      })
      .then((successresponse)=>{ console.log(successresponse)})
      
    }
else{

 
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8T_iUkMbjDbCaHqWgg8eYAHkNZ4j1SxY",
    {method:"POST",body:JSON.stringify({email:email,password:password,returnSecureToken:true}),headers:{"Content-Type":"application/json"}})
    .then((response)=>{
     if(response.ok){
      EmailCtx.login(email)
      console.log(response)
         dispatch(emailActions.getMail({email}))
      console.log(email)
      history.replace("/colorify")
     }
     else{
      response.json().then((error)=>{
       console.log(error)
      })
     }
      return  response.json()
     
    })
    // .then((success)=>{
       
    //    if(success.ok){
    //     console.log(success.message)
    //     history.push("/colorify")
    //    }
      
    //   }
    // )
}
}

   




return(
    <form onSubmit={AuthenticationHandler}> 
    <main className="form">
        <h1>{login?"Login":"Signup"}</h1>
        <input type="email"  onChange={eamilHandler} ></input>
         <input type="number"    onChange={passwordHandler}></input>
         <button onClick={AuthenticationHandler}>{login?"Signin":"Signup"}</button>
         <button className="existing" onClick={ExistingAccount}><p>{!login?"already have account":"createAccount"}</p>    </button>
    </main>
    </form>
)



}

export default Authentication;