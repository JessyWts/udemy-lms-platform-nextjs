import { db } from "@/lib/db";

export const getCourseChapters = async (userId: string) => {
  try {
    if (!userId) {
      return [];
    }
    const courses = await db.course.findMany({
      where: {
        teacherId: userId,
      },
      include: {
        chapters: true,
      },
    });

    return courses.map((course) => ({
      title: course.title,
      chapters: course.chapters.length,
    }));
  } catch (error) {
    console.log("An error occurred in getCourseChapters", error);
    return [];
  }
};
