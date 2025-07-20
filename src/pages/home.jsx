import './home.css';
import hero_icon from '../assets/images/hero-icon.svg';
import AnimatedContent from '../components/AnimatedContent';
import SplitText from '../components/SplitText';
import { Tag } from '../components/Tag';
import { Button } from "../components/Button";
import { ProjectCard } from '../components/ProjectCard';
import { useState } from 'react';


export function Home() {
    const [currentVideo, setCurrentVideo] = useState("/videos/clutch.mp4");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleVideoChange = (newVideoSrc) => {
        if (newVideoSrc !== currentVideo) {
            setIsTransitioning(true);
            
            // Fade to white first (200ms)
            setTimeout(() => {
                setCurrentVideo(newVideoSrc);
                // Then fade out from white (200ms)
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 200);
            }, 200);
        }
    };

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
                
            </div>
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
                                    "Built to celebrate the most exciting moments in Valorant and create a community hub for players to showcase their skills."
                                ]}
                                buttonLink="https://www.facebook.com/kel.escueta.2024"
                                threshold={0.5}
                                videoSrc="/videos/clutch2.mp4"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            
                        </li>
                    </ul>
                </div>
                <div className="video-container">
                    <video 
                        key={currentVideo}
                        src={currentVideo}
                        autoPlay 
                        muted 
                        loop 
                        className="project-video"
                    ></video>
                    <div className={`white-overlay ${isTransitioning ? 'active' : ''}`}></div>
                </div>
            </div>
        </div>
    );
}
