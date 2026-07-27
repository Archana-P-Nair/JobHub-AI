import StatusDropdown from "./StatusDropdown";

export default function ApplicantCard({
    application,
    onStatusChange,
}) {
    return (
        <div className="bg-white rounded-xl shadow border p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold">
                        {application.candidate.name}
                    </h2>

                    <p className="text-gray-500">
                        {application.candidate.email}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                        Applied on{" "}
                        {new Date(
                            application.createdAt
                        ).toLocaleDateString()}
                    </p>

                </div>

                <StatusDropdown
                    value={application.status}
                    onChange={(status) =>
                        onStatusChange(
                            application._id,
                            status
                        )
                    }
                />

            </div>

            {application.coverLetter && (
                <div className="mt-6">

                    <h3 className="font-semibold mb-2">
                        Cover Letter
                    </h3>

                    <p className="text-gray-700">
                        {application.coverLetter}
                    </p>

                </div>
            )}

        </div>
    );
}