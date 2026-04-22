
"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "@/components/DashboardLayout";
import { useRouter } from "next/navigation";
const DashboardAppLayout = ({ children }) => {
    const { doctorToken } = useSelector((state) => state.doctors);
    const router = useRouter();
    useEffect(() => {
        if (!doctorToken) {
            router.push('/auth/login')
        }
    }, [doctorToken, router]);

    return <DashboardLayout>
        {children}
    </DashboardLayout>;
}


export default DashboardAppLayout