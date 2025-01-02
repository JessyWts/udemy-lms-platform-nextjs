import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { AlertCircle, AlertTriangle, CheckCircle,  } from "lucide-react"

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
      variants: {
        variant: {
            destructive: "bg-red-400 text-white border border-red-500 rounded",
            warning: "bg-orange-100 text-orange-700 border border-orange-500 rounded",
            success: "bg-green-100 text-green-700 border border-green-500 rounded",
        }
      },
      defaultVariants: {
        variant: "warning"
      }
    }
  )
  
  
  interface BannerProps extends VariantProps<typeof bannerVariants> {
    label : string
  }
  
  
  const iconMap = {
    destructive: AlertCircle,
    warning: AlertTriangle,
    success: CheckCircle
  }
  

export const Banner  = ({ label, variant } : BannerProps) => {
    const Icon = iconMap[variant || 'warning']
    return (
        <div className={cn(
            bannerVariants({ variant }),
          )}>
            <Icon className='mr-2 h-4 w-4' />
            {label}
          </div>
    )
}