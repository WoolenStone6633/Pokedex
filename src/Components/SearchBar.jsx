import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import css from "./SearchBar.module.css"
import PokeDropElem from "./PokeDropElem"

export default function SearchBar() {
    const url = 'https://pokeapi.co/api/v2/pokemon-species?limit=1025'
    const [pokemonList, setPokemonList] = useState(null)
    const [pokeListLength, setPokeListLength] = useState(null)
    const [searchArr, setSearchArr] = useState([{name: null, num: null}])
    const navigate = useNavigate()

    useEffect (() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {setPokemonList(data.results.sort((a, b) => a.name < b.name ? -1 : 1)), setPokeListLength(data.results.length)})
    }, [])

    useEffect (() => {
        searchArr[0].name == null ? document.getElementById('search').style.visibility = 'hidden'
        : document.getElementById('search').style.visibility = 'visible'
    }, [searchArr])

    const keyInput = e => {
        if (e.keyCode == 13)
            submit(e.target.value.toLowerCase())
    }

    const changeInput = e => {
        var i = 0
        var poke
        var temp = [{name: null, num: null}]
        while (i < pokeListLength && pokemonList[i].name.substring(0, e.target.value.length) <= e.target.value.toLowerCase() && e.target.value != '') {
            (e.target.value.toLowerCase() == pokemonList[i].name.substring(0, e.target.value.length) && e.target.value != '') && (
                poke = {
                    name: pokemonList[i].name,
                    num: pokemonList[i].url.substring(42, pokemonList[i].url.length - 1)
                },
                temp[0].name ==  null ? 
                    temp = [poke]
                : 
                    temp = [...temp, poke]
            )
            i++
        }

        // adds or removes the scrollable section to the results
        temp.length > 11 ? document.querySelector('.search-results').classList.add('search-results-overflow') 
        : document.querySelector('.search-results').classList.remove('search-results-overflow')
        
        setSearchArr([...temp])
    }

    const submit = pokemon => {
        console.log(pokemon)
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
        <>
            <div className="search-wrapper">
                <input className={css.searchBar} type="text" placeholder="Search" onKeyDown={keyInput} onChange={e => changeInput(e)}/>
                <div className="search-results" id="search">
                    {searchArr[0].name ? searchArr.map(pokemon => {
                        return <PokeDropElem key={pokemon.name} name={pokemon.name} pokeNum={pokemon.num}/>
                    }): null}
                </div>
            </div>
        </>
    )
}