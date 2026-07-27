import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import ApplicationCard from "../../components/applications/ApplicationsCard";

import { candidateNav } from "../../constants/navigation";

import { getMyApplications } from "../../services/applicationService";

export default function MyApplications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadApplications();

    }, []);

    async function loadApplications() {

        try {

            const data =
                await getMyApplications();

            setApplications(data.applications);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout items={candidateNav}>

            <h1 className="text-3xl font-bold mb-8">

                My Applications

            </h1>

            {
                loading
                    ? (
                        <p>Loading...</p>
                    )
                    : applications.length === 0
                        ? (
                            <div className="bg-white p-10 rounded-xl text-center">

                                No applications yet.

                            </div>
                        )
                        : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {
                                    applications.map(app => (

                                        <ApplicationCard
                                            key={app._id}
                                            application={app}
                                        />

                                    ))
                                }

                            </div>
                        )
            }

        </DashboardLayout>

    );

}