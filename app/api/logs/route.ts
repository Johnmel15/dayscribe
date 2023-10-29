import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

type logProps = {
  title: string;
  action: string;
  date: string;
  tagId: string;
};

export async function POST(request: Request) {
  try {
    const body: logProps = await request.json();
    const { title, action, date, tagId } = body;

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
