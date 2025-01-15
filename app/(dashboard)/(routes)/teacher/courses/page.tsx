
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursesPage = async() => {
    const {userId} = await auth();

    if (!userId) {
        redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId: userId,
            teacherId: userId,
        },
        include: {
            chapters:{
                include: {
                    muxData: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const coursesWithChapters = courses.map((course) => {
        return {
            ...course,
            chapters: course.chapters.length,
        };
    });


    return ( 
        <div className="p-6">
            <DataTable columns={columns} data={coursesWithChapters} />
        </div>
     );
}
 
export default CoursesPage;