"use client"

import { z } from 'zod';
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Course } from '@prisma/client';
import { Fileupload } from '@/components/file-upload';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    })
});

interface ImageFormProps {
    initialData : {
        imageUrl: Course["imageUrl"];
    };
    courseId: string;
}

export const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toggleEdit();
            toast.success("Course imageUrl updated");
            router.refresh();
        } catch {
            toast.error("Failed to update course imageUrl");
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className='h-4 w-4 mr-2'/>
                            Add an image
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit image
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    !initialData.imageUrl ? (
                        <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                            <ImageIcon className='h-10 w-10 text-slate-500'/>
                        </div>
                    ) : (
                        <div className='relative aspect-video mt-2'>
                            <Image
                                src={initialData.imageUrl}
                                alt='Upload'
                                fill
                                className='object-cover rounded-md'
                            />
                        </div>
                    )
                )
            }
            {
                isEditing && (
                    <div>
                        <Fileupload
                            endpoint="courseImage"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({'imageUrl': url})
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio is recommended
                        </div>
                    </div>
                )
            }
        </div>
    );
};
