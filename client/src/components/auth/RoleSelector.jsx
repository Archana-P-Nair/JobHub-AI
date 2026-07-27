import { Briefcase, User } from "lucide-react";

export default function RoleSelector({
    value,
    onChange,
}) {

    const roles = [
        {
            id: "candidate",
            title: "Candidate",
            desc: "Apply for jobs",
            icon: User,
        },
        {
            id: "recruiter",
            title: "Recruiter",
            desc: "Post and manage jobs",
            icon: Briefcase,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">

            {roles.map((role) => {

                const Icon = role.icon;

                return (

                    <button
                        key={role.id}
                        type="button"
                        onClick={() =>
                            onChange(role.id)
                        }
                        className={`border rounded-xl p-4 transition

                        ${
                            value === role.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-slate-300"
                        }`}
                    >

                        <Icon
                            className="mx-auto mb-3"
                        />

                        <h3 className="font-semibold">

                            {role.title}

                        </h3>

                        <p className="text-sm text-slate-500">

                            {role.desc}

                        </p>

                    </button>

                );

            })}

        </div>
    );

}