import './home.css';
import hero_icon from '../assets/images/hero-icon.svg';
import AnimatedContent from '../components/AnimatedContent';
import SplitText from '../components/SplitText';

export function Home() {
    return (
        <>
            
                <div className="hero-text">
                    <SplitText text={
                        "Designing with empathy, developing with precision to create meaningful user experiences."
                    } />
                </div>
                <AnimatedContent>
                <img src={hero_icon} alt="Hero Icon" className='hero-icon' />
            </AnimatedContent>

            <br />
            <br />

            <div className="layon-text">

                <SplitText  text={
                    "I aim to craft experiences that matter—interfaces that are simple yet powerful, accessible yet beautiful. Because design is not about me; it’s about those who use it."
                }/>
            </div>

        </>
    );
}