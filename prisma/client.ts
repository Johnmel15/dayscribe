import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJs {
    interface Global {}
  }
}

interface CustomNodeJsGlobal extends NodeJs.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

let prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) global.prisma = new PrismaClient();
  prisma = global.prisma;
}

export default prisma;
