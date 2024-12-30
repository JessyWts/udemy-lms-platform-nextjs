"use client"

import { z } from 'zod';
import axios from "axios";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Attachment, Course } from '@prisma/client';
import { Fileupload } from '@/components/file-upload';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    url: z.string().min(1)
});

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[]};
    courseId: string;
}

export const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current)
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toggleEdit();
            toast.success("Course attachment updated");
            router.refresh();
        } catch {
            toast.error("Failed to update course attachment");
        }
    }

    const onDelete = async(attachmentId: string) => {
        try {
            setDeleteId(attachmentId)
            await axios.delete(`/api/courses/${courseId}/attachments/${attachmentId}`);
            toast.success("Attachment deleted")
            router.refresh()
        } catch  {
            toast.error("Failed to delete attachment")
        } finally {
            setDeleteId(null);
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing &&(
                        <>
                            <PlusCircle className='h-4 w-4 mr-2'/>
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <> 
                        {initialData.attachments.length === 0 && (
                            <p className='text-sm mt-2 text-slate-500 italic'>
                                No attachments found
                            </p>
                        )}
                        {initialData.attachments.length > 0 && (
                            <div className='space-y-2'>
                                {initialData.attachments.map((attachment) => (
                                    <div key={attachment.id} className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md'>
                                        <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                                        <p className='text-sm truncate'>
                                            {attachment.url}
                                        </p>
                                        {deleteId === attachment.id && (
                                            <div>
                                                <Loader2 className='h-4 w-4 animate-spin'/>
                                            </div>
                                        )}
                                        {
                                            deleteId !== attachment.id && (
                                                <button
                                                    className='ml-auto hover:opacity-75 transition'
                                                    onClick={() => onDelete(attachment.id)}
                                                >
                                                    <X className='h-4 w-4'/>
                                                </button>
                                            )
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )
            }
            {
                isEditing && (
                    <div>
                        <Fileupload
                            endpoint="courseAttachment"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({'url': url})
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Add anything your students might need to complete the course.
                        </div>
                    </div>
                )
            }
        </div>
    );
};