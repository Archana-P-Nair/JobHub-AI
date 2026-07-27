import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import JobForm from "../../components/recruiter/JobForm";

import {
    getJob,
    updateJob,
} from "../../services/recruiterService";

import { recruiterNav } from "../../constants/navigation";

export default function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJob();
    }, []);

    async function loadJob() {

        try {

            const data = await getJob(id);

            setJob(data.job);

        } catch {

            toast.error("Unable to load job.");

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(values) {

        try {

            await updateJob(id, values);

            toast.success("Job updated.");

            navigate("/recruiter/dashboard");

        } catch {

            toast.error("Update failed.");

        }

    }

    if (loading)
        return (
            <DashboardLayout items={recruiterNav}>
                Loading...
            </DashboardLayout>
        );

    return (

        <DashboardLayout items={recruiterNav}>

            <h1 className="text-3xl font-bold mb-8">

                Edit Job

            </h1>

            <JobForm
                initialValues={job}
                onSubmit={handleSubmit}
            />

        </DashboardLayout>

    );

}