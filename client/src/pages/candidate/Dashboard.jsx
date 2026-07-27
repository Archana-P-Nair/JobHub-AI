import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SearchBar from "../../components/jobs/SearchBar";
import JobFilters from "../../components/jobs/JobFilters";
import JobGrid from "../../components/jobs/JobGrid";
import Pagination from "../../components/jobs/Pagination";

import AIRecommendationCard from "../../components/ai/AIRecommendationCard";

import { candidateNav } from "../../constants/navigation";

import { getJobs } from "../../services/jobService";
import { getRecommendations } from "../../services/aiService";

export default function CandidateDashboard() {

    // -----------------------------
    // Jobs
    // -----------------------------

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // -----------------------------
    // AI Recommendations
    // -----------------------------

    const [recommendations, setRecommendations] = useState([]);
    const [loadingAI, setLoadingAI] = useState(true);

    // -----------------------------
    // Filters
    // -----------------------------

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [remote, setRemote] = useState(false);
    const [sort, setSort] = useState("newest");

    // -----------------------------
    // Pagination
    // -----------------------------

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // -----------------------------
    // Load AI Recommendations once
    // -----------------------------

    useEffect(() => {

        loadRecommendations();

    }, []);

    // -----------------------------
    // Load Jobs whenever filters change
    // -----------------------------

    useEffect(() => {

        fetchJobs();

    }, [
        search,
        location,
        employmentType,
        remote,
        sort,
        page,
    ]);

    // -----------------------------
    // Fetch Jobs
    // -----------------------------

    async function fetchJobs() {

        try {

            setLoading(true);

            const data = await getJobs({

                search,
                location,
                employmentType,
                remote,
                sort,
                page,
                limit: 6,

            });

            setJobs(data.jobs);
            setTotalPages(data.totalPages);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    // -----------------------------
    // Fetch AI Recommendations
    // -----------------------------

    async function loadRecommendations() {
    try {

        const data = await getRecommendations();

        console.log("AI Response:", data);

        setRecommendations(data.recommendations);

    } catch (error) {

        console.error(error);

    } finally {

        setLoadingAI(false);

    }
}

    // -----------------------------
    // UI
    // -----------------------------

    return (

        <DashboardLayout items={candidateNav}>

            <h1 className="text-3xl font-bold mb-8">

                Find Your Next Opportunity

            </h1>

            {/* AI Recommendations */}

            <div className="mb-10">

                <h2 className="text-2xl font-bold mb-5">

                    🤖 AI Job Recommendations

                </h2>

                {

                    loadingAI ? (

                        <p>Loading AI recommendations...</p>

                    ) : recommendations.length === 0 ? (

                        <div className="bg-white rounded-xl shadow p-8 text-center">

                            No AI recommendations available.

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-5">

                            {

                                recommendations.map((job, index) => (

                                    <AIRecommendationCard

                                        key={index}

                                        job={job}

                                    />

                                ))

                            }

                        </div>

                    )

                }

            </div>

            {/* Search */}

            <SearchBar

                value={search}

                onChange={setSearch}

            />

            {/* Filters */}

            <div className="mt-6 mb-8">

                <JobFilters

                    location={location}
                    employmentType={employmentType}
                    remote={remote}
                    sort={sort}

                    onLocation={setLocation}
                    onEmployment={setEmploymentType}
                    onRemote={setRemote}
                    onSort={setSort}

                />

            </div>

            {/* Jobs */}

            {

                loading ? (

                    <div className="flex justify-center py-20">

                        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />

                    </div>

                ) : (

                    <>

                        <JobGrid jobs={jobs} />

                        <Pagination

                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}

                        />

                    </>

                )

            }

        </DashboardLayout>

    );

}