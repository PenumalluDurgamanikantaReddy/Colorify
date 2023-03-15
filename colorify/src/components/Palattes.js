import Colorify from "./colorifypage"
import "./palatte.css"
import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import ColorifyTemplate from "./ColorifyTemplate"
import axios from "axios"
import { useContext } from "react";
import Eamilstorconetxt from "../store/EmailContext"




               


const Palattes=()=>{
    


    const [filtered,Setfiltered]=useState([])
    const [ischanged,Setischanged]=useState(1)
    const [addNew,SetaddNew]=useState(2)
    const[deletes,Setdeletes]=useState(1)
    const deleted={emailID:null }
    const EmailCtx=useContext(Eamilstorconetxt)
    const email=EmailCtx.email
const fecthpalattes= async()=>{
    try{
        let response= await axios.get("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/" + "colors.json")
    
        let objs=response.data
        let colorplates=[]
        for(let plate in objs){
      
           
           if(objs[plate].emailID===email){
            colorplates.push({fireid:plate,...objs[plate]})
            }
         
       
        }
        Setfiltered(colorplates)
    }
    // ...plate,
  catch(error){

  }
      
}

const changes=()=>{
    Setischanged((prve)=>{ return prve+1}) 
    console.log("Hi")
}
const addNewHandler=()=>{
    SetaddNew((prev)=>{return prev+1})
}
const deleteHandler= async(firekey)=>{

   



    Setdeletes((prev)=>{ return prev+1})
    console.log('delete')
}

    useEffect((
        
      ()=>{

        fecthpalattes()
      
            //  const filtreed=   dummy_data.filter((each)=>{
            // return each.email==="Aaron"
            // })
            // Setfiltered((prev)=>{ return filtreed })
            
    }),[email,ischanged,addNew,deletes])

   const palattesfinal= filtered.map((eachcolor)=>{
        return <Colorify color={eachcolor.code} key={eachcolor.id} id={eachcolor.id} fireid={eachcolor.fireid} ischanges={changes} Ondelete={deleteHandler} />
       })


    return(
        <main className="palatttes" >
          <main className="clrtmpt">  <ColorifyTemplate  addnew={addNewHandler}  /></main>
              {palattesfinal}
        </main>
    )


}

export default Palattes;