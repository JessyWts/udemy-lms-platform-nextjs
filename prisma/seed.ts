// Init DB first use or after reset

import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";

const categoriesMock: Category[] = [
  {
    id: "1",
    name: "Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Web Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Mobile Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Game Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Data Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const coursesMock: Course[] = [];

const createCategory = async (categories: Category[]) =>
  await db.category.createMany({
    data: categories,
  });

const createCourse = async (courses: Course[]) =>
  await db.course.createMany({
    data: courses,
  });

const main = async () => {
  await createCategory(categoriesMock);
  await createCourse(coursesMock);

  const courses = await db.course.findMany();
  const categories = await db.category.findMany();

  console.log(courses);
  console.log(categories);
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
