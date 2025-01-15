import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { mediaKeyFromUrl } from "@/lib/utils";

const clientMux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

const utapi = new UTApi();

type Params = Promise<{
  courseId: string;
}>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId } = await auth();
    const { courseId } = await params;

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileKeysToDelete: string[] = [];

    fileKeysToDelete.push(mediaKeyFromUrl(course.imageUrl!));

    for (const chapter of course.chapters) {
      if (chapter.muxData && chapter.muxData.assetId) {
        await clientMux.video.assets.delete(chapter.muxData.assetId);

        if (chapter.videoUrl) {
          fileKeysToDelete.push(mediaKeyFromUrl(chapter.videoUrl));
        }
      }
    }

    await utapi.deleteFiles(fileKeysToDelete);

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId } = await auth();
    const values = await req.json();
    const { courseId } = await params;

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (values.imageUrl) {
      const courseToUpdate = await db.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
      });

      if (!courseToUpdate) {
        return new NextResponse("image not found", { status: 404 });
      }

      const key = mediaKeyFromUrl(courseToUpdate.imageUrl!);
      await utapi.deleteFiles(key);
    }

    const courseUpdated = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(courseUpdated);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
