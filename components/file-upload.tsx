"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileuploadProps {
    endpoint: keyof typeof ourFileRouter;
    onChange: (url?: string) => void;
}

export const Fileupload = ({
    onChange,
    endpoint
}: FileuploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(err) => {
                toast.error(`${err?.message}`);
            }}
        />
    );
}
