import './Footer.css';
import LoopText from './LoopText';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <LoopText curveAmount={0} speed={1} className="footer-loop-text" interactive={false}
                    marqueeText="MADE BY EZEKIEL"
                />
            </div>
        </footer>
    );
}   