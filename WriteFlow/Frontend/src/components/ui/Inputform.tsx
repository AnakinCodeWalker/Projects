interface inputDetails {
    label: string,
    placeHolder: string,
    onChange?: () => void, // this is correct you are definig type of function.
    value: string
}
const Inputform = ({ label,
    placeHolder,
    value }: inputDetails) => {

    return <>

        {label}{placeHolder}{value}

    </>
}

export default Inputform