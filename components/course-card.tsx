import Image from "next/image"
import { BookOpen } from "lucide-react"
import Link from "next/link"

import { formatPrice } from "@/lib/format"
import { CourseProgress } from "./course-progress"
import { IconBadge } from "./icon-badge"

interface  CourseCardProps {
    id: string,
    title: string,
    imageUrl: string,
    chaptersLength: number,
    price: number,
    progress: number | null,
    category: string
}


export const CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category } : CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video  rounded-md">
                <Image
                            alt={title}
                            className="object-cover w-full h-full"
                            height="200"
                            src={imageUrl}
                            width="350"
                        />
                </div>
                <div className="flx flex-col gap-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen}/>
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <div>
                            <CourseProgress 
                                value={progress}
                                variant={progress === 100 ? 'success' : 'default'}
                            />
                        </div>
                    ) : (
                        <p className="text-md md:text-sm font-medium text-muted-slate-500">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}