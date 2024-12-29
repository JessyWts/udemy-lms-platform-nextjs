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
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/format';

const formSchema = z.object({
    price: z.coerce.number( {
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    })
});

interface PriceFormProps {
    initialData : {
        price: Course["price"];
    };
    courseId: string;
}

export const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || 0,
        },
    });

    const {isSubmitting, isValid} = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toggleEdit();
            toast.success("Course description updated");
            router.refresh();
        } catch {
            toast.error("Failed to update course description");
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course price
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit price
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.price && "text-slate-500 italic"
                    )}>
                        {initialData.price
                            ? formatPrice(initialData.price)
                            :  "No price set"
                        }
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField 
                                control={form.control}
                                name='price'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                step={0.01}
                                                min={0}
                                                placeholder='Set a price for your course'
                                                {...field}
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
