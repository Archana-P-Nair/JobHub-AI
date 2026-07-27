import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import AnalyticsCard from "../../components/recruiter/AnalyticsCard";

import LoadingSpinner from "../../components/recruiter/LoadingSpinner";

import { recruiterNav } from "../../constants/navigation";

import { getAnalytics } from "../../services/recruiterService";

export default function Analytics() {

    const [analytics,setAnalytics]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadAnalytics();

    },[]);

    async function loadAnalytics(){

        try{

            const data=

                await getAnalytics();

            setAnalytics(data.analytics);

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return(

            <DashboardLayout items={recruiterNav}>

                <LoadingSpinner/>

            </DashboardLayout>

        );

    }

    return(

        <DashboardLayout items={recruiterNav}>

            <h1 className="text-3xl font-bold mb-8">

                Analytics Dashboard

            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

                <AnalyticsCard

                    title="Jobs"

                    value={analytics.totalJobs}

                />

                <AnalyticsCard

                    title="Applications"

                    value={analytics.totalApplications}

                />

                <AnalyticsCard

                    title="Interviews"

                    value={analytics.interviews}

                />

                <AnalyticsCard

                    title="Hired"

                    value={analytics.hired}

                />

                <AnalyticsCard

                    title="Rejected"

                    value={analytics.rejected}

                />

            </div>

        </DashboardLayout>

    );

}