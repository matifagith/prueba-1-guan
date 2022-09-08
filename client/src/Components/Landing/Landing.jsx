import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div>
            <Link to='/home'>Ingresar</Link>
            <h1>
                Landing ABM
            </h1>
        </div>
    )
}