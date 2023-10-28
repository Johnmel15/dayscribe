import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

type logProps = {
  title: string;
  action: string;
  date: string;
};

export const POST = async (request: NextResponse) => {
  try {
    const body: logProps = await request.json();
    const { title, action, date } = body;

    if (!title || !action || !date) {
      return NextResponse.json(
        { message: "Please Fill out all required fields" },
        { status: 500 }
      );
    }

    const data = await prisma.dailyLogs.create({
      data: {
        title: title,
        action: action,
        date: new Date(date),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const items = await prisma.dailyLogs.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};
