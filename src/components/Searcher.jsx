export default function Searcher({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search characters..."
            value={value}
            onChange={onChange}
            className="w-1/2 p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        />
    );
}