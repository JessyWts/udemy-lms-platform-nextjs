import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Take media key from https://uploadthing.com/ utfs.io
 * the url contain the key of the media
 * @param {string} url
 * @returns {string} key
 */
export function mediaKeyFromUrl(url: string): string {
  return url.split("f/").pop() ?? "";
}
