import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
return ( 
    <div className="w-full h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        {/* <div className="h-20 fixed inset-0 w-full z-50"> */}
            <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-0 z-50"> */}
            <Sidebar />
        </div>
        <main className="h-full md:pl-56 pt-[80px] ">
        {/* <main className="h-full pt-20"> */}
            {children}
        </main>
    </div>
 );
}
 
export default DashboardLayout;