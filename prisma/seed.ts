import { Category, PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const categoriesMock = [
  {
    name: "Music",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Web Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mobile Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Game Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Data Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Engineering",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Film",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sports",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Business & Finance",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Business",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Reading",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Photography",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Education",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Health",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Art",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Fashion",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const main = async () => {
  try {
    const categoryList = await database.category.createMany({
      data: categoriesMock as Category[],
    });
    console.log(categoryList.count, "categories created");
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
