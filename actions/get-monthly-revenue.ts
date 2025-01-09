import { db } from "@/lib/db";

export const getMonthlyRevenue = async (userId: string) => {
  try {
    if (!userId) {
      return [];
    }

    const purchases = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: true,
      },
    });

    const currentYear = new Date().getFullYear();

    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, i, 1);
      // Use Intl.DateTimeFormat to format the month in English
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date
      );
      const revenue = purchases
        .filter(
          (p) =>
            p.createdAt.getMonth() === i &&
            p.createdAt.getFullYear() === currentYear
        )
        .reduce((acc, p) => acc + (p.course.price || 0), 0);

      return {
        month,
        revenue,
      };
    });

    return monthlyRevenue;
  } catch (error) {
    console.log("An error occurred in getMonthlyRevenue", error);
    return [];
  }
};
