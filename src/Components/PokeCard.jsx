import { Link } from "react-router-dom"
import css from "./PokeCard.module.css"

//Takes the pokemon's name and image url and then returns a card displaying the pokemon name and image
export default function PokeCard({name, pokeNum}) {
    const POKEIMGURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    const pokePage = `pokeEntry/${pokeNum}`
    
    return (
        <Link to={`../${pokePage}`} className={css.pokeCard}>
            <img src={POKEIMGURL + pokeNum + '.png'}></img>
            {/* Fix all names with dashes like the parasdox pokemon */}
            <p>{name.includes('ho-oh') ? name : name.split('-')[0]}</p>
        </Link>
    )
}