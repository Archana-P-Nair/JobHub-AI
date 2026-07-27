import { Link } from "react-router-dom";
import {
    Building2,
    MapPin,
    Briefcase,
    Users,
    Pencil,
    Trash2,
} from "lucide-react";

export default function RecruiterJobCard({
    job,
    onDelete,
}) {
    return (
        <div className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition">

            <h2 className="text-2xl font-bold">
                {job.title}
            </h2>

            <div className="mt-4 space-y-2 text-gray-700">

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
                    <Users size={16} />
                    {job.applicants} Applicants
                </p>

            </div>

            <div className="flex gap-3 mt-6">

                <Link
                    to={`/recruiter/jobs/edit/${job._id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                    <Pencil size={16} />
                    Edit
                </Link>

                <Link
                    to={`/recruiter/jobs/${job._id}/applicants`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    <Users size={16} />
                    Applicants
                </Link>

                <button
                    onClick={() => onDelete(job._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                    <Trash2 size={16} />
                    Delete
                </button>

            </div>

        </div>
    );
}