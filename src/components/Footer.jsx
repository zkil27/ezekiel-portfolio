import './Footer.css';
import footer_icon from '../assets/images/footer-icon.svg';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-top-cont">
                    <div className="footer-left-cont">
                        <img src={footer_icon} alt="" className="footer-icon" />
                        <br />
                        <br />
                        Designing with empathy, developing with precision <br />
                        to create meaningful user experiences.


                    </div>

                    <div className="nav-cont">
                        <ul className="footer-nav">
                        <p>Pages</p>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About Me</Link>
                        </li>
                        <li>
                            <Link to="/Contact">Reach Out</Link>
                        </li>
                    </ul>

                    <ul className="socials-nav">
                        <p>Socials</p>
                        <li>
                            <Link to="https://www.facebook.com/ezzyxkl">Facebook</Link>
                        </li>
                        <li>
                            <Link to="https://www.linkedin.com/feed/">LinkedIn</Link>
                        </li>
                        <li>
                            <Link to="https://github.com/zkil27">Github</Link>
                        </li>
                    </ul>
                    </div>
                    

                </div>
                <div className="footer-bottom-cont">
                    <hr />
                    <p style={{ textAlign: 'center' }}>
                        © {new Date().getFullYear()} AKO SI EZEKIEL. This website is for demonstration purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
}
