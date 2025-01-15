import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { SalesChart } from "./_components/sales-chart";
import { getMonthlyRevenue } from "@/actions/get-monthly-revenue";
import { getStudentEnrollment } from "@/actions/get-student-enrollment";
import { getCourseChapters } from "@/actions/get-course-chapters";
import { getCoursePerformance } from "@/actions/get-course-performance";
import { ChartsAnalytic } from "./_components/charts-analytic";

const AnalyticsPage = async () => {
    const {userId} = await auth();
    
    if (!userId) {
        redirect('/');
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics(userId);

    const monthlyRevenue = await getMonthlyRevenue(userId);
    const studentEnrollment = await getStudentEnrollment(userId);
    const coursesWithChapters = await getCourseChapters(userId);
    const coursePerformance = await getCoursePerformance(userId);
    
    return ( 
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                />
                <SalesChart data={data} />
            </div>
            <div className="container mx-auto pt-6">
                <h1 className="text-3xl font-bold mb-6">teacher_analytics</h1>
               <ChartsAnalytic 
                    monthlyRevenue={monthlyRevenue} 
                    studentEnrollment={studentEnrollment}
                    coursesWithChapters={coursesWithChapters}
                    coursePerformance={coursePerformance}
                />
            </div> 
        </div>
     );
}
 
export default AnalyticsPage;