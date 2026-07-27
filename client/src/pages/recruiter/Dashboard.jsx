import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import RecruiterJobCard from "../../components/recruiter/RecruiterJobCard";
import DeleteModal from "../../components/recruiter/DeleteModal";

import {
    getRecruiterJobs,
    deleteJob,
} from "../../services/recruiterService";

import { recruiterNav } from "../../constants/navigation";

export default function RecruiterDashboard() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteOpen, setDeleteOpen] = useState(false);

const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs() {

        try {

            const data = await getRecruiterJobs();
            setJobs(data.jobs);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    function handleDelete(id) {

    setSelectedJob(id);

    setDeleteOpen(true);

}
async function confirmDelete() {

    try {

        await deleteJob(selectedJob);

        toast.success("Job deleted successfully.");

        setDeleteOpen(false);

        setSelectedJob(null);

        loadJobs();

    } catch (err) {

        console.error(err);

        toast.error("Failed to delete job.");

    }

}


    return (


        <DashboardLayout items={recruiterNav}>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">

                    My Jobs

                </h1>

                <Link
                    to="/recruiter/jobs/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                    <Plus size={18} />
                    Create Job
                </Link>

            </div>

            {
                loading ? (

                    <p>Loading...</p>

                ) : jobs.length === 0 ? (

                    <div className="bg-white rounded-xl p-10 text-center shadow">

                        <h2 className="text-2xl font-semibold">

                            No jobs yet

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Create your first job posting.

                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">

                        {jobs.map(job => (

                            <RecruiterJobCard
                                key={job._id}
                                job={job}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>

                )
            }
            <DeleteModal
            open={deleteOpen}
            onCancel={() => {
                setDeleteOpen(false);
                setSelectedJob(null);
            }}
            onConfirm={confirmDelete}
        />

        </DashboardLayout>

    );

}