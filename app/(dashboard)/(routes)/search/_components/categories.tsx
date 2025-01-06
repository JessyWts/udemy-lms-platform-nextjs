"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcSportsMode,
    FcMusic,
    FcBusinessman,
    FcBriefcase,
    FcReading,
    FcGraduationCap,
    FcOldTimeCamera,
    FcSmartphoneTablet,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Engineering": FcEngineering,
    "Film": FcFilmReel,
    "Sports": FcSportsMode,
    "Business": FcBusinessman,
    "Business & Finance": FcBriefcase,
    "Reading": FcReading,
    "Photography": FcOldTimeCamera,
    "Education": FcGraduationCap,
    "Technology": FcEngineering,
    "Science": FcGraduationCap,
    "Health": FcSportsMode,
    "Art": FcMusic,
    "Fashion": FcBriefcase,
    "Mobile Development": FcSmartphoneTablet,
}

export const Categories = ({items}: CategoriesProps) => {
    return (
        <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
            {
                items.map((item) => (
                    <CategoryItem
                        key={item.id}
                        label={item.name}
                        icon={iconMap[item.name]}
                        value={item.id}
                    />
                ))
            }

        </div>
    )
}