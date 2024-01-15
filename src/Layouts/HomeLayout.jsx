import { Outlet } from "react-router-dom"

export default function HomeLayout() {
    var showingAll = true
    var showingRegion = false
    var showingGeneration = false
    var url = "url1"

    const sortClicked = () => {
        var allButVis = document.getElementById("allBut")
        var regButVis = document.getElementById("regBut")
        var genButVis = document.getElementById("genBut")

        if (allButVis.hidden == false || regButVis.hidden == false || genButVis.hidden == false) {
            allButVis.hidden = true
            regButVis.hidden = true
            genButVis.hidden = true
        } else {
            showing()
        }
    }

    const showing = () => {
        var allButVis = document.getElementById("allBut")
        var regButVis = document.getElementById("regBut")
        var genButVis = document.getElementById("genBut")
        
        if (showingAll) {
            allButVis.hidden = true
            regButVis.hidden = false
            genButVis.hidden = false
        } else if (showingRegion) {
            allButVis.hidden = false
            regButVis.hidden = true
            genButVis.hidden = false
        } else if (showingGeneration) {
            allButVis.hidden = false
            regButVis.hidden = false
            genButVis.hidden = true
        }
    }

    const sortByAll = () => {
        url = "url1"
        showingAll = true
        showingRegion = false
        showingGeneration = false
        showing()
    }

    const sortByReg = () => {
        url = "url2"
        showingAll = false
        showingRegion = true
        showingGeneration = false
        showing()
    }

    const sortByGen = () => {
        url = "url3"
        showingAll = false
        showingRegion = false
        showingGeneration = true
        showing()
    }

    return (
        <>
            <header className="homeHeader">
                <p>Pokedex</p>
                <button className="sortButton" onClick={sortClicked}>Sort by</button> {/* All, Region, Generation */}
                <button id="allBut" onClick={sortByAll} hidden>All</button>
                <button id="regBut" onClick={sortByReg} hidden>Region</button>
                <button id="genBut" onClick={sortByGen} hidden>Generation</button>
            </header>
            <main>
                <Outlet/> {/*Pass a variable with url?*/}
            </main>
        </>
    )
}