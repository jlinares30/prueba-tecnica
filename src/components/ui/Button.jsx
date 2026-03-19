export default function Button({ onClick, children, className, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`mt-4 px-4 py-2 rounded-lg ${className} cursor-pointer transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
}
