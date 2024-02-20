import { Link } from "react-router-dom";

export default function PokeDropElem (pokeNum, name) {
    console.log('working')
    
    return (
        <Link to={`PokeEntry/${pokeNum}`}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`}/>
            <p>{name}</p>
        </Link>
    )
}