import './Home.css';
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
                    "Best of my work"
                } /></div>
            <div className="project-showcase-cont">
                
                <div className="project-showcase-cont-text">
                    <ul className='project-showcase-list'>
                        <li>
                            <ProjectCard 
                                title="1. HAHAHAHAHAHAH"
                                tags={[
                                    { text: "Interactive web app", size: "small" },
                                    { text: "Game", size: "small" },
                                    { text: "For Fun", size: "small" },
                                ]}
                                descriptions={[
                                    "A Valentine’s scratch card game designed for the web lets you unlock a personal message or image by scanning a QR code. When you scan the code, you’re directed to a digital scratch card with a Valentine’s theme. You use your mouse or finger to scratch off the virtual surface, and underneath is a surprise that’s been set up for you.", 
                                    
                                    "The game is built with JavaScript, CSS, and HTML, so it works in any browser without extra downloads. It’s a simple, interactive way to share something personal for Valentine’s Day and connects a physical gesture, scanning a code, with a playful online experience."
                                ]}
                                buttonLink="https://github.com/zkil27/CREEEEEEEEEEEEEEEEET"
                                threshold={0.5}
                                videoSrc="/images/clutch1.jpg"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            <ProjectCard 
                                title="2. ICTCPROJECT"
                                tags={[
                                    { text: "School Project", size: "small" },
                                    { text: "Full Stack", size: "small" },
                                    { text: "For Study", size: "small" },
                                    { text: "Not Finished", variant: "warning", size: "small" }
                                ]}
                                descriptions={[
                                    "This project is a simple PHP-based login and logout system designed for study and learning purposes using XAMPP. It demonstrates the basic principles of user authentication, including a login form, session management, and logout functionality.",
                                    
                                ]}
                                buttonLink="https://github.com/zkil27/ITCPROJECT"
                                threshold={0.5}
                                videoSrc="/images/clutch2.png"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            <ProjectCard 
                                title="3. COMPROGPROJECT"
                                tags={[
                                    { text: "School Project", size: "small" },
                                    { text: "Ordering", size: "small" },
                                    { text: "Array", size: "small" },
                                    { text: "Java", size: "small" },
                                    { text: "Finished", variant: "success", size: "small" }
                                ]}
                                descriptions={[
                                    "A Java console app for restaurant ordering lets you enter your name, pick menu items, choose how many to order, and select a payment method. It calculates your total with tax and any convenience fee, then gives you a receipt. The app uses arrays and the Scanner class to manage orders and handle input. It’s a simple way to practice Java basics.",
                                    
                                ]}
                                buttonLink="https://github.com/zkil27/COMPROGPROJECT"
                                threshold={0.5}
                                videoSrc="/images/clutch3.png"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            <ProjectCard 
                                title="4. HMMMMMMMMM"
                                tags={[
                                    { text: "idk", size: "small" }
                                ]}
                                descriptions={[
                                    "This is what happens when you ask your yoga instructor for “something that’ll stretch me out” and they take it literally. Honestly, if you squint, it’s either a human windmill or a stick figure that got tired of being two-dimensional. I’m not sure if this is a workout or an audition for being the next addition to a compass rose. Either way, I give it a perfect 90 degrees. -chatgpt lol",
                                    
                                ]}
                                buttonLink="https://x.com/ResNeXtGuesser/status/1557162329023795200"
                                threshold={0.5}
                                videoSrc="/images/clutch4.jpg"
                                onVideoChange={handleVideoChange}
                            />
                        </li>
                        <li>
                            <ProjectCard 
                                title="5. Minecrafot"
                                tags={[
                                    { text: "funny", size: "small" },
                                    { text: "haha", size: "small" }
                                ]}
                                descriptions={[
                                    "mneicarfat with ano hahahaha, hi po",
                                    
                                ]}
                                buttonLink="https://www.youtube.com/watch?v=3tMaQ18Scy0&t=144s"
                                threshold={0.5}
                                videoSrc="/images/clutch5.png"
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

