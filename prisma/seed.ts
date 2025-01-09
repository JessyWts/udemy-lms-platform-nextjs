// Init DB first use or after reset
import { Category, Course, PrismaClient, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { categoriesMock as categoryList } from "./seed-categories";
import { usersMock as userList } from "./seed-users";

const database = new PrismaClient();

const usersMock: User[] = userList as User[];

const userId = "user_2q2TGR3VmMPLgGvjyluC61szsjk";

if (!userId) {
  console.log("No userId found. start to sign-in to clerk");
  throw new Error("Unauthorized");
}

const categoriesMock: Category[] = categoryList as Category[];

const coursesMock: Course[] = [
  {
    id: uuidv4(),
    userId: userId,
    title: "Building Modern Web Applications with Go (Golang)",
    description:
      "Learn to write modern, fast, and secure web applications in Google's Go programming language, and learn it from an award winning University professor with 20 years of teaching experience, and 20 years of experience working in the industry as an entrepreneur.",
    imageUrl:
      "https://utfs.io/f/SuOCtRNWjpTcSzqI3zNWjpTcqYFL87HI6AwGukVoOQKnZmlX",
    price: 39.9,
    isPublished: false,
    categoryId: "5a4cbe98-9a42-4999-bc21-2df40c20862f",
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: userId,
  },
  {
    id: uuidv4(),
    userId: userId,
    title:
      "Coder Netflix en apprenant à utiliser les API REST dans vos applications Flutter et Dart",
    description:
      "Bienvenue dans la formation complète sur comment utiliser les API REST dans vos applications Flutter et Dart.",
    imageUrl:
      "https://images.unsplash.com/photo-1731331131233-4f73c93ae693?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 19.9,
    isPublished: false,
    categoryId: "5a4cbe98-9a42-4999-bc21-2df40c20862f",
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: userId,
  },
  {
    id: uuidv4(),
    userId: userId,
    title:
      "Doublon de Coder Netflix en apprenant à utiliser les API REST dans vos applications Flutter et Dart",
    description:
      "Bienvenue dans la formation complète sur comment utiliser les API REST dans vos applications Flutter et Dart.",
    imageUrl:
      "https://images.unsplash.com/photo-1731331131233-4f73c93ae693?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 19.9,
    isPublished: false,
    categoryId: "ab73c06a-fb63-47aa-9491-532b4b6c6418",
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: userId,
  },
];

const main = async () => {
  try {
    await database.user.createMany({
      data: usersMock,
    });

    await database.category.createMany({
      data: categoriesMock,
    });

    await database.course.createMany({
      data: coursesMock,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error seeding the database");
  }
};

main()
  .then(async () => {
    console.log("Success: seeding the database");
    await database.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error: seeding the database", e);
    await database.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
