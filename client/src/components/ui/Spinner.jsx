export default function Spinner({
    size = "h-5 w-5",
    color = "border-white",
}) {
    return (
        <div
            className={`
                ${size}
                animate-spin
                rounded-full
                border-4
                border-t-transparent
                ${color}
            `}
        />
    );
}