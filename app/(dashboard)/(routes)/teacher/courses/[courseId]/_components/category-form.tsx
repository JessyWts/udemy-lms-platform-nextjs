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
import { Course } from '@prisma/client';
import { Combobox } from '@/components/ui/combobox';

const formSchema = z.object({
    categoryId: z.string({
        required_error: "Category is required",
    })
});

interface CategoryFormProps {
    initialData : {
        categoryId: Course["categoryId"];
    };
    courseId: string;
    options: {label: string; value: string}[]
}

export const CategoryForm = ({
    initialData,
    courseId,
    options
}: CategoryFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || "",
        },
    });

    const {isSubmitting, isValid} = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toggleEdit();
            toast.success("Course category updated");
            router.refresh();
        } catch {
            toast.error("Failed to update course category");
        }
    }

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}>
                        {selectedOption?.label || "No category"}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                            <FormField
                                control={form.control}
                                name='categoryId'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Combobox
                                                options={options}
                                                { ...field }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center gap-x-2'>
                                <Button
                                    type='submit'
                                    disabled={!isValid || isSubmitting}>
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
