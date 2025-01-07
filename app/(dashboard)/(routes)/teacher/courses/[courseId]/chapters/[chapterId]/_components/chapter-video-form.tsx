"use client"

import { useEffect, useState } from 'react';
import { z } from 'zod';
import axios from "axios";

import Muxplayer from '@mux/mux-player-react';
import { Chapter, MuxData } from '@prisma/client';
import toast from 'react-hot-toast';
import { Loader2, Pencil, PlusCircle, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Fileupload } from '@/components/file-upload';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    videoUrl: z.string().min(1,)
});

interface ChapterVideoFormProps {
    initialData : Chapter & {muxData?: MuxData | null};
    courseId: string;
    chapterId: string;
}

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toggleEdit();
            toast.success("Chapter videoUrl updated");
            router.refresh();
        } catch {
            toast.error("Failed to update chapter videoUrl");
        }
    }
    useEffect(() => {
        setIsClient(true)
      }, []);

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className='h-4 w-4 mr-2'/>
                            Add an video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit video
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    !initialData.videoUrl ? (
                        <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                            <VideoIcon className='h-10 w-10 text-slate-500'/>
                        </div>
                    ) : ( isClient ? (
                        <div className='flex relative aspect-video mt-2'>
                            <Muxplayer
                                playbackId={initialData?.muxData?.playbackId || ''}
                            />
                        </div>
                        ) : (
                            <div className='flex items-center justify-center h-60 '>
                                <Loader2 className='animate-spin'/>
                            </div>
                        )
                    )
                )
            }
            {
                isEditing && (
                    <div>
                        <Fileupload
                            endpoint="courseVideo"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({'videoUrl': url})
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Upload this chapter&apos;s video
                        </div>
                    </div>
                )
            }
            {initialData.videoUrl && !isEditing && (
                <div className='text-xs text-muted-foreground mt-2'>
                    Video can take a few minutes to process. Refresh the page if videos does not appear.
                </div>
            )}
        </div>
    );
};
