
import React from 'react';
import { cn } from '@/lib/utils'
import { Progress } from './ui/progress';


type Props = {
    value: number
    variant?: 'success' | 'default',
    size?: "default" | "sm"
}

const colorByVariant = {
    default: "text-muted-foreground",
    success: "text-primary"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

export const CourseProgress = ({ variant, value, size } : Props) => {
    return (
        <div>
            <Progress 
                className='h-2'
                value={value}
                // variant={variant}
            />
            <p className={cn(
                "font-medium mt-2",
                colorByVariant[variant || "default"],
                sizeByVariant[ size || "default"]
            )}>
                {Math.round(value)}% {'completed'}
            </p>
        </div>
    )
}