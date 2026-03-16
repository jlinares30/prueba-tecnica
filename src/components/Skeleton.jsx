export default function Skeleton({width, height}) {
    return (
        <div className="animate-pulse">
            <div className={`bg-gray-300 rounded ${width} ${height}`}></div>
        </div>
    );
}