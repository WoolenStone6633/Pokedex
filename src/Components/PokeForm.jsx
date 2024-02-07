import { useEffect, useState } from "react"
import PokeBasicInfo from "./PokeBasicInfo"

// displays the form of a pokemon
export default function PokeForm({formURL}) {
    const [pokeForm, setPokeForm] = useState(null)

    useEffect(() => {
        fetch(formURL)
          .then(res => res.json())
          .then(data => setPokeForm(data))
      }, [])

    return (
        <>
            {pokeForm && 
                <PokeBasicInfo imgURL={pokeForm.sprites.front_default} name={pokeForm.form_name}/>
            }
        </>
    )
}