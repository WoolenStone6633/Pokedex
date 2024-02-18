import { Link} from "react-router-dom"

export default function Welcome () {

    const openPokedex = () => {
        document.querySelector('.left-door').classList.add('open-pokedex')
        document.querySelector('.right-door').classList.add('open-pokedex')
        document.querySelector('.outer-circle').classList.add('open-pokedex-button')
        document.querySelector('.inner-circle').classList.remove('inner-circle-hover')
        setTimeout ( () => {
            document.getElementById('cover-id').style.pointerEvents = 'none';
        }, 2400)
    }

    return (
        <div className="pokedex-cover" id={'cover-id'}>
            {/* short description of the website followed by enter button */}
            <div className="left-door"></div>
            <div className="outer-circle">
                <Link to={"All"} className="inner-circle inner-circle-hover" onClick={openPokedex}></Link>
            </div>
            <div className="right-door"></div>
        </div>
    )
}