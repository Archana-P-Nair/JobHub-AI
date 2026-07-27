import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import JobGrid from "../../components/jobs/JobGrid";
import { candidateNav } from "../../constants/navigation";
import { getSavedJobs } from "../../services/candidateService";
import { Bookmark } from "lucide-react";

export default function SavedJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    async function fetchSavedJobs() {
        try {
            setLoading(true);
            const data = await getSavedJobs();
            setJobs(data.savedJobs || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout items={candidateNav}>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Bookmark size={24} />
                </div>
                <h1 className="text-3xl font-bold">Saved Jobs</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                </div>
            ) : jobs.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bookmark size={32} />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No saved jobs yet</h2>
                    <p className="text-gray-500">
                        Jobs you save will appear here for easy access.
                    </p>
                </div>
            ) : (
                <JobGrid jobs={jobs} />
            )}
        </DashboardLayout>
    );
}
