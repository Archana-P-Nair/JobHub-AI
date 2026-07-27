import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { login, logout, user, isAuthenticated } = useAuth();

    const fakeLogin = () => {
        login(
            {
                id: "1",
                name: "Archana",
                email: "archana@example.com",
                role: "candidate",
            },
            "fake-jwt-token"
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">JobHub AI</h1>

            {isAuthenticated ? (
                <>
                    <p>Welcome, {user.name}</p>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={fakeLogin}
                >
                    Fake Login
                </button>
            )}
        </div>
    );
}