import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function Input({
    label,
    type = "text",
    placeholder,
    register,
    error,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const actualType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (
        <div className="space-y-2">

            <label
                className="text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <div className="relative">

                <input
                    type={actualType}
                    placeholder={placeholder}
                    {...register}
                    className={clsx(
                        "w-full rounded-xl border bg-white px-4 py-3 transition outline-none",

                        error
                            ? "border-red-500"
                            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    )}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-3 text-slate-500"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                )}

            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}