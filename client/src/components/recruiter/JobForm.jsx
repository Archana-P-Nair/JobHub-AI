import { useForm } from "react-hook-form";

export default function JobForm({
    defaultValues = {},
    onSubmit,
    loading = false,
}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: defaultValues.title || "",
            company: defaultValues.company || "",
            location: defaultValues.location || "",
            employmentType:
                defaultValues.employmentType || "Full-Time",
            remote: defaultValues.remote || false,

            salaryMin:
                defaultValues.salary?.min || "",

            salaryMax:
                defaultValues.salary?.max || "",

            currency:
                defaultValues.salary?.currency || "INR",

            skills:
                defaultValues.skills
                    ? defaultValues.skills.join(", ")
                    : "",

            description:
                defaultValues.description || "",
        },
    });

    function submit(data) {

        onSubmit({
            title: data.title,
            company: data.company,
            location: data.location,
            employmentType: data.employmentType,
            remote: data.remote,

            salary: {
                min: Number(data.salaryMin),
                max: Number(data.salaryMax),
                currency: data.currency,
            },

            skills: data.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean),

            description: data.description,
        });

    }

    return (

        <form
            onSubmit={handleSubmit(submit)}
            className="bg-white rounded-xl shadow p-8 space-y-6"
        >

            <h2 className="text-2xl font-bold">

                Job Information

            </h2>

            {/* Job Title */}

            <div>

                <label className="font-medium">

                    Job Title

                </label>

                <input
                    {...register("title", {
                        required: "Required",
                    })}
                    className="w-full mt-2 border rounded-lg p-3"
                />

                <p className="text-red-500">

                    {errors.title?.message}

                </p>

            </div>

            {/* Company */}

            <div>

                <label className="font-medium">

                    Company

                </label>

                <input
                    {...register("company", {
                        required: "Required",
                    })}
                    className="w-full mt-2 border rounded-lg p-3"
                />

            </div>

            {/* Location */}

            <div>

                <label className="font-medium">

                    Location

                </label>

                <input
                    {...register("location")}
                    className="w-full mt-2 border rounded-lg p-3"
                />

            </div>

            {/* Employment */}

            <div>

                <label className="font-medium">

                    Employment Type

                </label>

                <select
                    {...register("employmentType")}
                    className="w-full mt-2 border rounded-lg p-3"
                >

                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Internship</option>
                    <option>Contract</option>

                </select>

            </div>

            {/* Remote */}

            <div className="flex items-center gap-3">

                <input
                    type="checkbox"
                    {...register("remote")}
                />

                Remote Job

            </div>

            {/* Salary */}

            <div className="grid md:grid-cols-3 gap-4">

                <input
                    type="number"
                    placeholder="Minimum Salary"
                    {...register("salaryMin")}
                    className="border rounded-lg p-3"
                />

                <input
                    type="number"
                    placeholder="Maximum Salary"
                    {...register("salaryMax")}
                    className="border rounded-lg p-3"
                />

                <select
                    {...register("currency")}
                    className="border rounded-lg p-3"
                >

                    <option>INR</option>
                    <option>USD</option>

                </select>

            </div>

            {/* Skills */}

            <div>

                <label className="font-medium">

                    Skills

                </label>

                <input
                    placeholder="React, Node.js, MongoDB"
                    {...register("skills")}
                    className="w-full mt-2 border rounded-lg p-3"
                />

            </div>

            {/* Description */}

            <div>

                <label className="font-medium">

                    Description

                </label>

                <textarea
                    rows={7}
                    {...register("description")}
                    className="w-full mt-2 border rounded-lg p-3"
                />

            </div>

            <button
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >

                {loading
                    ? "Saving..."
                    : "Save Job"}

            </button>

        </form>

    );

}