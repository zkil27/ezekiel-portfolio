import { Link } from "react-router-dom"
import { Button } from "./Button";
import nav_icon from '../assets/images/fafafa.svg';
import AnimatedContent from "./AnimatedContent";

import "./navBar.css"




export function NavBar(){
    return(
        <>
            <AnimatedContent reverse={true}>
            <nav>
                <Link to="/"><img src={nav_icon} alt="Home Icon" className="home-icon" /></Link>

                <div className="nav-container">            
                    <Link to="/projects">
                        <Button>RECENT PROJECTS</Button>
                    </Link>

                    <Link to="/about">
                        <Button>ABOUT</Button>
                    </Link>
                    <Link to="/contact">
                        <Button>REACH OUT</Button>
                    </Link>
                    
                </div>
            </nav>
            </AnimatedContent>
        </>
    )
}