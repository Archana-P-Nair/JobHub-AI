import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const response = await loginUser(formData);

            login(response.user, response.token);

            toast.success("Welcome back!");

            if (response.user.role === "candidate") {
                navigate("/candidate");
            } else {
                navigate("/recruiter");
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                register={register("email", {
                    required: "Email is required",
                    pattern: {
                        value:
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                            "Enter a valid email",
                    },
                })}
                error={errors.email?.message}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                register={register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message:
                            "Minimum 6 characters",
                    },
                })}
                error={errors.password?.message}
            />

            <Button
                type="submit"
                loading={isSubmitting}
            >
                Login
            </Button>

            <p className="text-center text-gray-600">

                Don't have an account?

                <Link
                    to="/register"
                    className="text-blue-600 ml-2 font-semibold"
                >
                    Register
                </Link>

            </p>

        </form>
    );
}