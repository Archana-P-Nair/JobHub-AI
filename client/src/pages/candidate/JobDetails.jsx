import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { candidateNav } from "../../constants/navigation";

import { getJobById } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";
import { toggleSaveJob, getSavedJobs } from "../../services/candidateService";
import { toast } from "react-hot-toast";
export default function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {

        loadJob();

    }, []);

    async function loadJob() {

        try {

            const data = await getJobById(id);
            setJob(data.job);

            try {
                const savedData = await getSavedJobs();
                const savedJobs = savedData.savedJobs || [];
                const saved = savedJobs.some((j) => (j._id ? j._id === id : j === id));
                setIsSaved(saved);
            } catch (err) {
                console.error("Error loading saved jobs:", err);
            }

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }
    async function handleApply() {

        try {

            setApplying(true);

            await applyForJob(job._id);

            toast.success("Application submitted successfully!");

            setHasApplied(true);

        } catch (error) {

            const message =
                error.response?.data?.message ||
                "Failed to apply.";

            toast.error(message);

        } finally {

            setApplying(false);

        }

    }

    async function handleToggleSave() {
        try {
            const data = await toggleSaveJob(job._id);
            setIsSaved(data.isSaved);
            if (data.isSaved) {
                toast.success("Job saved successfully!");
            } else {
                toast.success("Job removed from saved list.");
            }
        } catch (error) {
            toast.error("Failed to update saved jobs.");
        }
    }
    if (loading) {

        return (

            <DashboardLayout items={candidateNav}>

                Loading...

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout items={candidateNav}>

            <h1 className="text-4xl font-bold">

                {job.title}

            </h1>

            <p className="mt-2 text-gray-600">

                {job.company}

            </p>

            <div className="mt-6">

                <p>

                    <strong>Location:</strong> {job.location}

                </p>

                <p>

                    <strong>Employment:</strong> {job.employmentType}

                </p>

                <p>
                    <strong>Salary:</strong>{" "}
                    {job.salary.currency}{" "}
                    {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </p>

            </div>

            <div className="mt-8">

                <h2 className="text-2xl font-semibold">

                    Description

                </h2>

                <p className="mt-3">

                    {job.description}

                </p>

            </div>

            <div className="flex items-center">
                <button
                    onClick={handleApply}
                    disabled={applying || hasApplied}
                    className={`mt-10 px-6 py-3 rounded-xl text-white transition-all
        ${hasApplied
                            ? "bg-green-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >

                    {applying
                        ? "Applying..."
                        : hasApplied
                            ? "✓ Applied"
                            : "Apply Now"}

                </button>

                <button
                    onClick={handleToggleSave}
                    className={`mt-10 ml-4 px-6 py-3 rounded-xl border transition-all ${isSaved ? "bg-gray-100 text-gray-800 border-gray-300" : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                        }`}
                >
                    {isSaved ? "Unsave Job" : "Save Job"}
                </button>
            </div>

        </DashboardLayout>

    );

}