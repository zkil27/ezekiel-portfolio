import './Home.css';
import hero_icon from '../assets/images/hero-icon.svg';
import AnimatedContent from '../components/AnimatedContent';
import SplitText from '../components/SplitText';
import { ProjectCard } from '../components/ProjectCard';
import { MediaContainer } from '../components/MediaContainer';
import { useVideoTransition } from '../hooks/UseVideoTransition';
import { ProjectCards_Data} from '../data/ProjectCards_Data';

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
                    "My Best Works"
                } /></div>
            <div className="project-showcase-cont">
                
                <div className="project-showcase-cont-text">
                    <ul className='project-showcase-list'>
                        {ProjectCards_Data.map((project) => (
                            <li key={project.id}>
                                <ProjectCard 
                                    title={project.title}
                                    tags={project.tags}
                                    descriptions={project.descriptions}
                                    buttonLink={project.buttonLink}
                                    threshold={project.threshold}
                                    videoSrc={project.videoSrc}
                                    onVideoChange={handleVideoChange}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <MediaContainer className= 'project-showcase-cont-video'
                    src={currentVideo} 
                    isTransitioning={isTransitioning} 
                />
            </div>
        </div>
    );
}

