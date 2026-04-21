"use client";

import SideBar from "@/components/SideBar";

export default function layout({ children }) {
    return (
        <div className="flex">
            <aside className="w-[220px] bg-blue-50 min-h-screen">
                <SideBar />
            </aside>

            <main className="flex-1">{children}</main>
        </div>
    );
}