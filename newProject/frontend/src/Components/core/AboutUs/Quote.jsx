import React from 'react'
import HighlightText from '../../Common/HighlightText'
const Quote = () => {
    return (
        <div className='text-white text-2xl font-bold text-center mx-10 '>
            we are passionate about revloutinizing the way we learn  , our Innovative platform
            {" "} <HighlightText text={"combines Technology"}></HighlightText>
            <span className='text-orange-400'>
                {" "}
                expretise
            </span>

            <span className='text-orange-400'>
                {" "}
                , and communtiy  to create 
            </span>
            <span className>
               {" "} an unparalleled <HighlightText text={"education expreience"} /> 
            </span>
        </div>
    )
}

export default Quote