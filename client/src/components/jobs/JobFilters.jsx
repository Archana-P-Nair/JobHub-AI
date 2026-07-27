export default function JobFilters({

    location,
    employmentType,
    remote,
    sort,

    onLocation,

    onEmployment,

    onRemote,

    onSort,

}) {

    return (

        <div className="grid md:grid-cols-4 gap-4">

            <input
                placeholder="Location"
                value={location}
                onChange={(e) =>
                    onLocation(e.target.value)
                }
                className="border rounded-xl p-3"
            />

            <select
                value={employmentType}
                onChange={(e) =>
                    onEmployment(
                        e.target.value
                    )
                }
                className="border rounded-xl p-3"
            >

                <option value="">

                    All Types

                </option>

                <option>

                    Full-Time

                </option>

                <option>

                    Internship

                </option>

                <option>

                    Part-Time

                </option>

                <option>

                    Contract

                </option>

            </select>

            <label className="flex items-center gap-3 rounded-xl border p-3">

                <input
                    type="checkbox"
                    checked={remote}
                    onChange={(e)=>
                        onRemote(
                            e.target.checked
                        )
                    }
                />

                Remote Only

            </label>

            <select
                value={sort}
                onChange={(e)=>
                    onSort(
                        e.target.value
                    )
                }
                className="border rounded-xl p-3"
            >

                <option value="newest">

                    Newest

                </option>

                <option value="oldest">

                    Oldest

                </option>

                <option value="salaryAsc">

                    Salary ↑

                </option>

                <option value="salaryDesc">

                    Salary ↓

                </option>

            </select>

        </div>

    );

}