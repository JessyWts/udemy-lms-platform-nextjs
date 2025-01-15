"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import MuxPlayer from "@mux/mux-player-react"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"
import { useConfettiStore } from "@/hooks/use-confetti-store"

interface VideoPlayerProps {
    chapterId: string
    title: string
    courseId: string
    playbackId: string
    isLocked: boolean
    nextChapterId?: string
    completeOnEnd: boolean
}

export const VideoPlayer = ({ 
    chapterId, 
    title, 
    courseId, 
    playbackId, 
    isLocked,
    nextChapterId,
    completeOnEnd
 } : VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async() => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                    isCompleted: true
                });
                
                if (!nextChapterId) {
                    confetti.onOpen();
                }

                toast.success('Progress updated');
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }
        } catch {
            toast.error('An error occurred. Please try again later')
        } 
    }

    useEffect(()=>{
        setIsClient(true)
    }, []);
    return (
        <div className=" relative aspect-video">
            {!isLocked && isReady && (
                <div className='absolute inset-0 flex items-center justify-center bg-slate-800'>
                <Loader2 className='h-8 w-8 animate-spin text-secondary'/>
            </div>
            )}
            {isLocked && (
                <div className='absolute inset-0 flex items-center flex-col gap-y-2 justify-center bg-slate-800 text-secondary'>
                    <Lock className='h-8 w-8'/>
                <p className='text-sm'>This chapter is locked</p>
            </div>
            )}
            {!isLocked && isClient && (
                <MuxPlayer 
                    title={title}
                    className={cn(
                        !isReady && 'hidden',
                        isReady && 'h-full w-full'
                    )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnd}
                    autoPlay
                    playbackId={playbackId}
                />
            )}
            {!isLocked && !isClient && (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <Loader2 className="animate-spin"/>
                </div>
            )}
        </div>
    )
 };
 