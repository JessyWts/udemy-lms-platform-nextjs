"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Loader2, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import Tiptap from '@/components/tiptap';
import { Preview } from '@/components/preview';

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    })
});

interface ChapterDescriptionFormProps {
    initialData : {
        description: Chapter["description"];
    };
    courseId: string;
    chapterId: string;
}

export const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterDescriptionFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        },
    });

    const {isSubmitting, isValid} = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toggleEdit();
            toast.success("Chapter description updated");
            router.refresh();
        } catch {
            toast.error("Failed to update chapter description");
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter description
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit description
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <div className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}>
                        {!initialData.description && "No description"}
                        {initialData.description && (
                            <Preview value={initialData.description}/>
                        )}
                    </div>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField 
                                control={form.control}
                                name='description'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Tiptap 
                                                val={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center gap-x-2'>
                                <Button
                                    type='submit'
                                    disabled={!isValid || isSubmitting}
                                >
                                    {isSubmitting ? <Loader2  className='w-4 h-4'/> : "Save"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }
        </div>
    );
};
