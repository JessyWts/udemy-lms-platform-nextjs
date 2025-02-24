"use client"

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export const CourseEnrollButton = ({courseId, price}: CourseEnrollButtonProps) => {
const [isLoading, setIsLoading] = useState(false);

const onClick = async () => {
    try {
        setIsLoading(true);

        const response = await axios.post(`/api/courses/${courseId}/checkout`);

        if (!response.data.url) {
            throw new Error("Failed to enroll")
        }

        window.location.assign(response.data.url);
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    } finally {
        setIsLoading(false);
    }
}
    return (
        <Button
            size="sm"
            className='w-full md:w-auto'
            onClick={onClick}
            disabled={isLoading}
        >
            Enroll {formatPrice(price)}
        </Button>
    )
}