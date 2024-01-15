import { useLoaderData, Link } from "react-router-dom"
import PokeInfo from "../Components/pokeInfo"

//Takes pokemon api URL and returns an organized structure of the pokemons information
export default function PokeEntry() {
    const pokeInfo = useLoaderData()

    return (
        <>
            <PokeInfo pokemon={pokeInfo}/>
        </>
    )
}

//loader function
export const pokeLoader = async ({ params }) => {
    const URL = 'https://pokeapi.co/api/v2/pokemon'
    const { pokemon } = params
    const res = await fetch(`${URL}/${pokemon}`)

    return res.json()
}