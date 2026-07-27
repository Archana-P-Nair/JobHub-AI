import JobCard from "./JobCard";

export default function JobGrid({
    jobs,
}) {

    if (!jobs.length) {

        return (

            <p>

                No jobs found.

            </p>

        );

    }

    return (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {jobs.map(job => (

                <JobCard
                    key={job._id}
                    job={job}
                />

            ))}

        </div>

    );

}