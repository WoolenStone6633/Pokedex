import { useEffect, useState } from "react"
import PokeBasicInfo from "./PokeBasicInfo"

// displays the varient of a pokemon
export default function PokeVar({origName, varientURL}) {
    const [pokeVar, setPokeVar] = useState(null)

    useEffect(() => {
        fetch(varientURL)
          .then(res => res.json())
          .then(data => setPokeVar(data))
      }, [])

    return (
        <div>
            {pokeVar && origName != pokeVar.name && 
                <PokeBasicInfo imgURL={pokeVar.sprites.front_default} name={pokeVar.name} typings={pokeVar.types}/>
            }
        </div>
    )
}