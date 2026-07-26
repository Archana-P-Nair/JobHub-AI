import { useEffect, useState } from "react";
import { checkHealth } from "./services/healthService";

function App() {
    const [message, setMessage] = useState("Connecting...");

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const data = await checkHealth();
                setMessage(data.message);
            } catch (error) {
                setMessage("Failed to connect to backend");
                console.error(error);
            }
        };

        fetchHealth();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl font-bold text-blue-600">
                JobHub AI
            </h1>

            <p className="text-lg text-gray-700">
                {message}
            </p>
        </div>
    );
}

export default App;