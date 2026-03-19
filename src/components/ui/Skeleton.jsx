export default function Skeleton({width, height}) {
    return (
        <div className="animate-pulse">
            <div className={`bg-gray-600 rounded ${width} ${height}`}></div>
        </div>
    );
}