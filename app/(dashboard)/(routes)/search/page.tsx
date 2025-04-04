import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { Suspense} from "react";

type SearchParams = Promise<{ [key: string]: string }>

const SearchPage = async(props: {
    searchParams: SearchParams
} ) => {
    const {userId} = await auth();

    if (!userId) {
        return redirect('/');
    }

    const { title, categoryId } = await props.searchParams;

    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    const courses = await getCourses({
        userId,
        title,
        categoryId,
    });

    return (
        <>
            <div className='px-6 pt-6 md:hidden md:mb-0 block'>
                <Suspense>
                    <SearchInput />
                </Suspense>
            </div>
            <div className='p-6 space-y-6'>
                <Categories 
                    items={categories}
                />
                <CoursesList 
                    items={courses}
                />
            </div>
        </>
     );
}
 
export default SearchPage;