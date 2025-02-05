import React from "react";

function HighLightText({text}){
    return (
        <span className="font-bold text-blue-25">
            {' '}
            {text}
            {' '}
        </span>
    )
}

export default HighLightText;