import { Link } from "react-router-dom";

//Takes the pokemon's name and image url and then returns a card displaying the pokemon name and image
export default function PokeCard({...props}) {
    const POKEIMGURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    const pokePage = `pokeEntry/${props.name}`
    
    return (
        <Link to={`../${pokePage}`}>
            <div className="pokeCard">
                <img src={POKEIMGURL + props.pokeNum}></img>
                <p className="pokeName">{props.name.replaceAll('-', ' ')}</p>
            </div>
        </Link>
    )
}