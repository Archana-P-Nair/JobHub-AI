export default function AuthLayout({
    title,
    subtitle,
    children,
}) {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-blue-600">
                        JobHub AI
                    </h1>

                    <h2 className="mt-5 text-2xl font-semibold">
                        {title}
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {subtitle}
                    </p>

                </div>

                {children}

            </div>

        </div>
    );
}