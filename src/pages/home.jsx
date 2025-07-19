import './home.css';
import hero_icon from '../assets/images/hero-icon.svg';

export function Home() {
    return (
        <>
            <div className="hero-text">
                Designing with empathy, developing with precision to create meaningful user experiences.
            </div>
            <img src={hero_icon} alt="Hero Icon" className='hero-icon' />
        </>
    );
}