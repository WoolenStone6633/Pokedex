import { useLoaderData } from "react-router-dom"
import PokeBasicInfo from "../Components/PokeBasicInfo"
import PokeForm from "../Components/PokeForm"
import PokeVar from "../Components/PokeVar"

//Takes pokemon api URL and returns an organized structure of the pokemons information
export default function PokeEntry() {
    const [pokeInfo, pokeSpecies] = useLoaderData()

    const engIndex = () => {
        var index = 0
        while (pokeSpecies.flavor_text_entries && pokeSpecies.flavor_text_entries[index].language.name != "en") {
            index++
        }
        return index
    }

    return (
        <>
            <PokeBasicInfo imgURL={pokeInfo.sprites.front_default} name={"Name: " + pokeInfo.name} typings={pokeInfo.types}/>
            <p className="description">Description: {pokeSpecies && pokeSpecies.flavor_text_entries.length > 0 && pokeSpecies.flavor_text_entries[engIndex()].flavor_text.replaceAll('', '\n')}</p>
            <section className="forms">
                Forms:
                {pokeInfo.forms.length > 1 ?
                    pokeInfo.forms.map(form => <PokeForm key={form.name} formURL={form.url}/>) : " None"
            }
            </section>
            <section className="varients">
                Variations:
                {(pokeSpecies && pokeSpecies.varieties.length > 1) ? 
                pokeSpecies.varieties.map(varient => <PokeVar key={varient.pokemon.name} origName={pokeInfo.name} varientURL={varient.pokemon.url}/>) : " None"}
            </section>
        </>
    )
}

//loader function
export const pokeLoader = async ({ params }) => {
    const URL = 'https://pokeapi.co/api/v2/pokemon'
    const { pokemon } = params

    const [res1, res2] = await Promise.all([
        fetch(`${URL}/${pokemon}`),
        fetch(`${URL}-species/${pokemon}`)
    ])
    
    const pokeInfo = await res1.json()
    const pokeSpec = await res2.json()

    return [pokeInfo, pokeSpec]
}