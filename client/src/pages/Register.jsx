import AuthLayout from "../components/layout/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {

    return (

        <AuthLayout
            title="Create Your Account"
            subtitle="Join thousands of professionals using JobHub AI."
        >

            <RegisterForm />

        </AuthLayout>

    );

}