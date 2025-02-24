import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSideBar } from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

type Params = Promise<{courseId: string}>;

const CourseLayout = async ({children, params} : {
    children: React.ReactNode,
    params: Params
}) => {
    const {userId} = await auth();
    const {courseId} = await params;

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy: {
                    position: 'asc'
                }
            }
        }
    });

    if (!course) {
        redirect('/');
    }

    const progressCount = await getProgress(userId, courseId);

    return (
        <div className="h-full">
            <div className='h-[80px] md:pl-80 w-full z-50 fixed'>
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSideBar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    );
}
 
export default CourseLayout;
