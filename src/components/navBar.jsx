import { Link } from "react-router-dom"
import "./navBar.css"
import HomeIcon from '../assets/images/fafafa.svg';

export function NavBar(){
    return(
        <>
            <nav>
                <img src={HomeIcon} alt="Home Icon" className="home-icon" />

                <div className="nav-container">
                    
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
            </nav>
        </>
    )
}