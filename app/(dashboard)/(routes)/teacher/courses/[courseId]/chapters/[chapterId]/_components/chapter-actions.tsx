"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"


interface ChapterActionsProps {
    disabled: boolean
    courseId: string
    chapterId: string
    isPublished: boolean
}

export const ChapterActions = ({disabled, courseId, chapterId, isPublished, } : ChapterActionsProps) => {

    const [isLoading, setisLoading] = React.useState(false)
    const router = useRouter()

    const onClick = async() => {
        try {
            setisLoading(true)
            if(isPublished) {
                await axios.patch(
                    `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
                );
                toast.success("Chapter unpublished");
            } else {
                await axios.patch(
                    `/api/courses/${courseId}/chapters/${chapterId}/publish`
                );
                toast.success("Chapter published");
            }
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setisLoading(false)
        }
    }
    const onDelete = async() => {
        try {
            setisLoading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter deleted")
            router.refresh()
            router.push(`/teacher/courses/${courseId}`)
        } catch  {
            toast.error("Failed to delete chapter")
        } finally {
            setisLoading(false)
        }
    }

    
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant={"outline"}
                size={"sm"}
            >
                {isPublished ? "Unpublished" : "Published"}
            </Button>
            <ConfirmModal
                onConfirm={onDelete}
            >
                <Button
                    size={"sm"}
                    disabled={isLoading}
                >
                    <Trash  className='h-4 w-4'/>
                </Button>
            </ConfirmModal>
        </div>
    )
}