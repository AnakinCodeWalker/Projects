import type  { ReactElement } from "react"

interface ButtonProps{
variants : "primary"|"secondary"|"Danger",
text:string,    
startItem ?:ReactElement,
endItem ? : ReactElement,
}

// if the varaint is primary or secondary style will be provided accordingly.
const variantClasses ={
    "primary":"bg-purple-600 text-white flex",
    "secondary" : "bg-purple-200 text-purple-600 flex",
    "Danger" : "bg-red-200 text-white-600 flex",
}

// as this style is common i put into this and used it for future
const defaultStyles = "px-4 py-2 rounded-md font-light items-center  " 


// it will check ki object mai variants ki value kiss key se match krti hai , uski value aayegi

// variantClasses[variants = primary ] --> object mai primary key value evaluate ho jayegi.
const Buttons = ({variants,startItem,text}:ButtonProps) => {
  return <button className={variantClasses[variants] + " " + defaultStyles}>
<div className="pr-4">{startItem}</div>
{text}

    </button>
  
}

export default Buttons