import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import JobForm from "../../components/recruiter/JobForm";
import { recruiterNav } from "../../constants/navigation";
import { createJob } from "../../services/recruiterService";
import { toast } from "react-hot-toast";

export default function CreateJob() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleCreate(data) {

        try {

            setLoading(true);

            await createJob(data);

            toast.success("Job created successfully!");

            navigate("/recruiter/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to create job."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout items={recruiterNav}>

            <h1 className="text-3xl font-bold mb-8">

                Create New Job

            </h1>

            <JobForm
                onSubmit={handleCreate}
                loading={loading}
            />

        </DashboardLayout>

    );

}