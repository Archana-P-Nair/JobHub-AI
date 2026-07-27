import { Sparkles } from "lucide-react";

export default function AIRecommendationCard({ job }) {

    return (

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow p-5">

            <div className="flex items-center gap-2">

                <Sparkles className="text-blue-600" size={20} />

                <h3 className="font-bold text-lg">

                    {job.title}

                </h3>

            </div>

            <p className="text-gray-600 mt-2">

                {job.company}

            </p>

            <div className="mt-4">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">

                    {job.score}% Match

                </span>

            </div>

            <p className="mt-4 text-gray-700">

                {job.reason}

            </p>

        </div>

    );

}