import { useState, useEffect } from "react"
import PokeCard from "./PokeCard"

//For kalos, fetch all the pokedexes and then combine them using array destructoring?

export default function Region ({url}) {
    const [pokedex, setPokedex] = useState(null)
    
    useEffect(() => {
        let urlArr = null
        if (url.includes("12" && "13" && "14")) {
            urlArr = url.split(',').splice(1, 3)
        }

        if (urlArr != null) {
            setPokedex(prevPokedex => prevPokedex = null)
            Promise.all(urlArr.map(url =>
                fetch(url)
                    .then(res => res.json())
                    .then(data => setPokedex(prevPokedex => prevPokedex ? prevPokedex.concat(data.pokemon_entries) : prevPokedex = data.pokemon_entries))
            ))
        } else {
            fetch(url)
                .then(res => res.json())
                .then(data => setPokedex(data.pokemon_entries))
        }
    }, [url])
    
    return (
        <>
            {pokedex ? pokedex.map(poke => {
                return <PokeCard key={poke.pokemon_species.name} name={poke.pokemon_species.name} pokeNum={poke.pokemon_species.url.substring(42, poke.pokemon_species.url.length-1) + '.png'}/>
            }) : null}
        </>
    )
}