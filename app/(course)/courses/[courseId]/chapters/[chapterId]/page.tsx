import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseProgressButton } from "./_components/course-progress-button";

type Params = Promise<{courseId: string,chapterId: string}>;

const ChapterIdPage = async({params}: {
    params: Params
}) => {
    
    const { courseId, chapterId } = await params;
    const {userId} = await auth();

    if (!userId) {
        redirect('/');
    }

    const {
        chapter,
        course,
        attachments,
        muxData,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({userId: userId ,courseId: courseId, chapterId: chapterId});

    if (!chapter || !course ) {
        redirect('/');
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd  = !!purchase && userProgress?.isCompleted;

    return ( 
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label="You already completed this chapter."
                />
            )}

            {isLocked && (
                <Banner
                    variant="warning"
                    label="You need to purchase the course to watch this chapter."
                />
            )}
            <div className='flex flex-col max-w-4xl mx-auto pb-20'>
                <div className="p-4">
                    {muxData && muxData.playbackId && (
                        <VideoPlayer 
                            chapterId={chapterId}
                            title={chapter.title}
                            courseId={courseId}
                            playbackId={muxData!.playbackId!}
                            isLocked={isLocked}
                            nextChapterId={nextChapter?.id}
                            completeOnEnd={completeOnEnd ? true : false}
                        />
                    )}
                    {!muxData || !muxData.playbackId && (
                        <span className="text-red-500">Something wrong no playbackId</span>
                    )}
                </div>
                <div>
                    <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
                        <h2 className='text-2xl font-semibold mb-2'>
                            {chapter.title}
                        </h2>
                        { purchase ? (
                            <CourseProgressButton
                                chapterId={chapterId}
                                courseId={courseId}
                                nextChapterId={nextChapter?.id}
                                isCompleted={!!userProgress?.isCompleted}
                            />
                            ) : (
                                <CourseEnrollButton
                                    courseId={courseId}
                                    price={course.price!}
                                />
                            )
                        }
                    </div>
                    <Separator/>
                    <div className="p-4">
                        <Preview value={chapter.description!} />
                    </div>
                    {!! attachments.length && (
                        <>
                            <Separator />
                            <div className='p-4'>
                                {
                                    attachments.map((attachment) => (
                                        <Link href={attachment.url} key={attachment.id} target='_blank' rel='noreferrer'
                                            className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 hover:underline'>
                                            <File className='h-6 w-6 mr-2'/>
                                            <p className='line-clamp-1'>
                                                {attachment.name}
                                            </p>
                                        </Link>
                                    ))
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default ChapterIdPage;