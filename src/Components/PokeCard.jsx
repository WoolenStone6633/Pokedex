import { Link } from "react-router-dom";

//Takes the pokemon's name and image url and then returns a card displaying the pokemon name and image
export default function PokeCard({name, pokeNum}) {
    const POKEIMGURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    const pokePage = `pokeEntry/${pokeNum}`
    
    return (
        <Link to={`../${pokePage}`}>
            <div className="pokeCard">
                <img src={POKEIMGURL + pokeNum + '.png'}></img>
                <p className="pokeName">{name.includes('ho-oh') ? name : name.split('-')[0]}</p>
            </div>
        </Link>
    )
}