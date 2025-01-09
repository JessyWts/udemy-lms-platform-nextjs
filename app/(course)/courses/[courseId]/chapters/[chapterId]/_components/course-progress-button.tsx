"use client"


import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { CheckCircle, XCircle } from "lucide-react"

import { useConfettiStore } from "@/hooks/use-confetti-store"
import { Button } from "@/components/ui/button"


interface CourseProgressButtonProps {
    chapterId: string
    courseId: string
    nextChapterId?: string
    isCompleted?: boolean
}
export const CourseProgressButton = ({ chapterId, courseId, nextChapterId, isCompleted } : CourseProgressButtonProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [loading, setLoading] = useState(false)

    const Icon = isCompleted ? XCircle : CheckCircle;

    const onClick = async() => {
        try {
            setLoading(true)

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                isCompleted: !isCompleted
            });

            if (!isCompleted && !nextChapterId) {
                confetti.onOpen()
            }
            if (nextChapterId && !isCompleted) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

            toast.success('Progress updated')
            router.refresh()
        } catch {
            toast.error('An error occurred. Please try again later')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            type='button'
            variant={isCompleted ? 'outline': 'success' }
            className='w-full md:w-auto'
            onClick={onClick}
            disabled={loading}
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className='ml-2 h-4 w-4' />
        </Button>
    )
}