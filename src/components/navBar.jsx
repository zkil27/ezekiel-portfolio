import { Link } from "react-router-dom"
import "./navBar.css"

export function NavBar(){
    return(
        <>
            <div className="container">
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/about">
                    <button>About</button>
                </Link>
                <Link to="/contact">
                    <button>Contact</button>
                </Link>
                <Link to="/projects">
                    <button>Projects</button>
                </Link>
            </div>

        </>
    )
}