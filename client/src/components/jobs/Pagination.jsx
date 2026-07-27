export default function Pagination({
    page,
    totalPages,
    setPage,
}) {
    return (
        <div className="flex justify-center items-center gap-4 mt-8">

            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Previous
            </button>

            <span className="font-medium">
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Next
            </button>

        </div>
    );
}