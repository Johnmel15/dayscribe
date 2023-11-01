import prisma from "@/script";
import { NextResponse } from "next/server";

type logProps = {
  title: string;
  action: string;
  date: string;
  tagId: string;
  userId: string;
};

export async function POST(request: Request) {
  try {
    const body: logProps = await request.json();
    const { title, action, date, tagId, userId } = body;

    if (!title || !action || !date) {
      return new NextResponse(
        JSON.stringify({ message: "Please Fill out all required fields" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await prisma.dailyLogs.create({
      data: {
        title: title,
        action: action,
        date: new Date(date),
        tagId: tagId,
        userId: userId,
      },
    });
    return new NextResponse(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "POST Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const items = await prisma.dailyLogs.findMany({
      include: {
        Tag: true,
      },
    });
    return new NextResponse(JSON.stringify(items), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "GET Error", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
