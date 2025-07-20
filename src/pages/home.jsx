import './home.css';
import hero_icon from '../assets/images/hero-icon.svg';
import AnimatedContent from '../components/AnimatedContent';
import SplitText from '../components/SplitText';
import { Tag } from '../components/Tag';
import { Button } from "../components/Button";
import { ProjectCard } from '../components/ProjectCard';
import { MediaContainer } from '../components/MediaContainer';
import { useVideoTransition } from '../hooks/UseVideoTransition';

export function Home() {
    const { currentVideo, isTransitioning, handleVideoChange } = useVideoTransition();

    return (
        <div className="home-page">
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
                <SplitText className='layon-title-text' text={"layon"} />
                <SplitText text={
                    "Driven by empathy and a love for clean code, I aim to create web experiences that are not only visually appealing but also intuitive and accessible to everyone."
                } />
            </div>
            <div className="project-showcase-title"><SplitText text={
                    "Proud Project Showcase"
                } /></div>
            <div className="project-showcase-cont">
                
                <div className="project-showcase-cont-text">
                    <ul className='project-showcase-list'>
                        <li>
                            <ProjectCard 
                                title="Interactive Valentine's Scratch Card Experience"
                                tags={[
                                    { text: "Interactive web app", size: "small" },
                                    { text: "Game", size: "small" },
                                    { text: "For fun", size: "small" },
                                    { text: "Not Real", variant: "warning", size: "small" }
                                ]}
                                descriptions={[
                                    "A web application that showcases a collection of clutch moments from the game Valorant, allowing users to view and share impressive plays. The app features a sleek design, smooth animations, and a user-friendly interface, making it easy for players to relive their best moments.",
                                    "Built to celebrate the most exciting moments in Valorant and create a community hub for players to showcase their skills."
                                ]}
                                buttonLink="https://www.facebook.com/kel.escueta.2024"
                                threshold={0.5}
                                videoSrc="/videos/clutch.mp4"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            <ProjectCard 
                                title="Interactive Valentine's Scratch Card Experience"
                                tags={[
                                    { text: "Interactive web app", size: "small" },
                                    { text: "Game", size: "small" },
                                    { text: "For fun", size: "small" },
                                    { text: "Not Real", variant: "warning", size: "small" }
                                ]}
                                descriptions={[
                                    "A web application that showcases a collection of clutch moments from the game Valorant, allowing users to view and share impressive plays. The app features a sleek design, smooth animations, and a user-friendly interface, making it easy for players to relive their best moments.",
                                    
                                ]}
                                buttonLink="https://www.facebook.com/kel.escueta.2024"
                                threshold={0.5}
                                videoSrc="/videos/clutch2.mp4"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            <ProjectCard 
                                title="Interactive Valentine's Scratch Card Experience"
                                tags={[
                                    { text: "Interactive web app", size: "small" },
                                    { text: "Game", size: "small" },
                                    { text: "For fun", size: "small" },
                                    { text: "Not Real", variant: "warning", size: "small" }
                                ]}
                                descriptions={[
                                    "A web application that showcases a collection of clutch moments from the game Valorant, allowing users to view and share impressive plays. The app features a sleek design, smooth animations, and a user-friendly interface, making it easy for players to relive their best moments.",
                                    
                                ]}
                                buttonLink="https://www.facebook.com/kel.escueta.2024"
                                threshold={0.5}
                                videoSrc="/images/clutch3.jpg"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                    </ul>
                </div>
                <MediaContainer 
                    src={currentVideo} 
                    isTransitioning={isTransitioning} 
                />
            </div>
        </div>
    );
}

