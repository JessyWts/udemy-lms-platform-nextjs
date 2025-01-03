"use client";

import { cn } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import React from "react";

interface CategoryItemProps {
    label: string;
    icon?: IconType;
    value?: string
}

export const CategoryItem = ({label, icon:Icon, value}: CategoryItemProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentCategoryId = searchParams.get('categoryId')
    const currentTitle = searchParams.get('title')

    const isSelected = currentCategoryId === value

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: isSelected ? undefined : value,
                title: currentTitle
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }
    return (
        <button 
            className={cn(
                "p-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
            type="button"
            onClick={onClick}
        >
            {Icon && <Icon size={20} />}
            <span className='truncate'>
                {label}
            </span>
        </button>
    )
}