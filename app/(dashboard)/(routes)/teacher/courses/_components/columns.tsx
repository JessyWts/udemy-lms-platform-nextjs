"use client"

import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDateTime, formatPrice } from "@/lib/format"

type typeCourseList = Course & {
  chapters: number
}


export const columns: ColumnDef<typeCourseList>[] = [
  {
    accessorKey: "title",
    header: ({column}) =>{
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
  },
  {
    accessorKey: "price",
    header: ({column}) =>{
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => {
      const course = row.original
      return (
        <div>
            {formatPrice(course.price!)}
        </div>
      )
    },
  },
  {
    accessorKey: "isPublished",
    header: ({column}) =>{
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Published
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => {
        const course = row.original
        return (
            <Badge 
              className={cn(
                "bg-slate-500",
                course.isPublished && "bg-sky-700" 
            )}>
                {course.isPublished ? "Published" : "Draft"}
            </Badge>
        )
    },
  },
  {
    accessorKey: "chapters",
    header: ({column}) =>{
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Chapters
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({column}) =>{
        return (
            <Button 
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => {
        const course = row.original
        return (
          <div>
              {formatDateTime(course.createdAt!)}
          </div>
        )
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/teacher/courses/${course.id}`}>
                <DropdownMenuItem
                    className="cursor-pointer"
                >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
                </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]