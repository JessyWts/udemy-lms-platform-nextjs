"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
    isFree: z.boolean().default(false),
});

interface ChapterAccessFormProps {
    initialData : {
        isFree: Chapter["isFree"];
    };
    courseId: string;
    chapterId: string;
}

export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterAccessFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData.isFree,
        },
    });

    const {isSubmitting, isValid} = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toggleEdit();
            toast.success("Chapter preview updated");
            router.refresh();
        } catch {
            toast.error("Failed to update chapter preview");
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter access
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit access
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <div className={cn(
                        "text-sm mt-2",
                        !initialData.isFree && "text-slate-500 italic"
                    )}>
                        {initialData.isFree
                            ? <>This chapter is free for preview</>
                            :<> This chapter is not free for preview</>
                        }
                    </div>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField 
                                control={form.control}
                                name='isFree'    
                                render={({ field }) => (
                                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <div className='space-y-1 leading-none'>
                                            <FormDescription>
                                                Check this box if you want to make this chapter free for preview
                                            </FormDescription>
                                        </div>
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
