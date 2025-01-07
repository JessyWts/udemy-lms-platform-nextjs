import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({params}: {
    params: {
        courseId: string;
    }
}) => {
    const { courseId } = await params;
    const course = await db.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                orderBy: {
                    position: 'asc'
                },
            }
        }
    });

    if (!course) {
        redirect('/');
    }

    return redirect(`/courses/${courseId}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;