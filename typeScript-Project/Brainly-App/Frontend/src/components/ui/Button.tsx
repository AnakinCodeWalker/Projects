import type { ReactElement } from "react"

interface ButtonProps{  // this is used as type of props means , props jo pass krenge usme yeh sb hona chahiye.

    variants : 'primary'|'secondary',
    size : 'sm'|'md' | 'lg',
    color:string,
    text : string,
    onClick? : ()=> void
    startIcon? : ReactElement     // another button element that we can send it
    endIcon ?: ReactElement   // could be an icon or image or some other react element
}


const Button = (props:ButtonProps) => {
  return (
    <div>{props.variants}{props.text}</div>
  )
}

export default Button