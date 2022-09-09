import React, { useEffect, useState } from "react";

export default function SearchBar (){
    /* const dispatch = useDispatch() */
    const [input, setInput] = useState('')

    const handleChange=(e)=>{
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
       
        if(input.toLowerCase().replace(/ /g, "").length > 0){
            /* dispatch(getPokeByName(input)) */
            /* callBack(1) */
            setInput('')
        }
        if(input.toLowerCase().replace(/ /g, "").length === 0 ){
            alert('Please type something!')
            setInput('')        
        }
    }


    return(
        <div>
            <input type='search' value={input} placeholder='Search by name' onChange={(e)=>handleChange(e)} /* key={1} *//>
            <button   type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )

}
