import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, dueTime, type } = await req.json();

  const task = await prisma.task.create({
    data: {
      title,
      description,
      type: type || "planner",
      dueTime: dueTime ? new Date(dueTime) : null,
      userId: (session.user as any).id
    }
  });

  return NextResponse.json(task);
}
