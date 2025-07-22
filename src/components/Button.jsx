import './Button.css'

export function Button({ children, onClick, fillColor = "#2941B5", textColor = "#FFFFFF" }) {
    return (
        <button 
            className="custom-button" 
            onClick={onClick}
            style={{
                '--fill-color': fillColor,
                '--text-color': textColor
            }}
        >
            {children}
        </button>
    );
}
