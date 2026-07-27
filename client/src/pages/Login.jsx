import AuthLayout from "../components/layout/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue your journey."
        >
            <LoginForm />
        </AuthLayout>
    );
}