import StatusDropdown from "./StatusDropdown";

export default function ApplicantCard({

    application,

    onStatusChange,

}) {

    return (

        <div className="bg-white shadow rounded-xl p-6 border">

            <div className="flex justify-between">

                <div>

                    <h2 className="text-xl font-bold">

                        {application.candidate.name}

                    </h2>

                    <p className="text-gray-500">

                        {application.candidate.email}

                    </p>

                </div>

                <StatusDropdown

                    value={application.status}

                    onChange={(status)=>

                        onStatusChange(

                            application._id,

                            status

                        )

                    }

                />

            </div>

            <div className="mt-6">

                <p>

                    Applied on

                    {" "}

                    {new Date(

                        application.createdAt

                    ).toLocaleDateString()}

                </p>

            </div>

            {

                application.coverLetter && (

                    <div className="mt-5">

                        <h3 className="font-semibold">

                            Cover Letter

                        </h3>

                        <p className="mt-2 text-gray-700">

                            {application.coverLetter}

                        </p>

                    </div>

                )

            }

        </div>

    );

}