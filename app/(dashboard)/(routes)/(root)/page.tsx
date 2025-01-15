import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const {userId} = await auth();

  if (!userId) {
    redirect("/");
  }

  const {completedCourses, coursesInProgress} = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Courses In Progress"
          numberOfitems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed Courses"
          numberOfitems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
