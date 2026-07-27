const statuses = [
    "Applied",
    "Under Review",
    "Interview",
    "Hired",
    "Rejected",
];

export default function StatusDropdown({
    value,
    onChange,
}) {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="border rounded-lg px-3 py-2"
        >
            {statuses.map((status) => (
                <option
                    key={status}
                    value={status}
                >
                    {status}
                </option>
            ))}
        </select>
    );
}