import { db } from "@/lib/db";

export const getCoursePerformance = async (userId: string) => {
  try {
    if (!userId) {
      return [];
    }

    const courses = await db.course.findMany({
      where: {
        teacherId: userId,
      },
      include: {
        purchases: true,
      },
    });

    const totalPurchases = courses.reduce(
      (acc, course) => acc + course.purchases.length,
      0
    );

    return courses.map((course) => ({
      title: course.title,
      students: course.purchases.length,
      percentage: (course.purchases.length / totalPurchases) * 100,
    }));
  } catch (error) {
    console.log("An error occurred in getCoursePerformance", error);
    return [];
  }
};
