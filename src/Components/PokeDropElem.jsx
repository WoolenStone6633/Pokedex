import { Link } from "react-router-dom";
import css from "./PokeDropElem.module.css"

export default function PokeDropElem ({name, pokeNum}) {
    return (
        <Link to={`PokeEntry/${pokeNum}`}>
            <div className={css.dropElement}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`}></img>
                <p>{name}</p>
            </div>
        </Link>
    )
}