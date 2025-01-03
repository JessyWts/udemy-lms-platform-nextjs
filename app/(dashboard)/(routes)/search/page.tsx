import { db } from "@/lib/db";
import { Categories } from "./_components/categories";

const SearchPage = async() => {
    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });
    return (
        <>
            <div className='px-6 pt-6 md:hidden md:mb-0 block'>
                {/* <SearchInput /> */}
            </div>
            <div className='p-6 space-y-6'>
                <Categories 
                    items={categories}
                />
                {/* <CoursesList 
                    items={courses}
                /> */}
            </div>
        </>
     );
}
 
export default SearchPage;