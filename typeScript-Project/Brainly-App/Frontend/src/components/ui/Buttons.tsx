import type  { ReactElement } from "react"

interface ButtonProps{
variants : "primary"|"secondary",
text:string,    
startItem ?:ReactElement,
endItem ? : ReactElement,
}

// if the varaint is primary or secondary style will be provided accordingly.
const variantClasses ={
    "primary":"bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-600",
}

// as this style is common i put into this and used it for future
const defaultStyles = "px-4 py-2 rounded-md font-light" 

const Buttons = ({variants,startItem,text}:ButtonProps) => {
  return <button className={variantClasses[variants]+""+defaultStyles}>
{startItem}
{text}

    </button>
  
}

export default Buttons