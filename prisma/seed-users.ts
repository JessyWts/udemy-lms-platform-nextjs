// Init DB first use or after reset
import { PrismaClient, Role } from "@prisma/client";

const database = new PrismaClient();

export const usersMock = [
  {
    name: "Admin",
    email: "admin@mail.com",
    emailVerified: null,
    image: null,
    role: Role.ADMIN,
  },
  {
    id: "user_2q2TGR3VmMPLgGvjyluC61szsjk",
    name: "Jamz",
    email: "jamz@gmail.com",
    emailVerified: null,
    image: null,
    role: Role.TEACHER,
  },
  {
    name: "Test_User_1",
    email: "user1@gmail.com",
    emailVerified: null,
    image: null,
    role: Role.USER,
  },
  {
    name: "Test_User_2",
    email: "user2@gmail.com",
    emailVerified: null,
    image: null,
    role: Role.USER,
  },
  {
    name: "Teacher Robert",
    email: "teacher1@gmail.com",
    emailVerified: null,
    image: null,
    role: Role.TEACHER,
  },
  {
    name: "Teacher Robert",
    email: "teacher2@gmail.com",
    emailVerified: null,
    image: null,
    role: Role.TEACHER,
  },
];

const main = async () => {
  try {
    await database.user.createMany({
      data: usersMock,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error seeding the database");
  }
};

main()
  .then(async () => {
    console.log("Success: seeding the users");
    await database.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error: seeding the users", e);
    await database.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
