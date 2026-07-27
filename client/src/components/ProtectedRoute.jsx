import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
    const {
        loading,
        isAuthenticated,
        user,
    } = useAuth();

    // Wait until authentication state is restored
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading...
                </h2>
            </div>
        );
    }

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // User has the wrong role
    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    // Everything is OK
    return children;
}