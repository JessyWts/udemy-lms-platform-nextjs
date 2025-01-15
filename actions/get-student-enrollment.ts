import { db } from "@/lib/db";

export const getStudentEnrollment = async (userId: string) => {
  try {
    if (!userId) {
      return [];
    }

    const purchases = await db.purchase.findMany({
      where: {
        userId: userId,
      },
    });

    const currentYear = new Date().getFullYear();

    const monthlyEnrollment = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, i, 1);

      // Use Intl.DateTimeFormat to format the month in English
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date
      );

      const enrollment = purchases.filter(
        (p) =>
          p.createdAt.getMonth() === i &&
          p.createdAt.getFullYear() === currentYear
      ).length;

      return { month, enrollment };
    });

    return monthlyEnrollment;
  } catch (error) {
    console.log("An error occurred in getStudentEnrollment", error);
    return [];
  }
};
