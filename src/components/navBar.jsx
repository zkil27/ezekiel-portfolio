import { Link } from "react-router-dom"
import { Button } from "./Button";
import "./navBar.css"
import nav_icon from '../assets/images/fafafa.svg';



export function NavBar(){
    return(
        <>
            <nav>
                <Link to="/"><img src={nav_icon} alt="Home Icon" className="home-icon" /></Link>

                <div className="nav-container">
                    
                    <Link to="/projects">
                        <Button>SIDE PROJECTS</Button>
                    </Link>

                    <Link to="/about">
                        <Button>ABOUT</Button>
                    </Link>
                    <Link to="/contact">
                        <Button>CONTACT</Button>
                    </Link>
                    
                </div>
            </nav>
        </>
    )
}