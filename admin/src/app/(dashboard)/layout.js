
"use client";

import DashboardLayout from "@/components/DashboardLayout";

const DashboardAppLayout = ({ children }) => {
    
    return <DashboardLayout>
                {children}
            </DashboardLayout>;
}


export default DashboardAppLayout