import { useEffect, useState } from "react"
import PokeBasicInfo from "./PokeBasicInfo"
import PokeForm from "./PokeForm"
import PokeVar from "./PokeVar"

// displays the information about a pokemon
export default function PokeInfo({pokemon}) {
    const [pokeSpecies, setPokeSpecies] = useState(null)

    useEffect(() => {
        fetch(pokemon.species.url)
          .then(res => res.json())
          .then(data => setPokeSpecies(data))
    }, [])

    const engIndex = () => {
        var index = 0
        while (pokeSpecies.flavor_text_entries && pokeSpecies.flavor_text_entries[index].language.name != "en") {
            index++
        }
        return index
    }
    
    return (
        <>
            <PokeBasicInfo imgURL={pokemon.sprites.front_default} name={"Name: " + pokemon.name} typings={pokemon.types}/>
            <p className="description">Description: {pokeSpecies && pokeSpecies.flavor_text_entries.length > 0 && pokeSpecies.flavor_text_entries[engIndex()].flavor_text.replaceAll('', '\n')}</p>
            <section className="forms">
                Forms:
                {pokemon.forms.length > 1 ?
                    pokemon.forms.map(form => <PokeForm key={form.name} formURL={form.url}/>) : " None"
            }
            </section>
            <section className="varients">
                Variations:
                {(pokeSpecies && pokeSpecies.varieties.length > 1) ? 
                pokeSpecies.varieties.map(varient => <PokeVar key={varient.pokemon.name} origName={pokemon.name} varientURL={varient.pokemon.url}/>) : " None"}
            </section>
        </>
    )
}