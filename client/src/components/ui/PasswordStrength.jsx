export default function PasswordStrength({
    password,
}) {

    let strength = 0;

    if (password.length >= 6) strength++;

    if (/[A-Z]/.test(password)) strength++;

    if (/[0-9]/.test(password)) strength++;

    if (/[^A-Za-z0-9]/.test(password))
        strength++;

    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
    ];

    const labels = [
        "Weak",
        "Fair",
        "Good",
        "Strong",
    ];

    return (
        <div className="mt-2">

            <div className="h-2 rounded bg-gray-200">

                <div
                    className={`h-2 rounded ${colors[strength - 1] || ""}`}
                    style={{
                        width: `${strength * 25}%`,
                    }}
                />

            </div>

            {password && (
                <p className="mt-1 text-sm text-slate-600">
                    {labels[strength - 1] || "Very Weak"}
                </p>
            )}

        </div>
    );

}