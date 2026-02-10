
type inputTypeAttribute = "text"
  | "password"
  | "email"
  | "button"
  | "url"
  | "tel"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "checkbox"
  | "radio"
  | "image"
  | "submit"
  | "reset"
  | "hidden"
  | "color"

interface inputDetails {
    label: string,
    placeHolder: string,
    // HTMLInputElement  yeh batata hai ki , event kis html element se aaa rha hai .
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, // this is correct you are definig type of function.
    value: string
    type ? : inputTypeAttribute ,

}
const Inputform = ({ label,
    placeHolder,
    value ,type }: inputDetails) => {
    
    const inputlabelStyle = "block text-gray-700 text-sm font-bold mb-2"
    const inputBoxStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    
    return <>
        <div className="mt-4 mb-4 gap">

            <label className={inputlabelStyle}>
                {label}
            </label>
            {/* in here type is an attribute of the input box , each one serves specific functionality */}
            <input className={inputBoxStyle} id="username" type={type||"string"} placeholder={placeHolder} />

           
{value}

        </div>


    </>
}

export default Inputform