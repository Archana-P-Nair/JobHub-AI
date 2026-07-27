import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ApplicantCard from "../../components/recruiter/ApplicantCard";
import LoadingSpinner from "../../components/recruiter/LoadingSpinner";

import {
    getApplicants,
    updateApplicationStatus,
} from "../../services/recruiterService";

import { recruiterNav } from "../../constants/navigation";

export default function ApplicantsPage() {

    const { id } = useParams();

    const [applications,setApplications]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadApplicants();

    },[]);

    async function loadApplicants(){

        try{

            const data=

                await getApplicants(id);

            setApplications(data.applications);

        }

        catch(err){

            console.error(err);

            toast.error("Unable to load applicants.");

        }

        finally{

            setLoading(false);

        }

    }

    async function handleStatus(

        applicationId,

        status

    ){

        try{

            await updateApplicationStatus(

                applicationId,

                status

            );

            toast.success("Status updated.");

            loadApplicants();

        }

        catch(err){

            toast.error("Update failed.");

        }

    }

    return(

        <DashboardLayout items={recruiterNav}>

            <h1 className="text-3xl font-bold mb-8">

                Applicants

            </h1>

            {

                loading

                ?

                <LoadingSpinner/>

                :

                applications.length===0

                ?

                <div className="bg-white rounded-xl p-10 text-center shadow">

                    <h2 className="text-2xl font-bold">

                        No Applicants Yet

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Applications will appear here.

                    </p>

                </div>

                :

                <div className="space-y-6">

                    {

                        applications.map(app=>(

                            <ApplicantCard

                                key={app._id}

                                application={app}

                                onStatusChange={handleStatus}

                            />

                        ))

                    }

                </div>

            }

        </DashboardLayout>

    );

}