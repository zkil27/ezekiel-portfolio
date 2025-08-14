import AnimatedContent from '../components/AnimatedContent';
import './About.css';

export function About() {
    return (
        <>
        <AnimatedContent>
            <div className="about-page">
                    <img src="/images/aboutImage.jpg" alt="Layon's Image" className='about-page-img' />
                    <p className='about-page-description'>I’m John Ezekiel Escueta, a second-year Bachelor of Science in Information Technology student with a passion for building efficient, user-focused digital solutions. My journey into tech started when I was a kid, constantly begging my parents to let me play games like Plants vs. Zombies on their computer. Watching my brother work on his own projects sparked my curiosity, and that curiosity grew into a commitment to understanding how technology works and how it can improve people’s lives. <br /> <br />

                    I see every project as something to be proud of because each one teaches me valuable lessons that shape my growth as a developer and designer. My approach to problem-solving combines research and trial-and-error—understanding the problem deeply, exploring different solutions, and refining what works. With skills in JavaScript, React.js, Python, PHP, MySQL, and UI/UX design through Figma, I enjoy working across the full stack while keeping user experience at the heart of every decision. <br /> <br />

                    My guiding principle is simple: Design with Empathy—because great technology starts with understanding the people who use it.</p>
            </div>
            </AnimatedContent>
        </>
    );
}
