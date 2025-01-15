import { Course, Category } from "@prisma/client"
import { CourseCard } from "./course-card"

type CourseWithProgessWithCategory = Course & {
    category: Category | null,
    chapters: { id: string }[]
    progress: number | null
}

type CoursesListProps = {
    items: CourseWithProgessWithCategory[]
}

export const CoursesList = ({ items } : CoursesListProps) => {

    return (
        <div>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 '>
                {items.map((course, index) => (
                    <CourseCard
                        key={index}
                        id={course.id}
                        title={course.title}
                        imageUrl={course.imageUrl!}
                        chaptersLength={course.chapters.length}
                        price={course.price!}
                        progress={course.progress}
                        category={course.category!.name!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className='text-center text-sm text-muted-foreground mt-10'>
                    {"No courses found"}
                </div>
            )}
        </div>
    )
}