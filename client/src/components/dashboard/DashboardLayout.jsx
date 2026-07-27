import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
    items,
    children,
}) {
    return (
        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar items={items} />

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}