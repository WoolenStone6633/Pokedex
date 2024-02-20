import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function SearchBar() {
    const url = 'https://pokeapi.co/api/v2/pokemon-species?limit=1025'
    const [pokemonList, setPokemonList] = useState(null)
    const navigate = useNavigate()

    useEffect (() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setPokemonList(data.results.sort((a, b) => a.name < b.name ? -1 : 1)))
    }, [])

    const submit = e => {
        if (e.keyCode == 13) {
            const length = pokemonList.length
            const pokemon = e.target.value.toLowerCase()
            var i = Math.floor(length/2)
            var start = 0
            var end = length - 1
            while (start <= end) {    
                pokemon < pokemonList[i].name ? (end = i - 1, i = Math.floor((start + end) / 2))
                : pokemon > pokemonList[i].name ? (start = i + 1, i = Math.floor((start + end) / 2))
                : pokemon == pokemonList[i].name && (navigate(`/Pokedex/PokeEntry/${pokemonList[i].url.substring(42, pokemonList[i].url.length - 1)}`),  end = start++)
            }
        }
    }

    return (
        <input className="search-bar" type="text" placeholder="Search" onKeyDown={submit}/>
    )
}