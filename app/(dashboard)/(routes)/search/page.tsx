import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { Suspense } from "react";

// type Params = Promise<{ categoryId: string }>
type SearchParams = Promise<{ [key: string]: string }>

const SearchPage = async(props: {
    // params: Params,
    searchParams: SearchParams
} ) => {
    const {userId} = await auth();
    // const { categoryId } = await props.params;
    const { title, categoryId } = await props.searchParams;


    if (!userId) {
        return redirect('/');
    }

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