import {
    Bell,
    Search,
    LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Topbar() {

    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">

            <div className="flex items-center gap-3 border rounded-xl px-3 py-2 w-96">

                <Search size={18} />

                <input
                    placeholder="Search jobs..."
                    className="outline-none w-full"
                />

            </div>

            <div className="flex items-center gap-6">

                <Bell size={22} />

                <div className="text-right">

                    <p className="font-semibold">

                        {user?.name}

                    </p>

                    <p className="text-sm text-slate-500">

                        {user?.role}

                    </p>

                </div>

                <button
                    onClick={logout}
                    className="text-red-500"
                    title="Logout"
                >
                    <LogOut />
                </button>

            </div>

        </header>
    );
}