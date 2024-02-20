import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import css from "./SearchBar.module.css"
import PokeDropElem from "./PokeDropElem"

export default function SearchBar() {
    const url = 'https://pokeapi.co/api/v2/pokemon-species?limit=1025'
    const [pokemonList, setPokemonList] = useState(null)
    const [pokeListLength, setPokeListLength] = useState(null)
    const navigate = useNavigate()

    useEffect (() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {setPokemonList(data.results.sort((a, b) => a.name < b.name ? -1 : 1)), setPokeListLength(data.results.length)})
    }, [])

    const userInput = e => {
        if (e.keyCode == 13)
            submit(e.target.value.toLowerCase())
        else {
            var i = 0
            while (i < pokeListLength && e.target.value.toLowerCase() >= pokemonList[i].name.substring(0, e.target.value.length) && e.target.value != '') {
                (e.target.value.toLowerCase() == pokemonList[i].name.substring(0, e.target.value.length) && e.target.value != '') && <PokeDropElem pokeNum={pokemonList[i].url.substring(42, pokemonList[i].url.length - 1)} name={pokemonList[i].name}/>
                i++
            }
        }
    }

    const submit = (pokemon) => {
        var i = Math.floor(length/2)
        var start = 0
        var end = pokeListLength - 1
        while (start <= end) {    
            pokemon < pokemonList[i].name ? (end = i - 1, i = Math.floor((start + end) / 2))
            : pokemon > pokemonList[i].name ? (start = i + 1, i = Math.floor((start + end) / 2))
            : pokemon == pokemonList[i].name && (navigate(`/Pokedex/PokeEntry/${pokemonList[i].url.substring(42, pokemonList[i].url.length - 1)}`),  end = start++)
        }
    }

    return (
        <input className={css.searchBar} type="text" placeholder="Search" onKeyDown={userInput}/>
    )
}