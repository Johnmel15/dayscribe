import prisma from "@/script";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (res: Request, { params }: Props) => {
  try {
    console.log(res);
    const { id } = params;
    const log = await prisma.dailyLogs.findUnique({
      where: {
        id,
      },
    });

    if (!log) {
      return NextResponse.json({ message: "Log not found!" }, { status: 500 });
    }
    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json(
      { message: "SHOW: Something went wrong", error },
      { status: 500 }
    );
  }
};

export const PATCH = async (res: Request, { params }: Props) => {
  try {
    const body = await res.json();
    const { title, action, date, tagId } = body;

    const { id } = params;
    const updateLog = await prisma.dailyLogs.update({
      where: {
        id,
      },
      data: {
        title: title,
        action: action,
        date: new Date(date),
        tagId: tagId,
      },
    });

    if (!updateLog) {
      return NextResponse.json({ message: "Log not found!" }, { status: 500 });
    }

    return NextResponse.json(updateLog);
  } catch (error) {
    return NextResponse.json(
      { message: "UPDATE: Something went wrong", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (res: Request, { params }: Props) => {
  try {
    const { id } = params;
    await prisma.dailyLogs.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "Log has been deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "DELETE: Something went wrong", error },
      { status: 500 }
    );
  }
};
