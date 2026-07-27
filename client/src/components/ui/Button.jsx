import Spinner from "./Spinner";

export default function Button({
    children,
    type = "button",
    loading = false,
    disabled = false,
    className = "",
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-lg
                py-3
                font-semibold
                transition
                duration-200
                flex
                justify-center
                items-center
                gap-2
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${className}
            `}
        >
            {loading ? (
                <>
                    <Spinner />
                    Logging in...
                </>
            ) : (
                children
            )}
        </button>
    );
}