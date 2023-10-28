import prisma from "@/prisma/client";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    console.log(err);
    throw new Error("Unable to connect to database");
  }
};
