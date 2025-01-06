// Init DB first use or after reset
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const database = new PrismaClient();

export const categoriesMock = [
  {
    name: "Music",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Web Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Mobile Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Game Development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Data Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Engineering",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Film",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Sports",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Business & Finance",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Business",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Reading",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Photography",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Education",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Health",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Art",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Fashion",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const main = async () => {
  try {
    await database.category.createMany({
      data: categoriesMock,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error seeding the database");
  }
};

main()
  .then(async () => {
    console.log("Success: seeding the categories");
    await database.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error: seeding the categories", e);
    await database.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
