import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react"
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
    return ( 
        <Sheet>
            <SheetTitle className="hidden">Menu</SheetTitle>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
     );
}