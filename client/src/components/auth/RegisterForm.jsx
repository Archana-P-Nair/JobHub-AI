import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { registerUser } from "../../services/authService";

export default function RegisterForm() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {

        try {

            await registerUser(data);

            toast.success("Registration Successful!");

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <Input
                label="Full Name"
                placeholder="John Doe"
                register={register("name", {
                    required: "Name is required",
                    minLength: {
                        value: 2,
                        message: "Minimum 2 characters",
                    },
                })}
                error={errors.name?.message}
            />

            <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
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
                placeholder="********"
                register={register("password", {
                    required: "Password required",
                    minLength: {
                        value: 6,
                        message:
                            "Minimum 6 characters",
                    },
                })}
                error={errors.password?.message}
            />

            <Input
                label="Confirm Password"
                type="password"
                placeholder="********"
                register={register("confirmPassword", {
                    required: "Confirm password",

                    validate: (value) =>
                        value === password ||
                        "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
            />

            <div>

                <label className="block mb-2 font-medium">

                    Register As

                </label>

                <select
                    className="w-full border rounded-lg p-3"
                    {...register("role")}
                >
                    <option value="candidate">

                        Candidate

                    </option>

                    <option value="recruiter">

                        Recruiter

                    </option>

                </select>

            </div>

            <Button
                type="submit"
                loading={isSubmitting}
            >
                Create Account
            </Button>

            <p className="text-center">

                Already have an account?

                <Link
                    className="text-blue-600 ml-2"
                    to="/login"
                >
                    Login
                </Link>

            </p>

        </form>

    );

}