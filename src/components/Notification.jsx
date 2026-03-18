export default function Notification({ type, message }) {
    if (type === 'success') {
        return (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg fixed top-5 right-5">
                ✅ {message}
            </div>
        );
    } else if (type === 'error') {
        return (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg fixed top-5 right-5">
                ❌ {message}
            </div>
        );
    }
}