
import "./colorify.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux"
import { useContext } from "react";
import Eamilstorconetxt from "../store/EmailContext"
const Colorify=(props)=>{
const [red,Setred]=useState(0)
const [green,Setgreen]=useState(0)
const [blue,Setblue]=useState(0)
const [color,Setcolor]=useState({})
const deleted={emailID:null }
const [add,Setadd]=useState(false)
const [onlyClr,SetonlyClr]=useState([])
const [touched,Settouched]=useState(false)
const EmailCtx=useContext(Eamilstorconetxt)
const emailuser=useSelector((state)=>{ return state.email.emailname})
const firekey=props.fireid
const colorfromserver=props.color

const redHandler=(event)=>{
    Setred(event.target.value)
    Settouched(true)
console.log(emailuser)
}
const greenHandler=(event)=>{
    Setgreen(event.target.value)
    Settouched(true)

}
const blueHandler=(event)=>{
    Setblue(event.target.value)
    Settouched(true)

}

useEffect(()=>{
    SetonlyClr(()=>{
        return [red,green,blue]
    })
    Setcolor((prev)=>{
  
    return {emailID:EmailCtx.email,code:[red,green,blue],id:Math.random().toString(36).substr(2, 5),}  
                                     
    })
    
},[red,green,blue])

const editHandler=(event)=>{
   
    Setadd(true)
}

const removeHandler = async (event) => {
  event.preventDefault()
  
 
  try {
    let response = await axios.get("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/colors.json")
    console.log(response)
    let objs = response.data


    
    for (let plate in objs) {
      if (plate === firekey) {

      
        await axios.put("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/colors/" + plate + ".json", deleted)
     
      }
    }
  }
    catch(error){

    }

props.Ondelete()
}
const submitHandler= async(event)=>{
event.preventDefault()
Setadd(false)
console.log(EmailCtx.email)
try {
    let response = await axios.get("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/colors.json")
    console.log(response)
    let objs = response.data
    let colorplates = []
    let foundPlate = false
    
    for (let plate in objs) {
      if (plate === firekey) {

      
        await axios.put("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/colors/" + plate + ".json", color)
        foundPlate = true
      } else {
        colorplates.push(objs[plate])
      }
    }
    
    if (!foundPlate) {
      await axios.post("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/colors.json", color)
    } 
  } catch (error) {
    console.log(error)
  }
 props.ischanges()
}

return(
    <form onSubmit={submitHandler}>{
        !add?
        <main  className="selected">
         <main className="added" > <div className="output" style={{ backgroundColor:  `rgb(${colorfromserver})` }}>Color</div></main>
      <main className="editcontrols">  <button className="edit" onClick={editHandler}>Edit</button> <button onClick={removeHandler}>Remove</button></main>
        </main>:

       
      <main>
      <main className="palatteconatiner">
      {touched?
        <div className="output" style={{ backgroundColor:    `rgb(${onlyClr})` }}>Color</div>:
         <div className="output" style={{ backgroundColor:     `rgb(${colorfromserver})` }}>Color</div>
      }
      
      
      <main className="inputs">
      
      
     <input  type="range" onChange={redHandler} defaultValue ={red} min="0" max="255"></input>
     <input type="range"   onChange={greenHandler}  defaultValue ={green}  min="0" max="255"  ></input>
     <input type="range"   onChange={blueHandler}  defaultValue ={blue}      min="0" max="255"    ></input>
     <button className="Add"  onClick={submitHandler}>+</button>
    </main>
    </main>
      </main>
}
    </form>
  
   
)


}
export default Colorify;
