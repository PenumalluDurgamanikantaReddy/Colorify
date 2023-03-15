



import "./colorify.css"
import "./colorifytemplate.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux"
import { useContext } from "react";
import Eamilstorconetxt from "../store/EmailContext"




const ColorifyTemplate=(props)=>{
const [red,Setred]=useState(0)
const [green,Setgreen]=useState(0)
const [blue,Setblue]=useState(0)
const [color,Setcolor]=useState({})
const [add,Setadd]=useState(false)
const [onlyClr,SetonlyClr]=useState([])
const EmailCtx=useContext(Eamilstorconetxt)
const emailuser=useSelector((state)=>{ return state.email.emailname})

const colorfromserver=props.color

const redHandler=(event)=>{
    Setred(event.target.value)
   
console.log(emailuser)
}
const greenHandler=(event)=>{
    Setgreen(event.target.value)
  

}
const blueHandler=(event)=>{
    Setblue(event.target.value)
   

}

useEffect(()=>{
    SetonlyClr(()=>{
        return [red,green,blue]
    })
    Setcolor((prev)=>{
        // console.log(color)
    return {emailID:EmailCtx.email,code:[red,green,blue],id:Math.random().toString(36).substr(2, 5),}  
                                     
    })
    
},[red,green,blue])

const editHandler=(event)=>{
    // event.preventDefault()
    Setadd(true)
}

const removeHandler=()=>{

}

const submitHandler= async(event)=>{
event.preventDefault()
Setadd(false)
// console.log(EmailCtx.email)
try{
    const response= await axios.post("https://colorify-auth-3f0de-default-rtdb.firebaseio.com/colors.json",color)
}
catch (error){
 console.log(error.message)
}
// console.log(`(${color[0]}${color[1]}${color[2]})`)
props.addnew()
}

return(
    <form onSubmit={submitHandler}>{
        !add?
        <main  className="selected">
         <main className="added" > <div className="outputtem" style={{ backgroundColor:  `rgb(${colorfromserver})` }}>+</div></main>
      <main className="editcontrols">  <button className="edit" onClick={editHandler}>ADD</button> <button>Remove</button></main>
        </main>:

       
      <main>
      <main className="palatteconatiner">
      {/* <div className="output" style={{ backgroundColor: `rgb(${red},${green},${blue})` }}>ff</div> */}
      <div className="output" style={{ backgroundColor:  `rgb(${onlyClr})` }}>Color</div>
    {/* <div className="output" style={{ backgroundColor: `rgb(11,22,33)` }}>ff</div> */}
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
export default ColorifyTemplate;






