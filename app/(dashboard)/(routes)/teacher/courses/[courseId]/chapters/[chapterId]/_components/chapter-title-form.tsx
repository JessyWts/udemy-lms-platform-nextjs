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
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Loader2, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Chapter } from '@prisma/client';

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }).min(3, {
        message: "Title must be at least 3 characters long",
    })
});

interface ChapterTitleFormProps {
    initialData : {
        title: Chapter["title"]
    };
    courseId: string;
    chapterId: string;
}

export const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterTitleFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const {isSubmitting, isValid} = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toggleEdit();
            toast.success("Chapter title updated");
            router.refresh();
        } catch {
            toast.error("Failed to update chapter title");
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter title
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <p className='mt-2 text-sm'>
                        {initialData.title}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField 
                                control={form.control}
                                name='title'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isSubmitting}
                                                placeholder="e.g. Introduction to the chapter"
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
