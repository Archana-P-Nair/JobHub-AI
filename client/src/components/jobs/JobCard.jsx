import { Link } from "react-router-dom";
import {
    MapPin,
    Building2,
    Briefcase,
    IndianRupee
} from "lucide-react";

export default function JobCard({ job }) {

    return (

        <Link
            to={`/candidate/jobs/${job._id}`}
            className="block"
        >

            <div className="bg-white rounded-xl shadow-sm border hover:shadow-md hover:scale-[1.02] transition-all duration-200 p-6">

                <h2 className="text-xl font-bold">
                    {job.title}
                </h2>

                <div className="mt-4 space-y-2">

                    <p className="flex items-center gap-2">
                        <Building2 size={16} />
                        {job.company}
                    </p>

                    <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {job.location}
                    </p>

                    <p className="flex items-center gap-2">
                        <Briefcase size={16} />
                        {job.employmentType}
                    </p>

                    <p className="flex items-center gap-2">
                        <IndianRupee size={16} />

                        ₹{job.salary.min.toLocaleString()}
                        {" - "}
                        ₹{job.salary.max.toLocaleString()}
                    </p>

                </div>

                <div className="mt-5 flex flex-wrap gap-2">

                    {job.skills.map((skill) => (

                        <span
                            key={skill}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

                <button
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors"
                >
                    View Details
                </button>

            </div>

        </Link>

    );

}