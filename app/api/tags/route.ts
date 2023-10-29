import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const items = await prisma.tag.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};
