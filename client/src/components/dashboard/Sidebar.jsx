import SidebarItem from "./SidebarItem";

export default function Sidebar({
    items,
}) {
    return (
        <aside className="w-64 border-r bg-white min-h-screen p-6">

            <h1 className="text-3xl font-bold text-blue-600 mb-10">
                JobHub AI
            </h1>

            <nav className="space-y-2">
                {items.map((item) => (
                    <SidebarItem
                        key={item.path}
                        to={item.path}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </nav>

        </aside>
    );
}