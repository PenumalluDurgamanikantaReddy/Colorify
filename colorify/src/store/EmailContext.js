import { createContext, useState } from "react";



const Eamilstorconetxt=createContext({email:"",login:(emailid)=>{}})



export const Contextprovider=(props)=>{
const [emailstore,Setemailstore]=useState("")

const loginHanlder=(emailid)=>{
    Setemailstore(emailid)
console.log("Hi")
}

const emaildata={email:emailstore,login:loginHanlder}

return(
    <Eamilstorconetxt.Provider value={emaildata}>
      {props.children}
    </Eamilstorconetxt.Provider>
)



}

export  default Eamilstorconetxt;


