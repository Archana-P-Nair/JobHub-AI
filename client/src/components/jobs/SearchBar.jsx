import { Search } from "lucide-react";

export default function SearchBar({
    value,
    onChange,
}) {

    return (

        <div className="relative">

            <Search
                size={18}
                className="absolute left-4 top-4 text-slate-400"
            />

            <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-200"
            />

        </div>

    );

}